/* import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconPin from "../../assets/images/marcador.png"; */
import { Title } from "../utilities/Title";
import { Card } from "../utilities/Card";
import reunion from "../../assets/images/reunion.webp";

export function Meetings() {
  const linkGoogle = "https://maps.app.goo.gl/qDgKSWTS7CKc9bgJA";

/*   useEffect(() => {
    const coord = {
      X: -24.786853,
      Y: -65.414772,
    };

    const map = L.map("map").setView([coord.X, coord.Y], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "Map © OpenStreetMap",
    }).addTo(map);

    const marcador = L.icon({
      iconUrl: iconPin,
      iconSize: [25, 60],
      popupAnchor: [0, -35],
    });

    const marker = L.marker([coord.X, coord.Y], { icon: marcador }).addTo(map);

    marker.bindPopup(`
    <b>¡Nuestra ubicación!</b><br>
    <a href=${linkGoogle} target='_blank'>Cómo llegar</a>
  `);

    // 👉 Limpieza correcta para TypeScript
    return () => {
      map.remove();
    };
  }, []); */

  return (
    <section
      id="reuniones"
      className=" scroll-m-20 py-8 px-4 text-primary dark:text-white bg-secondary dark:bg-zinc-950"
    >
      <div className="container mx-auto">
        <div className="text-center flex flex-col gap-4">
          <Title text="Nuestras reuniones" />
          <p className="xl:text-lg">
            Un tiempo de alabanza, enseñanza de la Palabra y comunión. Estas
            invitado a cualquiera de nuestras reuniones generales.
          </p>

          <img src={reunion} alt="reuniones" className="aspect-video object-cover w-4xl rounded-xl shadow mx-auto card" />
        </div>

        <article className="grid md:grid-cols-2 gap-6 items-center justify-items-center mt-6">
          <div className="flex flex-col gap-4 w-full max-w-lg">
            <div className="text-center border rounded-xl p-4 group border-primary dark:border-white bg-white dark:bg-primary hover:border-yellow-500 transition-colors duration-300 card">
              <p className="text-lg xl:text-xl flex flex-col gap-2">
                <a
                  href={linkGoogle}
                  target="_blank"
                  className="hover:text-yellow-500 transition-colors duration-300 active:text-yellow-500"
                >
                  <span className="font-semibold">Direccion:</span> 25 de Mayo
                  212, Salta - Salta
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Se ingresa al salón Quebrada en el primer piso del hotel
                  Brizo, por la entrada de la esquina entre 25 de mayo y Av.
                  Belgrano
                </p>
                <p className="font-semibold text-xl  xl:text-2xl group-hover:scale-105 group-hover:text-yellow-500 transition-all duration-300">
                  ¡Te esperamos!
                </p>
              </p>
            </div>
            <Card title="Reunion general" text="Sábado 19:30hs" iconTime />
            <Card title="Reunion general" text="Domingo 10:30hs" iconTime />
          </div>
          <div className="w-full xl:w-[80%] h-full p-1 bg-white rounded-xl card">
{/*             <div
              id="map"
              className="h-[250px] md:h-full lg:h-[360px] w-full rounded-xl z-0"
            ></div> */}
            <iframe className="h-[250px] md:h-full lg:h-[360px] w-full rounded-xl z-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.2514154130326!2d-65.41742392381015!3d-24.786843107756987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc3ba42825995%3A0xca4c99f592055797!2s25%20de%20Mayo%20212%2C%20A4400%20Salta!5e0!3m2!1ses!2sar!4v1764379141072!5m2!1ses!2sar"></iframe>

          </div>
        </article>
      </div>
    </section>
  );
}
