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
        className="absolute inset-0 -z-10
    [--grid-color:#]
    dark:[--grid-color:#fff]
  "
        style={{
          backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
          backgroundSize: "20px 20px",
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
      radial-gradient(ellipse 100% 10% at 50% 100%, black 10%, transparent 90%)
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
      radial-gradient(ellipse 100% 10% at 50% 100%, black 10%, transparent 90%)
    `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {<App />}
    </div>
  </StrictMode>
);
