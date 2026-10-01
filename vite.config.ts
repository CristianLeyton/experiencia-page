import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    build: {
    outDir: "dist"
  },
  server: {
    // En desarrollo la función serverless de /api no existe (solo corre en
    // Vercel), así que pedimos el feed de YouTube directo desde Node, que no
    // sufre el bloqueo CORS del navegador.
    proxy: {
      "/api/ultimos-videos": {
        target: "https://www.youtube.com",
        changeOrigin: true,
        rewrite: () =>
          "/feeds/videos.xml?channel_id=UCsh1fIhlueGZKl-eraCXjOA",
      },
    },
  },
})
