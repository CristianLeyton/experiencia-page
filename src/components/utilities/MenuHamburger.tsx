

export function MenuHamburger({ className, onOpenMenu, isOpen }: { className?: string, onOpenMenu: any, isOpen: any }) {
  const closeMenuClass = "rotate-45 after:-rotate-45";
  const openMenu = isOpen;
  return (
    <button
      onClick={onOpenMenu}
      className={`relative pr-10 rounded-full cursor-pointer ${className}`}
    >
      <span
        className={`absolute top-1 left-1 w-[23px] border-b-3 rounded origin-left border-primary dark:border-white transition duration-300 ${
          openMenu && closeMenuClass
        }  `}
      ></span>
      <span
        className={`after:border-b-3 after:absolute after:rounded after:border-primary dark:after:border-white after:w-[23px] after:top-3 after:left-1 after:origin-left after:transition-all after:duration-200 ${
          openMenu && "after:opacity-0"
        }`}
      ></span>
      <span
        className={`after:border-b-3 after:absolute after:rounded after:border-primary dark:after:border-white after:w-[23px] after:top-5 after:left-1 after:origin-left after:transition after:duration-300 ${
          openMenu && closeMenuClass
        }`}
      ></span>
    </button>
  );
}
