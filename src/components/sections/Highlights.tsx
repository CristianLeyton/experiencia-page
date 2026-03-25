import { Title } from "../utilities/Title";
import curso from "../../assets/images/anuncios/curso.webp";
import pascua from "../../assets/images/anuncios/pascua.webp";
import { IconCalendar } from "../icons/IconCalendar";
import { IconMapPin } from "../icons/IconMapPin";
import { IconTime } from "../icons/IconTime";
import { IconChebron } from "../icons/IconChebron";

type HighlightCardProps = {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  hour: string;
  location: string;
  link: string;
};

function HighlightCard({
  title,
  text,
  imageSrc,
  imageAlt,
  date,
  hour,
  location,
  link,
}: HighlightCardProps) {
  return (
    <article className="bg-white dark:bg-primary rounded-xl overflow-hidden hover:border-yellow-500 transition-colors duration-300 border border-zinc-300 dark:border-zinc-700 group w-full md:max-w-sm xl:max-w-lg flex flex-col card">
      <div className="h-68 w-full overflow-hidden pt-4">
        <a href={link} target="_blank">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        </a>
      </div>

      <div className="px-8 py-4 flex flex-col gap-3">
        <h3 className="text-2xl font-swash border-b border-zinc-300 dark:border-zinc-700 pb-2 group-hover:text-yellow-500 transition-colors duration-300 text-center">
          {title}
        </h3>
        <p className="text-sm xl:text-base text-zinc-800 dark:text-zinc-100 text-pretty">
          {text}
        </p>
      </div>

      <div className="flex flex-col justify-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 px-8 pb-6">
      <p className="flex items-center gap-2">
        {" "}
        <IconCalendar className="text-yellow-500" /> <span>{date}</span>
      </p>
      <p className="flex items-center gap-2">
        <IconTime className="text-yellow-500" /> <span>{hour}</span>
      </p>
            <p className="flex items-center gap-2">
        <IconMapPin className="text-yellow-500" />
        <span>{location}</span>
      </p>

      {link && (
        <a href={link} target="_blank" className="bg-yellow-500 text-white mt-4 px-4 py-2 rounded-full font-bold flex items-center justify-center gap-2 group">
          Ver más
          <IconChebron className="text-white size-5 mr-2 group-hover:translate-x-1 transition-all duration-300" />
        </a>
      )}

      </div>
    </article>
  );
}

export function Highlights() {
  return (
    <section
      id="anuncios"
      className="scroll-m-20 py-8 px-4 text-primary dark:text-white bg-secondary/70 dark:bg-zinc-900"
    >
      <div className="container mx-auto">
        <div className="text-center flex flex-col gap-4">
          <Title text="Anuncios" />
          <p className="xl:text-lg text-center">
            Descubre los anuncios más importantes de nuestra iglesia
          </p>
        </div>

        <section className="flex items-center flex-wrap justify-center gap-6 py-6">
          <HighlightCard
            title="Ministry School - Liderazgo"
            text="Comienza un curso diseñado para todas las personas que deseen crecer y desarrollar su liderazgo basado en los principios de nuestra iglesia."
            imageSrc={curso}
            imageAlt="Liderazgo en Iglesia Experiencia con Dios"
            date="Inicia el 24 de Marzo"
            hour="21:00hs - 22:00hs"
            location="Encuentros por Zoom | Plataforma Hillsong"
            link="https://nightschool.thinkific.com/courses/liderazgo"
          />
          <HighlightCard
            title="Domingo de Resurreción"
            text="Pascua 2026 - Te invitamos a recordar la resurrección de nuestro Señor, celebraremos la Santa Cena en memoria de Jesús. "
            imageSrc={pascua}
            imageAlt="Pascua 2026 - Santa cena en casa"
            date="Domingo 05 de Abril"
            hour="10.30hs - 12:00hs"
            location="Hotel Brizo, Salón Quebrada"
            link="https://google.com/maps?cid=14577195373887313815&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAEYASAB&hl=es&gl=AR&source=embed"
          />
        </section>
      </div>
    </section>
  );
}
