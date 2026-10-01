// Utilidades para leer el feed RSS público de YouTube (sin API key ni librerías).
// El feed de un canal es: https://www.youtube.com/feeds/videos.xml?channel_id=<ID>

export const CHANNEL_ID = "UCsh1fIhlueGZKl-eraCXjOA"; // @ExperienciaconDios
export const CHANNEL_URL = "https://www.youtube.com/@ExperienciaconDios/videos";
export const MAX_VIDEOS = 3;

export interface FeedVideo {
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

/**
 * Extrae los últimos videos (id, título, fecha) del XML del feed.
 * Parseo por expresiones regulares a propósito: el formato del feed es
 * estable y evitamos sumar una librería de XML al bundle.
 */
export function parseLatestVideos(xml: string, limit = MAX_VIDEOS): FeedVideo[] {
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
