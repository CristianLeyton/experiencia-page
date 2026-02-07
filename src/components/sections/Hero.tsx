/* import LogoGrande from "../../assets/images/logo-500x500.png"; */
import { IconFacebook } from "../icons/IconFacebook";
import { IconInstagram } from "../icons/IconInstagram";
import { IconYoutube } from "../icons/IconYoutube";
import { IconChevronDown } from "../icons/IconChevronDown";
import IntroVideo from "../../assets/videos/intro-2026.mp4";

const redes = {
  instagram: "https://www.instagram.com/experienciacondios/",
  facebook: "https://web.facebook.com/iglesiaexperienciacondios",
  youtube: "https://www.youtube.com/@ExperienciaconDios",
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-dvh w-full overflow-hidden text-white"
    >
      <video
        playsInline
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={IntroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center gap-4 md:gap-4 2xl:gap-6 text-center fade-in-animation">
        {/* Bienvenida */}
        <div className="mt-30">
          <h3 className="text-5xl md:text-6xl 2xl:text-7xl font-swash">
            Bienvenido a Casa
          </h3>
        </div>
        {/* Botón de acción */}
        <div className="my-2">
          <a
            href="#reuniones"
            className="bg-primary rounded-full px-4 py-2 text-white font-semibold text-xl hover:bg-yellow-500 transition-colors duration-300 active:bg-yellow-500"
          >
            Visitanos
          </a>
        </div>

        {/* Texto presentación */}
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
        {/* Redes sociales */}
        <div className="flex gap-5 items-center *:hover:text-yellow-500 *:transition-colors *:duration-300">
          <a href={redes.instagram} target="_blank">
            <IconInstagram className="size-10 md:size-12" />
          </a>
          <a href={redes.facebook} target="_blank">
            <IconFacebook className="size-10 md:size-12" />
          </a>
          <a href={redes.youtube} target="_blank">
            <IconYoutube className="size-11 md:size-13" />
          </a>
        </div>

        <div className="pt-5">
          <a href="#bienvenida" className="animate-pulse ">
            <IconChevronDown className="text-white size-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
