import { IconFacebook } from "../icons/IconFacebook";
import { IconInstagram } from "../icons/IconInstagram";
import { IconYoutube } from "../icons/IconYoutube";
import { IconChevronDown } from "../icons/IconChevronDown";

import IntroVideoMp4 from "../../assets/videos/intro-2026.mp4";
import IntroVideoWebm from "../../assets/videos/intro-2026.webm";

import { useRef, useEffect } from "react";

const redes = {
  instagram: "https://www.instagram.com/experienciacondios/",
  facebook: "https://web.facebook.com/iglesiaexperienciacondios",
  youtube: "https://www.youtube.com/@ExperienciaconDios",
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // iOS puede bloquearlo igual, pero no rompe nada
      });
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative h-dvh w-full overflow-hidden text-white"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* iOS / Safari */}
        <source src={IntroVideoMp4} type="video/mp4" />
        {/* Chrome / Firefox */}
        <source src={IntroVideoWebm} type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center gap-4 md:gap-4 2xl:gap-6 text-center fade-in-animation">
        {/* Bienvenida */}
        <div className="mt-30">
          <h3 className="text-5xl md:text-6xl 2xl:text-7xl font-swash">
            Bienvenido a Casa
          </h3>
        </div>

        {/* Botón */}
        <div className="my-2">
          <a
            href="#reuniones"
            className="bg-primary rounded-full px-4 py-2 text-white font-semibold text-xl hover:bg-yellow-500 transition-colors duration-300 active:bg-yellow-500"
          >
            Visitános
          </a>
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-4 lg:gap-6 text-lg xl:text-xl 2xl:text-2xl max-w-4xl text-pretty">
          <p>
            Somos una iglesia joven e inclusiva que ama a Dios, a las personas y
            a nuestra ciudad.
          </p>
          <p>
            Queremos ser manos y pies de Jesús, creando un lugar donde
            cualquiera pueda sentirse en casa, encontrar vida, propósito y
            esperanza.
          </p>
          <p>Vení tal como sos.</p>
        </div>

        {/* Redes */}
        <div className="flex gap-5 items-center *:hover:text-yellow-500 *:transition-colors *:duration-300">
          <a href={redes.instagram} target="_blank" rel="noopener noreferrer">
            <IconInstagram className="size-10 md:size-12" />
          </a>
          <a href={redes.facebook} target="_blank" rel="noopener noreferrer">
            <IconFacebook className="size-10 md:size-12" />
          </a>
          <a href={redes.youtube} target="_blank" rel="noopener noreferrer">
            <IconYoutube className="size-11 md:size-13" />
          </a>
        </div>

        {/* Scroll */}
        <div className="pt-5">
          <a href="#bienvenida" className="animate-pulse">
            <IconChevronDown className="text-white size-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
