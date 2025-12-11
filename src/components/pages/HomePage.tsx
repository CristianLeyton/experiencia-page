import { Hero } from "../sections/Hero.tsx";
import { Meetings } from "../sections/Meetings.tsx";
import { Connect } from "../sections/Connect.tsx";
import { Events } from "../sections/Events.tsx";
import { Contribute } from "../sections/Contribute.tsx";
import { useEffect } from "react";

export function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains("show")) {
              entry.target.classList.add("show");
            }
          } else {
            const boundingClientRect = entry.boundingClientRect;
            if (boundingClientRect.bottom > window.innerHeight) {
              //entry.target.classList.remove("show");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".card");

    // Empezar a observar cada elemento
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      // Parar de observar cada elemento
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <>
      <title>Iglesia Experiencia con Dios</title>
      <meta
        name="description"
        content="Somos una iglesia joven e inclusiva que ama a Dios, a las personas y a nuestra ciudad. Queremos ser manos y pies de Jesús, creando un lugar donde cualquiera pueda sentirse en casa, encontrar vida, propósito y esperanza. Vení tal como sos."
      />
      <meta property="og:title" content="Iglesia Experiencia con Dios" />
      <meta
        property="og:description"
        content="Somos una iglesia joven e inclusiva que ama a Dios, a las personas y a nuestra ciudad. Queremos ser manos y pies de Jesús, creando un lugar donde cualquiera pueda sentirse en casa, encontrar vida, propósito y esperanza. Vení tal como sos."
      />

      <Hero />
      <Meetings />
      <Connect />
      <Events />
      <Contribute />
    </>
  );
}
