import Logo from "../../assets/images/logo-120x100.png";
import { SwitchTheme } from "../utilities/SwitchTheme.tsx";
import { MenuHamburger } from "../utilities/MenuHamburger.tsx";
import { useState } from "react";
import { HashLink as NavLink } from "react-router-hash-link";

type ItemProps = {
  href: string;
  children: React.ReactNode;
  onOpenMenu: any;
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
    <header className="dark:text-white sticky top-0 z-10 bg-white dark:bg-primary">
      <div className="px-4 py-2 flex items-center justify-between font-semibold container mx-auto">
        {/* LOGO */}
        <a href="/">
          <img
            src={Logo}
            className="h-16 md:h-20"
            alt="Logo Iglesia Experiencia con Dios"
          />
        </a>
        {/* NAV */}
        <nav
          className={`absolute md:static 
    border-r-2 md:border-none 
    border-primary dark:border-white 
    top-0 flex flex-col md:flex-row 
    transition-all duration-600 ease-in-out
    items-center bg-white dark:bg-primary 
    justify-center 
    w-full md:w-auto 
    h-dvh md:h-auto
    md:transition-none 
    gap-8 text-2xl sm:text-base 2xl:text-lg
    ${
      openMenu
        ? "left-0 visible"
        : "invisible -left-[150%] md:visible md:left-0"
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
          <Item href="/#contribuir" onOpenMenu={handleoOpenMenu}>
            Contribuir
          </Item>
        </nav>

        <span className="flex gap-4">
          <SwitchTheme />
          <MenuHamburger
            className="block md:hidden"
            isOpen={openMenu}
            onOpenMenu={handleoOpenMenu}
          />
        </span>
      </div>
    </header>
  );
}
