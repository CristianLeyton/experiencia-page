import { Title } from "../utilities/Title";
import casaAbierta from "../../assets/images/anuncios/casa-abierta.jpeg";
import diaMadre from "../../assets/images/anuncios/dia-de-la-madre.png";
import dedicacion from "../../assets/images/anuncios/dedicacion-de-bebes.png";
import { IconCalendar } from "../icons/IconCalendar";
import { IconMapPin } from "../icons/IconMapPin";
import { IconTime } from "../icons/IconTime";
import { IconChebron } from "../icons/IconChebron";

export const HIGHLIGHTS: HighlightCardProps[] = [
  {
    title: "Dia de la madre",
    text: `Celebra el Dia de la Madre con nosotros en familia. Una reunion especial para celebrar a las mades, con testimonios y un ambiente lleno de amor y gratitud.`,
    imageSrc: diaMadre,
    imageAlt: "Dia de la madre",
    date: "18 de Octubre de 2026",
    hour: "10:00 AM - 12:00 PM",
    location: `Hotel Brizo, Salón Quebrada - Belgrano y 25 de Mayo, Salta`,
    link: "",
    endDate: "2026-10-18",
  },
  {
    title: "Dedicación de bebes y niños",
    text: `Presentamos y oramos por los más pequeños de nuestra iglesia. «Dejen que los niños vengan a mí; no se lo impidan, porque el reino de los cielos es de quienes son como ellos.»`,
    imageSrc: dedicacion,
    imageAlt: "Dedicación de bebes y niños",
    date: "25 de Octubre de 2026",
    hour: "10:00 AM - 12:00 PM",
    location: `Hotel Brizo, Salón Quebrada - Belgrano y 25 de Mayo, Salta`,
    link: "",
    endDate: "2026-10-25",
  },
  {
    title: "Casa Abierta 2027",
    text: `Gran evento de la igelsia Hillsong Argentina en el Centro de Convenciones BA. Con la visita especial del pastor Cash Luna y de Israel Houghton grabando junto a Hillsong en Español ¡En vivo!`,
    imageSrc: casaAbierta,
    imageAlt: "Casa Abierta 2027",
    date: "25, 26 y 27 de Febrero de 2027",
    hour: "Desde el Jueves 25 a las 18:00hs",
    location: `Centro de Convenciones Buenos Aires - Av. Pres. Figueroa Alcorta 2099, C1112ACA Cdad. Autónoma de Buenos Aires`,
    link: "https://hillsong.fint.app/eventos/casa-abierta-2027",
    endDate: "2027-02-27",
  },
];

/* Dejarlo vacío este array para no mostrar nada en la sección de anuncios */
/*  export const HIGHLIGHTS: HighlightCardProps[] = [];  */

type HighlightCardProps = {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  hour?: string;
  location: string;
  link?: string;
  endDate?: string | null;
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
        {link && (
          <a href={link} target="_blank">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </a>
        )}
        {!link && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
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
          <IconCalendar className="text-yellow-500 shrink-0" />{" "}
          <span>{date}</span>
        </p>
        {hour && (
          <p className="flex items-center gap-2">
            <IconTime className="text-yellow-500 shrink-0" />{" "}
            <span>{hour}</span>
          </p>
        )}
        <p className="flex items-center gap-2">
          <IconMapPin className="text-yellow-500 shrink-0" />
          <span>{location}</span>
        </p>

        {link && (
          <a
            href={link}
            target="_blank"
            className="bg-yellow-500 text-white mt-4 px-4 py-2 rounded-full font-bold flex items-center justify-center gap-2 group"
          >
            Ver más
            <IconChebron className="text-white size-5 mr-2 group-hover:translate-x-1 transition-all duration-300" />
          </a>
        )}
      </div>
    </article>
  );
}

export function Highlights() {
  if (HIGHLIGHTS.length === 0) return null;

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
          {HIGHLIGHTS.filter(
            (highlight) =>
              highlight.endDate === null ||
              new Date(highlight.endDate!) > new Date(),
          ).map((highlight) => (
            <HighlightCard
              key={highlight.title}
              title={highlight.title}
              text={highlight.text}
              imageSrc={highlight.imageSrc}
              imageAlt={highlight.imageAlt}
              date={highlight.date || ""}
              hour={highlight.hour || ""}
              location={highlight.location || ""}
              link={highlight.link || ""}
            />
          ))}
        </section>
      </div>
    </section>
  );
}
