import { Title } from "../utilities/Title";

export function Welcome() {
  return (
    <section id="bienvenida" className="scroll-m-20 py-8 px-4 text-primary dark:text-white card">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 bg-white border border-primary dark:border-white dark:bg-primary rounded-xl p-4 md:p-8 xl:text-lg text-left max-w-6xl mx-auto">
          <Title text="Una nueva experiencia" />

          <h2 className="text-2xl font-swash md:mt-2">
            Bienvenido a <br className="block md:hidden"/> Experiencia con Dios
          </h2>

          <div className="flex flex-col gap-4 text-neutral-700 dark:text-neutral-300 p-2 md:p-0">
            <p>
              Felicitaciones por este nuevo paso de fe que has tomado.
              Estamos muy contentos de que hayas asistido a nuestra iglesia y esperamos que te hayas sentido bienvenido.
            </p>

            <p>
              Vos y tu familia son importantes para nosotros, y nuestro deseo es que sientas la increíble bondad de Dios en este lugar, que florezcas en Su gracia y que conectes rápidamente con el corazón de nuestra casa.
            </p>

            <p>Más abajo vas a encontrar información acerca de quién es Jesús y cómo avanzar en este nuevo comienzo de fe.</p>

            <p>
              Tenemos un gran equipo de personas a las que les encantaría conectar con vos, conocerte y acompañarte en tus próximos pasos. Podés dejarnos tus datos para que un miembro de nuestro equipo se ponga en contacto contigo. Estamos aquí para servirte.
            </p>

            <p>
              Bienvenido a la familia.
            </p>
          </div>
          <p className="text-right">
            <span className="font-swash text-lg lg:text-xl">Maxi y Abi Mychalewsky</span> <br />
            <span className="">Pastores de Experiencia con Dios</span>
          </p>
        </div>
      </div>
    </section>
  );
}