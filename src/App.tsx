import { Header } from "./components/sections/Header.tsx";
import "./App.css";
import { Hero } from "./components/sections/Hero.tsx";
import { Meetings } from "./components/sections/Meetings.tsx";
import { Connect } from "./components/sections/Connect.tsx";
import { Events } from "./components/sections/Events.tsx";
import { Contribute } from "./components/sections/Contribute.tsx";
import { Footer } from "./components/sections/Footer.tsx";
import { useEffect } from "react";

function App() {

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
      <Header />
      <Hero />
      <Meetings />
      <Connect />
      <Events />
      <Contribute />
      <Footer />
    </>
  );
}

export default App;
