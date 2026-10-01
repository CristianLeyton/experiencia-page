// Función serverless de Vercel (incluida gratis en el plan Hobby).
//
// YouTube no envía cabeceras CORS en su feed RSS, por lo que el navegador no
// puede pedirlo directamente. Este endpoint lo consulta en el servidor y
// devuelve JSON listo para usar. Vercel cachea la respuesta 5 minutos, así
// que el feed se consume como mucho ~288 veces por día.
//
// Importante: Vercel exige el formato "objeto con método fetch" para handlers
// que usan los estándares web (Request/Response). Un `export default` de
// función suelta se interpreta como handler Node.js (req, res) y falla en
// runtime con FUNCTION_INVOCATION_FAILED.
//
// Ver también: src/utils/youtubeFeed.ts (constantes y parser compartidos).

import { CHANNEL_ID, MAX_VIDEOS, parseLatestVideos } from "../src/utils/youtubeFeed";

const jsonHeaders = (cacheSeconds: number) => ({
  "Content-Type": "application/json",
  "Cache-Control": `public, max-age=0, s-maxage=${cacheSeconds}, stale-while-revalidate=600`,
});

export default {
  async fetch(): Promise<Response> {
    try {
      const response = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
      );

      // Ante cualquier problema devolvemos una lista vacía (no un error duro)
      // para que el sitio siga funcionando y muestre su mensaje de respaldo.
      if (!response.ok) {
        return new Response(JSON.stringify({ videos: [] }), {
          status: 200,
          headers: jsonHeaders(60),
        });
      }

      const xml = await response.text();
      const videos = parseLatestVideos(xml, MAX_VIDEOS);

      return new Response(JSON.stringify({ videos }), {
        status: 200,
        headers: jsonHeaders(300),
      });
    } catch {
      return new Response(JSON.stringify({ videos: [] }), {
        status: 200,
        headers: jsonHeaders(60),
      });
    }
  },
};
