import { IconMapPin } from "../icons/IconMapPin";
import { IconTime } from "../icons/IconTime";
import { IconCalendar } from "../icons/IconCalendar";
import { IconParty } from "../icons/IconParty";
import { Title } from "../utilities/Title";

function EventCard({
  title,
  text,
  location,
  date,
  hour,
  iconParty = false,
}: {
  title: string;
  text: string;
  location: string;
  date: string;
  hour: string;
  iconParty?: boolean;
}) {
  return (
    <article className="bg-white dark:bg-primary rounded-xl px-8 py-4 relative hover:border-yellow-500 transition-colors duration-300 border border-zinc-300 dark:border-zinc-700 group w-full md:max-w-sm xl:max-w-lg flex flex-col gap-2 group card">
      <h3 className="text-2xl font-swash border-b border-zinc-300 dark:border-zinc-700 pb-2 group-hover:text-yellow-500 transition-colors duration-300 text-center">
        {title}
      </h3>

      {iconParty && (
        <span className="absolute top-4 right-4 group-hover:text-yellow-500 group-hover:animate-bounce transition-all duration-300">
          <IconParty className="" />
        </span>
      )}

      <p className="border-b border-zinc-300 dark:border-zinc-700 py-2">
        {text}
      </p>

      <div className="flex flex-col gap-2 text-sm text-zinc-800 dark:text-zinc-200">
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
      </div>
    </article>
  );
}

export function Events() {
  return (
    <section
      id="eventos"
      className="scroll-m-20 py-8 px-4 text-primary dark:text-white bg-secondary dark:bg-zinc-950"
    >
      <div className="container mx-auto">
        <div className="text-center flex flex-col gap-4">
          <Title text="Eventos"/>
          <p className="xl:text-lg text-center">
            Proximos eventos en nuestra iglesia, estas invitado a participar,
            todos son completamente gratuitos. ¡Y puedes invitar a quien
            quieras!
          </p>
        </div>
        <section className="flex items-center flex-wrap justify-center gap-6 py-6">
          <EventCard
            title="Santa cena"
            text="Participa de la santa cena con nuestra iglesia. Recordemos juntos la muerte y resurrección de nuestro Señor."
            location="Hotel Brizo, Salón Quebrada"
            date="Domingo 01 de Marzo"
            hour="10:30hs"
          />

{/*           <EventCard
            title="Especial Navidad"
            text="Estas invitado a nuestro evento de fin de año, tendremos un momento especial para adorar a nuestro Dios y compartir en comunidad. ¡No faltes!"
            location="Usina cultural - Teatro 'Macacha Güemes'"
            date="Domingo 21 de Diciembre"
            hour="19:30hs"
            iconParty
          /> */}
        </section>
      </div>
    </section>
  );
}
