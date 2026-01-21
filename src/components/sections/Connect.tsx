import { Title } from "../utilities/Title";
import { CardConnect } from "../utilities/CardConnect";
import manosjuntas from "../../assets/images/manosjuntas.webp";

export function Connect() {
  return (
    <section
      id="conectar"
      className="scroll-m-20 py-8 px-4 text-primary dark:text-white"
    >
      <div className="container mx-auto">
        <div className="text-center flex flex-col gap-4">
          <Title text="Conectar con nosotros" />
          <div className="xl:text-lg">
            {/* Conectarse con nuestra comunidad y conocer a otros miembros de
            Iglesia Experiencia con Dios. */}
            Completa un formulario y nos pondremos en contacto contigo
            <br />
{/*             <p className="text-zinc-500 dark:text-zinc-400 text-sm pt-1">
              Completa un formulario y nos pondremos en contacto contigo
            </p> */}
          </div>
          <img src={manosjuntas} alt="manosjuntas" className="aspect-video object-cover w-full md:w-xl xl:w-2xl rounded-xl shadow mx-auto card"  style={{ objectPosition: "center 35%" }} />

        </div>

        <section className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardConnect
            title="Bienvenido a casa"
            text="¿Es tu primera vez en nuestra iglesia? Quizá podamos compartir un café.  ¡Queremos conocerte!"
            iconCoffee
            link="https://docs.google.com/forms/d/e/1FAIpQLSebnUXgz6GESi4EL2Z_meCRMF_rsbUG-t9q0fJIOPD0ZqdVyg/viewform"
          />

          <CardConnect
            title="¿Podemos orar por vos?"
            text="Comparte tu motivo de oración con nosotros. Sea lo que sea que estes atravesando, Dios quiere oirte."
            iconPray
            link="https://docs.google.com/forms/d/e/1FAIpQLSeNN1kQaIc3qHGPXfi8CQJo2YmtRfBF8fLVwt3zVmKQOf_lsw/viewform"
          />

          <CardConnect
            title="¡Únete a un grupo de conexión!"
            text="Reuniones con grupos pequeños para compartir de forma más personal y conectar con otros miembros de Iglesia."
            iconGroup
            link="https://docs.google.com/forms/d/e/1FAIpQLSfzY5vLLmEHW6E7QYNTxM5qzqucxGVUkjy62vIdMLwSv7VEhQ/viewform"
          />
        </section>
      </div>
    </section>
  );
}
