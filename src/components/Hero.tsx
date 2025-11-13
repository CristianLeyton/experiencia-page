import LogoGrande from "../assets/images/logo-500x500.png"
import { IconMFacebook } from "./icons/IconFacebook";
import { IconInstagram } from "./icons/IconInstagram";
import { IconYoutube } from "./icons/IconYoutube";
const redes = {
    instagram: 'https://www.instagram.com/experienciacondios/',
    facebook: 'https://web.facebook.com/iglesiaexperienciacondios',
    youtube: 'https://www.youtube.com/@ExperienciaconDios'
}

export function Hero() {
    return (
        <section className="font-swash text-center text-primary dark:text-white grid place-items-center fade-in-animation">
            <div>
            <img src={LogoGrande} alt="Experiencia con Dios Logo grande" className="size-50 md:size-60 -mt-2" />
            </div>
            <div>
            <h3 className="text-5xl md:text-6xl xl:text-7xl">Bienvenido a Casa</h3>
            </div>
            <div className="flex gap-5 items-center pt-8 *:hover:text-yellow-500 *:transition-colors *:duration-300">
                <a href={redes.instagram} target="_blank"><IconInstagram className="size-10 md:size-12"/></a>
                <a href={redes.facebook} target="_blank"><IconMFacebook className="size-10 md:size-12"/></a>
                <a href={redes.youtube} target="_blank"><IconYoutube className="size-11 md:size-13"/></a>
            </div>
        </section>
    );
} 