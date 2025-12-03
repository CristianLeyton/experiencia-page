import { useEffect, useState, useRef } from "react";
import { areas } from "../sections/Contribute.tsx";
import { Title } from "../utilities/Title.tsx";
import image1 from "../../assets/images/1.jpeg";
import image2 from "../../assets/images/2.jpeg";
import image3 from "../../assets/images/3.jpeg";
import image4 from "../../assets/images/4.jpeg";
import image5 from "../../assets/images/5.jpeg";

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [enviar, setEnviar] = useState('Enviar');

  const formularioRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      nombre: { value: string };
      apellido: { value: string };
      telefono: { value: string };
      mensaje: { value: string };
      area: { value: string };
    };
    const date = new Date();

    const inputValue: { [key: string]: string } = {
      Email: target.email.value,
      Fecha: date.toLocaleString(),
      Area: target.area.value,
      Mensaje: target.mensaje.value,
      Nombre: target.nombre.value,
      Apellido: target.apellido.value,
      Telefono: target.telefono.value,
      "¿Contactado?": "No",
    };
    console.log(inputValue);

    const APP_ID =
      "AKfycbwGMT7VCtiuJqc95Jvmih70bc057Er1asT3L4qOK6NeYpiAiG_bJz0xvtr3dKQLBHfkBw";
    const baseURL = `https://script.google.com/macros/s/${APP_ID}/exec`;
    const formData = new FormData();
    Object.keys(inputValue).forEach((key) => {
      formData.append(key, inputValue[key]);
    });
    try {
        setEnviar('Enviando...');
      const res = await fetch(baseURL, { method: "POST", body: formData });
      if (res.ok) {
        console.log("Request was successful:", res);
        formularioRef.current?.reset();
        setEnviar('Enviado');
      } else {
        console.log("Request Failed:", res);
        setEnviar('Error, no se pudo enviar el formulario');
      }
    } catch (e) {
      console.error("Error during fetch:", e);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center container mx-auto px-4 py-6 dark:text-secondary">
      <Title text="Únete a algun area de servicio" />
      <div className="xl:text-lg flex flex-col gap-4 text-center text-balance max-w-6xl">
        <p className="pt-2">
          Queremos ser pies y manos de Jesús, cada uno tiene talentos que Dios
          nos otorgó es momento de hacerlos crecer, por eso te invitamos a
          unirte a alguno de los servicios que ofrecemos.
        </p>

        <div className="grid grid-cols-12 gap-3 max-w-4xl mx-auto *:hover:scale-125 *:transition-transform *:duration-300 *:hover:shadow-xl *:hover:z-20 *:cursor-zoom-in">
          <img src={image3} alt="image1" className="rounded-xl col-span-6 aspect-video object-cover card show" />
          <img src={image5} alt="image2" className="rounded-xl col-span-6 aspect-video object-cover card show" />
          <img src={image2} alt="image3" className="rounded-xl col-span-4 aspect-video object-cover card show" />
          <img src={image1} alt="image4" className="rounded-xl col-span-4 aspect-video object-cover card show" />
          <img src={image4} alt="image5" className="rounded-xl col-span-4 aspect-video object-cover card show" />
        </div>

        <b className="text-2xl pt-4">¡Elige cómo quieres hacer la diferencia!</b>
        <p className="text-zinc-500 dark:text-zinc-400">
          Completa el formulario para que te contactemos y te ayudemos a
          encontrar el lugar perfecto para ti.
        </p>
      </div>

      <form ref={formularioRef} onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6 w-full sm:max-w-lg text-primary dark:text-secondary bg-zinc-50 dark:bg-zinc-950 rounded-xl p-8 text-center [&>input]:p-2 [&>input]:border [&>input]:border-zinc-400 [&>input]:rounded card show">
        <input name="nombre" type="text" placeholder="Nombre*" required disabled={enviar === 'Enviado'}/>
        <input name="apellido" type="text" placeholder="Apellido*" required disabled={enviar === 'Enviado'}/>
        <input name="telefono" type="tel" placeholder="Telefono*" required disabled={enviar === 'Enviado'}/>
        <input name="email" type="email" placeholder="Correo*" required disabled={enviar === 'Enviado'}/>
        <input name="mensaje" type="text" placeholder="Mensaje" disabled={enviar === 'Enviado'}/>
        <select name="area" required defaultValue={""} className="rounded border border-zinc-400 py-2 px-1 text-primary dark:text-secondary [&>option]:text-primary" disabled={enviar === 'Enviado'}>
          <option value="" disabled >
            Selecciona una opción
          </option>
          {areas.map((area, index) => (
            <option key={index}>{area}</option>
          ))}
        </select>
        <button type="submit" className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-primary rounded px-3 py-1.5 text-white dark:text-primary dark:bg-white font-semibold hover:bg-yellow-500 transition-colors duration-300 active:bg-yellow-500 text-sm" disabled={enviar != 'Enviar'}>{enviar}</button>
      </form>

      {enviar == 'Enviado' && (
        <div className="flex flex-col gap-2 border mt-4 max-w-xl text-center border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 w-full items-center bg-zinc-50 dark:bg-zinc-950 card show">
          <b>¡Tu mensaje ha sido enviado!</b>
          <p className="text-zinc-500 dark:text-zinc-400">Nos pondremos en contacto contigo lo antes posible. </p>
          <p className="bg-zinc-200 dark:bg-zinc-800 px-4 py-1.5 rounded-lg text-primary dark:text-white text-center">
            <button
              onClick={() => setEnviar('Enviar')}
              className={`flex text-sm items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors duration-300
              }`}
            >
              <span>Enviar otro</span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
