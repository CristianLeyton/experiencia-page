import LogoGrande from "../assets/images/logo-500x500.png";
import { IconMFacebook } from "./icons/IconFacebook";
import { IconInstagram } from "./icons/IconInstagram";
import { IconYoutube } from "./icons/IconYoutube";
const redes = {
  instagram: "https://www.instagram.com/experienciacondios/",
  facebook: "https://web.facebook.com/iglesiaexperienciacondios",
  youtube: "https://www.youtube.com/@ExperienciaconDios",
};

export function Hero() {
  return (
    <section id="inicio" className="text-center text-primary dark:text-white grid place-items-center fade-in-animation container mx-auto px-4 gap-6 md:gap-4 2xl:gap-6 overflow-hidden pb-6 scroll-m-24">
      {/* Logo */}
      <div>
        <img
          src={LogoGrande}
          alt="Experiencia con Dios Logo grande"
          className="size-48 md:size-52 2xl:size-60 -mt-2 -mb-3"
        />
      </div>
      {/* Bienvenida */}
      <div>
        <h3 className="text-5xl md:text-6xl 2xl:text-7xl font-swash">
          Bienvenido a Casa
        </h3>
      </div>
      {/* Botón de acción */}
      <div className="my-2">
        <a
          href="#reuniones"
          className="bg-primary rounded-full px-4 py-2 text-white dark:text-primary dark:bg-white font-semibold text-lg hover:bg-yellow-500 transition-colors duration-300 active:bg-yellow-500"
        >
          Visitanos
        </a>
      </div>

      {/* Texto presentación */}
      <div className="flex flex-col gap-2 xl:text-lg">
        <p>
          Somos una iglesia joven e inclusiva que ama a Dios, a las personas y a
          nuestra ciudad.
        </p>
        <p>
          Queremos ser manos y pies de Jesús, creando un lugar donde cualquiera
          pueda sentirse en casa, encontrar vida, propósito y esperanza.
        </p>

        <p>Vení tal como sos.</p>
      </div>
      {/* Redes sociales */}
      <div className="flex gap-5 items-center *:hover:text-yellow-500 *:transition-colors *:duration-300">
        <a href={redes.instagram} target="_blank">
          <IconInstagram className="size-10 md:size-12" />
        </a>
        <a href={redes.facebook} target="_blank">
          <IconMFacebook className="size-10 md:size-12" />
        </a>
        <a href={redes.youtube} target="_blank">
          <IconYoutube className="size-11 md:size-13" />
        </a>
      </div>
    </section>
  );
}
