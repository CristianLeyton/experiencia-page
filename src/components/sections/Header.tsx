import Logo from "../../assets/images/logo.png";
/* import LogoHillsong from "../../assets/images/logo-hillsong-network.png"; */
import { SwitchTheme } from "../utilities/SwitchTheme.tsx";
import { MenuHamburger } from "../utilities/MenuHamburger.tsx";
import { useState } from "react";
import { HashLink as NavLink } from "react-router-hash-link";

type ItemProps = {
  href: string;
  children: React.ReactNode;
  onOpenMenu: () => void;
};

function Item({ href, children, onOpenMenu }: ItemProps) {
  return (
    <NavLink
      to={href}
      onClick={onOpenMenu}
      className="relative py-1 hover:text-yellow-500 transition-all duration-300 after:border-b-2 after:border-yellow-500 after:bottom-0 after:left-0 after:absolute after:w-0 hover:after:w-full after:transition-all after:duration-300 active:text-yellow-500
    "
    >
      {children}
    </NavLink>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  function handleoOpenMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <header className="dark:text-white fixed top-0 w-full z-20 bg-white dark:bg-primary">
      <div className="px-4 py-2 flex items-center justify-between font-semibold container mx-auto">
        {/* LOGO */}
        <section className="flex gap-2 items-center justify-start w-full">
          <div className="flex gap-2 items-center shrink-0">
            <a href="/">
              <img
                src={Logo}
                className="h-15 md:h-17 dark:invert scale-100"
                alt="Logo Iglesia Experiencia con Dios"
              />
            </a>

            {/*             <a href="https://network.hillsonglatam.com/" target="_blank">
              <img
                src={LogoHillsong}
                className="h-14 md:h-16 dark:invert"
                alt="Logo Hillsong Network"
              />
            </a> */}
          </div>
          {/* NAV */}
          <nav
            className={`absolute lg:static bg-white
    border-r-2 lg:border-none 
    border-primary dark:border-white 
    top-0 flex flex-col lg:flex-row 
    transition-all duration-600 ease-in-out
    items-center dark:bg-primary 
justify-center 
    lg:w-[90%] w-full
    h-dvh lg:h-auto
    lg:transition-none 
    gap-8 text-2xl sm:text-base 2xl:text-lg
    ${
      openMenu
        ? "left-0 visible"
        : "invisible -left-[150%] lg:visible lg:left-0"
    }
  `}
          >
            <Item href="/#inicio" onOpenMenu={handleoOpenMenu}>
              Bienvenida
            </Item>
            <Item href="/#reuniones" onOpenMenu={handleoOpenMenu}>
              Reuniones
            </Item>
            <Item href="/#conectar" onOpenMenu={handleoOpenMenu}>
              Conectar
            </Item>
            <Item href="/#eventos" onOpenMenu={handleoOpenMenu}>
              Eventos
            </Item>
            <Item href="/#anuncios" onOpenMenu={handleoOpenMenu}>
              Anuncios
            </Item>
            <Item href="/#contribuir" onOpenMenu={handleoOpenMenu}>
              Contribuir
            </Item>
          </nav>
        </section>
        <span className="flex gap-4">
          <SwitchTheme />
          <MenuHamburger
            className="block lg:hidden"
            isOpen={openMenu}
            onOpenMenu={handleoOpenMenu}
          />
        </span>
      </div>
    </header>
  );
}
