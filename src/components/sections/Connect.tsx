import { Title } from "../utilities/Title";

export function Connect() {
  return (
    <section
      id="conectar"
      className="scroll-m-20 py-12 px-4 text-primary dark:text-white"
    >
      <div className="container mx-auto">
        <div className="text-center flex flex-col gap-4">
          <Title text="Conectar con nosotros" />
          <p className="xl:text-lg">
            Conectarse con nuestra comunidad y conocer a otros miembros de
            Iglesia Experiencia con Dios.
          </p>
        </div>
      </div>
    </section>
  );
}
