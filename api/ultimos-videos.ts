// Función serverless de Vercel (incluida gratis en el plan Hobby).
//
// YouTube no envía cabeceras CORS en su feed RSS, por lo que el navegador no
// puede pedirlo directamente. Este endpoint lo consulta en el servidor y
// devuelve JSON listo para usar. Vercel cachea la respuesta 5 minutos, así
// que el feed se consume como mucho ~288 veces por día.
//
// NOTAS DE DISEÑO (lecciones de producción):
// - La función es AUTOCONTENIDA: no importa nada de ../src ni de librerías.
//   El empaquetador de Vercel (@vercel/node) fallaba al trazar el import
//   cruzado hacia src/ y la función crasheaba al cargar el módulo
//   (FUNCTION_INVOCATION_FAILED en cada request). El parser está duplicado a
//   propósito desde src/utils/youtubeFeed.ts; si cambiás uno, cambiá el otro.
// - Se usa el handler Node clásico (req, res), el formato más estable para
//   el runtime de Node.js de Vercel.
//
// Canal: https://www.youtube.com/@ExperienciaconDios

import type { IncomingMessage, ServerResponse } from "node:http";

const CHANNEL_ID = "UCsh1fIhlueGZKl-eraCXjOA"; // @ExperienciaconDios
const MAX_VIDEOS = 3;

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
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
    );

    // Ante cualquier problema devolvemos una lista vacía (no un error duro)
    // para que el sitio siga funcionando y muestre su mensaje de respaldo.
    if (!response.ok) {
      send([], 60);
      return;
    }

    send(parseLatestVideos(await response.text(), MAX_VIDEOS), 300);
  } catch {
    send([], 60);
  }
}
