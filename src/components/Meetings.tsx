import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconPin from "../assets/images/marcador.png";
import { Title } from "./utilities/Title";
import { Card } from "./utilities/Card";

export function Meetings() {
  const linkGoogle = "https://maps.app.goo.gl/npvWAhiJGbtFLAy57";

  useEffect(() => {
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
  }, []);

  return (
    <section
      id="reuniones"
      className=" scroll-m-24 py-12 px-4 text-primary dark:text-white bg-secondary dark:bg-zinc-950"
    >
    <div className="container mx-auto">
      <div className="text-center flex flex-col gap-4">
        <Title text="Nuestras reuniones" />
        <p className="xl:text-lg">
          Un tiempo de alabanza, enseñanza de la Palabra y comunón. Estas
          invitado a cualquiera de nuestras reuniones generales.
        </p>
      </div>

      <article className="grid md:grid-cols-2 gap-6 items-center justify-items-center mt-6">
        <div className="flex flex-col gap-4 w-full max-w-lg group">
          <div className="text-center border rounded-xl p-4 border-primary dark:border-white bg-white dark:bg-primary group-hover:border-yellow-500 transition-colors duration-300">
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
                Se ingresa al salón Quebrada en el primer piso del hotel Brizo,
                por la entrada de la esquina entre 25 de mayo y Av. Belgrano
              </p>
              <p className="font-semibold text-xl  xl:text-2xl group-hover:scale-105 group-hover:text-yellow-500 transition-all duration-300">
                ¡Te esperamos!
              </p>
            </p>
          </div>
          <Card title="Reunion general" text="Sábado 19:30hs" iconTime />
          <Card title="Reunion general" text="Domingo 10:30hs" iconTime />
        </div>
        <div className="w-full xl:w-[80%] h-full p-1 bg-white rounded-xl">
          <div
            id="map"
            className="h-[400px] lg:h-[450px] w-full rounded-xl z-0"
          ></div>
        </div>
      </article>
      </div>
    </section>
  );
}
