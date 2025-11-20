import { Header } from "./components/sections/Header.tsx";
import "./App.css";
import { Hero } from "./components/sections/Hero.tsx";
import { Meetings } from "./components/sections/Meetings.tsx";
import { Connect } from "./components/sections/Connect.tsx";
import { Footer } from "./components/sections/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Meetings />
      <Connect />
      <Footer />
    </>
  );
}

export default App;
