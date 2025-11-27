import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

//Esto es para inicializar el tema deseado en la web
(function () {
  try {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  } catch (error) {}
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-screen w-full relative">
      {/* Dashed Bottom Fade Grid */}
      <div
        className="
    absolute inset-0 -z-10

    /* 🎯 Estilos MOBILE por defecto */
    [--grid-color:#cccccc]
    [--grid-size:20px_20px]
    [--grid-mask:radial-gradient(ellipse_130%_100%_at_50%_100%,black_90%,transparent_95%)]

    /* 🎯 Estilos DESKTOP (md en adelante) */
    md:[--grid-color:#cccccc]
    md:[--grid-size:20px_20px]
    md:[--grid-mask:radial-gradient(ellipse_100%_100%_at_50%_100%,black_70%,transparent_95%)]

    /* 🎯 Dark mode */
    dark:[--grid-color:#4a4a4a]
    md:dark:[--grid-color:#4a4a4a]
  "
        style={{
          backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
          backgroundSize: "var(--grid-size)",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      var(--grid-mask)
    `,
          WebkitMaskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      var(--grid-mask)
    `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
      </div>
        {<App />}
    </div>
  </StrictMode>
);
