import { IconChebron } from "../icons/IconChebron";
import { Title } from "../utilities/Title";
import { useState } from "react";
import adoracion from "../../assets/images/adoracion.webp";
import { Link } from "react-router";

export const areas = [
    "Niños y Adolescentes",
    "Alabanza y Música",
    "Equipo de Bienvenida",
    "Equipo de Refrigerio",
    "Redes Sociales y Diseño",
    "Multimedia y Sonido",
    "Area de ayuda social"
  ];

function CopyToClipboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <title>Copiar al portapapeles</title>
      <path
        fill="currentColor"
        d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593s1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.6 3.6 0 0 0 15.24 2"
      />
      <path
        fill="currentColor"
        d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847S21 8.671 21 11.397v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936z"
      />
    </svg>
  );
}

export function Contribute() {
  const ALIAS_TEXT = "CUENTA.EXPERIENCIA";
  const [copyStatus, setCopyStatus] = useState(ALIAS_TEXT); // Usamos el alias como estado inicial

  const handleCopy = () => {
    // 1. Crear un elemento de entrada temporal
    const tempInput = document.createElement("input");
    // 2. Asignar el valor que queremos copiar
    tempInput.value = ALIAS_TEXT;
    document.body.appendChild(tempInput);

    // 3. Seleccionar el texto y ejecutar el comando de copia
    tempInput.select();

    let success = false;
    try {
      success = document.execCommand("copy");
    } catch (err) {
      console.error("Error al intentar copiar:", err);
    }

    // 4. Eliminar el elemento temporal
    document.body.removeChild(tempInput);

    // 5. Mostrar feedback al usuario
    if (success) {
      setCopyStatus("SE COPIO EL ALIAS");
    } else {
      setCopyStatus("Error al copiar");
    }

    // 6. Restablecer el estado después de 2 segundos
    setTimeout(() => {
      setCopyStatus(ALIAS_TEXT);
    }, 1500);
  };

  return (
    <section
      id="contribuir"
      className="scroll-m-20 py-8 px-4 text-primary dark:text-white container mx-auto"
    >
      <div className="text-center flex flex-col gap-4">
        <Title text="Contribuir" />
        <div className="xl:text-lg">
          Hay dos formas principales de ser parte activa de la misión: con tu
          tiempo y talento sirviendo en un área, o a través de tus finanzas.{" "}
          <br /> <b>¡Elige cómo quieres hacer la diferencia!</b>
          <br />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm pt-1">
            Contribuir no es obligatorio, no te sientas presionado a hacerlo. Lo
            más importante es tu relación con Dios.
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 py-6 gap-6">
        <article className="bg-zinc-50 dark:bg-zinc-950 rounded-xl py-6 px-8 text-center hover:border-yellow-500 transition-colors duration-300 border border-zinc-300 dark:border-zinc-700 group flex flex-col gap-2 justify-center items-center card">
          <h3 className="text-2xl font-swash">
            Contribuir con tu tiempo y talento
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Contribuir con tu tiempo y talento sirviendo en un área, cada área
            es vital para que la misión se cumpla. ¡Hay un lugar perfecto para
            vos! Te ayudamos a encontrarlo.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-primary dark:text-secondary my-4 text-left">
            {areas.map((area, index) => (
              <li className="flex items-center" key={index}>
                <span className="text-yellow-500 mr-2 mb-0.5">
                  <IconChebron className="text-yellow-500" />
                </span>{" "}
                <span>{area}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/servicios"
            className="mt-1 bg-primary rounded-full px-3 py-1.5 text-white dark:text-primary dark:bg-white font-semibold hover:bg-yellow-500 transition-colors duration-300 active:bg-yellow-500 text-sm"
          >
            Quiero ser parte
          </Link>
        </article>

        <article className="bg-zinc-50 dark:bg-zinc-950 rounded-xl py-6 px-8 text-center hover:border-yellow-500 transition-colors duration-300 border border-zinc-300 dark:border-zinc-700 group flex flex-col gap-2 justify-center items-center card">
          <h3 className="text-2xl font-swash">Diezmos y ofrendas</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Nuestro ministerio se mantiene gracias a sus ofrendas y donaciones.
            ¡Ayúdanos a seguir adelante!
          </p>

          <div className="flex flex-col gap-2 border border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 w-full items-center">
            <b>Nuestro alias:</b>
            <p className="bg-zinc-200 dark:bg-zinc-800 px-6 py-3 rounded-xl text-primary dark:text-white text-center">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors duration-300  ${
                  copyStatus === "SE COPIO EL ALIAS" ? "text-yellow-500" : ""
                }`}
              >
                <span>{copyStatus}</span>
                <CopyToClipboard className="size-5" />
              </button>
            </p>

            <p className="text-xs ">
              Banco: Banco Santander
              <br />
              Titular: Asociacion Civil Experiencia
              <br />
              CUIT/CUIL: 33-71725674-9
            </p>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm pt-1">
            Contribuir no es obligatorio, no te sientas presionado a hacerlo,
            pero agradecemos tu ayuda para poder seguir llevando donaciones a
            quienes lo necesitan y para que siempre haya un lugar para todos.
          </p>
        </article>
      </section>

      <img
        src={adoracion}
        alt="adoracion"
        className="aspect-square md:aspect-video object-cover w-full lg:w-xl xl:w-2xl rounded-xl shadow mx-auto card"
      />
    </section>
  );
}
