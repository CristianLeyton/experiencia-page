import { Header } from "./components/sections/Header.tsx";
import "./App.css";
import { HomePage } from "./components/pages/HomePage.tsx";
import { NotFoundPage } from "./components/pages/NotFoundPage.tsx";
import { Footer } from "./components/sections/Footer.tsx";
import {Routes, Route} from "react-router";
import { ServicesPage } from "./components/pages/ServicesPage.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
