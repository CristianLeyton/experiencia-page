import { Header } from "./components/sections/Header.tsx";
import "./App.css";
import { Hero } from "./components/sections/Hero.tsx";
import { Meetings } from "./components/sections/Meetings.tsx";
import { Connect } from "./components/sections/Connect.tsx";
import { Activities } from "./components/sections/Activities.tsx";
import { Contribute } from "./components/sections/Contribute.tsx";
import { Footer } from "./components/sections/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Meetings />
      <Connect />
      <Activities />
      <Contribute />
      <Footer />
    </>
  );
}

export default App;
