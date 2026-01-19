import { IconMapPin } from "../icons/IconMapPin";
import { IconFacebook } from "../icons/IconFacebook";
import { IconInstagram } from "../icons/IconInstagram";
 import { IconWhatsApp } from "../icons/IconWhatsApp"; 
import { IconEmail } from "../icons/IconEmail";
/* import { IconPhone } from "../icons/IconPhone"; */

const CDL = "{CDL}";

const contact = {
  email: "experienciacondios@gmail.com",
  /*   phone: "+54 387 463-7703", */
  facebook: "https://web.facebook.com/iglesiaexperienciacondios",
  instagram: "https://www.instagram.com/experienciacondios/",
  whatsapp: "https://chat.whatsapp.com/DLrz7te2CmV0YhFa9DzR5C?mode=wwt", 
  ubicacion: "https://maps.app.goo.gl/npvWAhiJGbtFLAy57",
};

export function Footer() {
  return (
    <footer
      id="contacto"
      className="px-6 py-4 text-primary dark:text-secondary bg-secondary dark:bg-primary mx-auto text-sm"
    >
      <div className="grid md:justify-items-center items-center md:grid-cols-2 gap-7">
        <div className="space-y-0.5">
          <h2 className="text-lg lg:text-xl font-bold mb-1">
            Queremos conocerte
          </h2>
          <a
            href={contact.ubicacion}
            target="_blank"
            title="Ver en GoogleMaps"
            className="flex gap-1 items-center transition hover:text-yellow-500 group"
          >
            25 de Mayo 212, esq. Av Belgrano
            <IconMapPin className="text-primary dark:text-white group-hover:text-yellow-500 transition" />
          </a>
          <p>Hotel Brizo, salón Quebrada</p>
          <p>Salta, Salta - Argentina</p>
          <p>CP: 4400</p>
          {/*  <a
            href={`tel:${contact.phone}`}
            target="_blank"
            title="Llamar"
            className="transition hover:text-sky-600"
          >
            {" "}
            Celular: +54 387 463-7703
          </a>{" "} */}
          <br />
          <a
            href={`mailto:${contact.email}`}
            target="_blank"
            title="Enviar Correo"
            className="transition hover:text-yellow-500"
          >
            Correo: {contact.email}
          </a>
          <p className="pt-1 text-pretty font-semibold">
            ¡Escribinos por nuestras redes!
          </p>
        </div>

        <div className="flex justify-center gap-5 md:gap-4 flex-nowrap *:bg-zinc-950 *:dark:bg-zinc-800 *:text-white  *:inline-block *:p-1 *:rounded-lg *:scale-125 *:md:scale-125 *:transition">
          <a
            href={contact.instagram}
            target="_blank"
            className="hover:text-yellow-500"
            title="Cuenta de Instagram"
          >
            <IconInstagram className="" />
          </a>
          <a
            href={contact.facebook}
            className="hover:text-yellow-500"
            title="Cuenta de facebook"
          >
            <IconFacebook className="" />
          </a>
            <a
            href={contact.whatsapp}
            target="_blank"
            className="hover:text-yellow-500"
            title="Grupo de WhatsApp"
          >
            <IconWhatsApp className="" />
          </a> 
          <a
            href={`mailto:${contact.email}`}
            target="_blank"
            className="hover:text-yellow-500"
            title="Enviar Correo"
          >
            <IconEmail className="" />
          </a>
          {/*           <a
            href={`tel:${contact.phone}`}
            target="_blank"
            className="hover:text-yellow-500"
            title="Llamar"
          >
            <IconPhone className="" />
          </a> */}
        </div>
      </div>

      <div className="border-t border-zinc-500 mt-6 pt-3 text-center text-xs w-full text-neutral-600 dark:text-neutral-400">
        <a href="https://www.cdl.net.ar/" target="_blank">
          © 2026 - Iglesia
          Experiencia con Dios - Todos los derechos reservados
          <br  />Desarrollado por{" "}
          <span className="font-iceberg text-sm">{CDL}</span>{" "}
        </a>
      </div>
    </footer>
  );
}
