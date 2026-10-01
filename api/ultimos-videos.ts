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
 * Estrategia 2 (fallback): scrapear la página de videos del canal y extraer
 * los videoIds del JSON embebido. No da la fecha de publicación, así que se
 * usa la fecha actual como referencia aproximada.
 */
async function fetchViaChannelPage(): Promise<FeedVideo[]> {
  const res = await withRetries(() =>
    fetchWithTimeout(`https://www.youtube.com/@ExperienciaconDios/videos`)
  );
  if (!res || !res.ok) return [];

  const html = await res.text();
  const videoIds = [...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)]
    .map((m) => m[1])
    // El primer video puede repetirse en "Featured" y en la grilla.
    .filter((id, index, all) => all.indexOf(id) === index)
    .slice(0, MAX_VIDEOS);

  const now = new Date().toISOString();
  return videoIds.map((id) => ({ id, title: "", published: now }));
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
      videos = await fetchViaChannelPage();
    }

    // Con videos: cache normal (5 min). Vacío: solo 20s, para que el próximo
    // visitante no reciba la lista vacía cacheada cuando YouTube se recupere.
    send(videos, videos.length > 0 ? 300 : 20);
  } catch {
    send([], 20);
  }
}
