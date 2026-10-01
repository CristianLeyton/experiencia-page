// Función serverless de Vercel (incluida gratis en el plan Hobby).
//
// YouTube no envía cabeceras CORS en su feed RSS, por lo que el navegador no
// puede pedirlo directamente. Este endpoint lo consulta en el servidor y
// devuelve JSON listo para usar.
//
// NOTA IMPORTANTE: el servidor de RSS de YouTube falla de forma INTERMITENTE
// (500/404) y es hostil con IPs de datacenter (como las de Vercel). Por eso
// esta función implementa varias estrategias en cascada con reintentos y NUNCA
// cachea una lista vacía (antes un 500 puntual de YouTube dejaba `[]` pegado
// en el edge cache hasta 10 minutos). Canal: https://www.youtube.com/@ExperienciaconDios
//
// La función sigue siendo AUTOCONTENIDA: no importa nada de ../src ni de
// librerías. El parser está duplicado a propósito desde src/utils/youtubeFeed.ts;
// si cambiás uno, cambiá el otro.

import type { IncomingMessage, ServerResponse } from "node:http";

const CHANNEL_ID = "UCsh1fIhlueGZKl-eraCXjOA"; // @ExperienciaconDios
const CHANNEL_UPLOADS_PLAYLIST = "UUsh1fIhlueGZKl-eraCXjOA"; // uploads del canal
const MAX_VIDEOS = 3;
const FETCH_TIMEOUT_MS = 8000;

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

interface FeedVideo {
  id: string;
  title: string;
  published: string;
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_match, code: string) =>
      String.fromCodePoint(Number(code))
    )
    .replace(
      /&(amp|lt|gt|quot|apos);/g,
      (_match, entity: string) =>
        ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" })[entity] ?? entity
    );
}

/** Extrae los últimos videos (id, título, fecha) del XML del feed. */
function parseLatestVideos(xml: string, limit: number): FeedVideo[] {
  const videos: FeedVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null && videos.length < limit) {
    const entry = match[1];
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];

    if (id && title && published) {
      videos.push({
        id,
        title: decodeXmlEntities(title),
        published,
      });
    }
  }

  return videos;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, {
    headers: { "User-Agent": BROWSER_UA, Accept: "*/*" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Reintenta una promesa factory unas cuantas veces con backoff corto. */
async function withRetries<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 400
): Promise<T | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch {
      if (i < attempts - 1) await sleep(delayMs * (i + 1));
    }
  }
  return null;
}

/**
 * Estrategia 1: feed RSS del canal (channel_id) y, si falla, el feed de la
 * playlist de subidas (playlist_id = "UU" + channelId sin la "C"). Ambos usan
 * el mismo formato XML, así que el parser sirve para los dos.
 */
async function fetchViaRssFeeds(): Promise<FeedVideo[]> {
  const urls = [
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${CHANNEL_UPLOADS_PLAYLIST}`,
  ];

  for (const url of urls) {
    const res = await withRetries(() => fetchWithTimeout(url));
    if (!res || !res.ok) continue;

    const videos = parseLatestVideos(await res.text(), MAX_VIDEOS);
    if (videos.length > 0) return videos;
  }

  return [];
}

/**
 * Convierte el texto relativo de YouTube ("hace 8 días", "10 months ago")
 * en una fecha ISO aproximada. Es la misma precisión que muestra YouTube
 * públicamente sin sesión iniciada.
 */
function relativeTextToIso(text: string): string {
  const value = Number(text.toLowerCase().match(/\d+/)?.[0]);
  const unit = text
    .toLowerCase()
    .match(/(minuto|hora|d[ií]a|semana|mes|a[ñn]o|minute|hour|day|week|month|year)/)
    ?.[1];
  if (!value || !unit) return "";

  const unitMs: Record<string, number> = {
    minuto: 60_000,
    hora: 3_600_000,
    "día": 86_400_000,
    dia: 86_400_000,
    semana: 7 * 86_400_000,
    mes: 30 * 86_400_000,
    "año": 365 * 86_400_000,
    ano: 365 * 86_400_000,
    minute: 60_000,
    hour: 3_600_000,
    day: 86_400_000,
    week: 7 * 86_400_000,
    month: 30 * 86_400_000,
    year: 365 * 86_400_000,
  };

  return new Date(Date.now() - value * (unitMs[unit] ?? 0)).toISOString();
}

/**
 * Estrategia 2 (fallback): scrapear la página de videos del canal. Cada video
 * vive en un objeto lockupViewModel que incluye id, título y fecha relativa
 * ("hace 8 días" / "8 days ago") en metadataParts. Con eso armamos las tres
 * tarjetas sin depender de la página watch (que YouTube suele bloquear a las
 * IPs de datacenter); los datos que falten se completan después con oEmbed.
 */
async function fetchViaChannelPage(): Promise<FeedVideo[]> {
  const res = await withRetries(() =>
    fetchWithTimeout(`https://www.youtube.com/@ExperienciaconDios/videos`)
  );
  if (!res || !res.ok) return [];

  const html = await res.text();
  const chunks = html.split('"lockupViewModel":').slice(1);
  const videos: FeedVideo[] = [];

  for (const chunk of chunks) {
    const id = chunk.match(/"videoId":"([A-Za-z0-9_-]{11})"/)?.[1];
    if (!id) continue;

    // El primer video puede repetirse ("Featured" + grilla).
    if (videos.some((video) => video.id === id)) continue;

    const title =
      chunk
        .match(/"lockupMetadataViewModel":\{"title":\{"content":"((?:\\.|[^"\\])*)"/)?.[1]
        ?.replace(/\\u0026/g, "&")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\") ?? "";

    const publishedText =
      // Preferimos el accessibilityLabel de metadataParts, que trae la fecha
      // completa ("hace 2 semanas"), antes que la abreviada ("hace 2 sem.").
      chunk.match(
        /"metadataParts":\[[\s\S]{0,500}?"accessibilityLabel":"((?:[Hh]ace [^"]{1,40})|[^"]{1,40} ago)"/
      )?.[1] ??
      chunk.match(
        /"content":"((?:[Hh]ace [^"]{1,40})|\d{1,3} (?:minute|hour|day|week|month|year)s? ago)"/
      )?.[1] ??
      "";

    videos.push({ id, title, published: relativeTextToIso(publishedText) });
    if (videos.length >= MAX_VIDEOS) break;
  }

  return videos;
}

/** Título oficial del video vía el oEmbed público de YouTube (sin límites). */
async function fetchOembedTitle(id: string): Promise<string> {
  const res = await withRetries(() =>
    fetchWithTimeout(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
    )
  );
  if (!res || !res.ok) return "";
  try {
    const data = (await res.json()) as { title?: string };
    return data.title ?? "";
  } catch {
    return "";
  }
}

/**
 * Fecha EXACTA de publicación vía la API interna pública de YouTube
 * (youtubei/v1/player), que no requiere API key y devuelve el microformato
 * del video con publishDate. Reemplaza el scraping de la página watch, que
 * YouTube suele bloquear a las IPs de datacenter (de ahí venían las fechas
 * vacías en producción).
 */
async function fetchExactPublishedDate(id: string): Promise<string> {
  const res = await withRetries(() =>
    fetch("https://www.youtube.com/youtubei/v1/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20240101.00.00",
            hl: "es",
          },
        },
        videoId: id,
      }),
    })
  );
  if (!res || !res.ok) return "";

  try {
    const data = (await res.json()) as {
      microformat?: {
        playerMicroformatRenderer?: { publishDate?: string; uploadDate?: string };
      };
    };
    const microformat = data.microformat?.playerMicroformatRenderer;
    return microformat?.publishDate ?? microformat?.uploadDate ?? "";
  } catch {
    return "";
  }
}

/**
 * Completa los datos del fallback: título vía oEmbed y fecha exacta vía
 * youtubei. Si youtubei falla, se conserva la fecha aproximada calculada del
 * texto relativo ("hace 2 semanas"), que es mejor que no mostrar nada.
 */
async function enrichFallbackVideos(videos: FeedVideo[]): Promise<FeedVideo[]> {
  return Promise.all(
    videos.map(async (video) => {
      const [exactDate, title] = await Promise.all([
        fetchExactPublishedDate(video.id),
        video.title ? Promise.resolve(video.title) : fetchOembedTitle(video.id),
      ]);

      return { ...video, title, published: exactDate || video.published };
    })
  );
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const isHead = req.method === "HEAD";

  const send = (videos: FeedVideo[], cacheSeconds: number) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      `public, max-age=0, s-maxage=${cacheSeconds}, stale-while-revalidate=600`
    );
    if (isHead) {
      res.end();
      return;
    }
    res.end(JSON.stringify({ videos }));
  };

  try {
    let videos = await fetchViaRssFeeds();

    if (videos.length === 0) {
      videos = await enrichFallbackVideos(await fetchViaChannelPage());
    }

    // Con videos: cache normal (5 min). Vacío: solo 20s, para que el próximo
    // visitante no reciba la lista vacía cacheada cuando YouTube se recupere.
    send(videos, videos.length > 0 ? 300 : 20);
  } catch {
    send([], 20);
  }
}
