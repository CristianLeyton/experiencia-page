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
      <Hero />
      <Meetings />
      <Connect />
      <Events />
      <Contribute />
    </>
  );
}
