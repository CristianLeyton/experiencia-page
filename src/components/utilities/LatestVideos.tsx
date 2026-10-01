import { useEffect, useState } from "react";
import {
  CHANNEL_URL,
  parseLatestVideos,
  type FeedVideo,
} from "../../utils/youtubeFeed";

const EMBED_BASE = "https://www.youtube-nocookie.com/embed";
const MAX_VIDEOS = 3;

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg
      className={`size-5 ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function formatDate(published: string): string {
  try {
    return dateFormatter.format(new Date(published));
  } catch {
    return "";
  }
}

function VideoCard({ video }: { video: FeedVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="bg-white dark:bg-primary rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500 transition-colors duration-300 group w-full card">
      <div className="relative aspect-video bg-zinc-200 dark:bg-zinc-900">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`${EMBED_BASE}/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 size-full cursor-pointer"
            aria-label={`Reproducir: ${video.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-90 group-hover:opacity-100 group-hover:bg-black/40 transition-all duration-300">
              <span className="flex items-center justify-center size-14 rounded-full bg-red-600 text-white shadow-lg group-hover:scale-110 group-hover:bg-yellow-500 transition-all duration-300">
                <IconYouTube className="size-7 !m-0" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h4 className="font-semibold leading-snug line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
          {video.title}
        </h4>
        {formatDate(video.published) && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {formatDate(video.published)}
          </p>
        )}
      </div>
    </article>
  );
}

function VideoSkeleton() {
  return (
    <article className="bg-white dark:bg-primary rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 w-full">
      <div className="aspect-video bg-zinc-200 dark:bg-zinc-900 animate-pulse" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-900 animate-pulse" />
        <div className="h-3 w-2/5 rounded bg-zinc-200 dark:bg-zinc-900 animate-pulse" />
      </div>
    </article>
  );
}

export function LatestVideos() {
  const [videos, setVideos] = useState<FeedVideo[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/ultimos-videos", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));

        // Producción: la función serverless devuelve JSON.
        // Desarrollo: el proxy de Vite sirve el XML crudo del feed.
        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          const data: { videos?: FeedVideo[] } = await res.json();
          return Array.isArray(data.videos)
            ? data.videos.slice(0, MAX_VIDEOS)
            : [];
        }
        return parseLatestVideos(await res.text(), MAX_VIDEOS);
      })
      .then((result: FeedVideo[]) => {
        setVideos(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setVideos([]);
      });

    return () => controller.abort();
  }, []);

  // El observer global (HomePage) corre antes de que existan estos nodos:
  // les agregamos "show" a mano para que la animación .card no los deje ocultos.
  useEffect(() => {
    if (!videos?.length) return;
    const nodes = document.querySelectorAll<HTMLElement>(".latest-videos .card");
    nodes.forEach((node) => node.classList.add("show"));
  }, [videos]);

  return (
    <div className="latest-videos flex flex-col items-center gap-6 mt-10">
      <div className="flex items-center gap-2 text-lg xl:text-xl font-semibold">
        {/* <IconYouTube className="text-red-600" /> */}
        <span className="font-semibold text-3xl xl:text-4xl font-swash">Últimos mensajes</span>
      </div>

      {videos === null ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {Array.from({ length: MAX_VIDEOS }, (_, i) => (
            <VideoSkeleton key={i} />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          No pudimos cargar los videos en este momento. Visitanos directamente en{" "}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:underline font-semibold"
          >
            nuestro canal de YouTube
          </a>
          .
        </p>
      )}
    </div>
  );
}

export default LatestVideos;
