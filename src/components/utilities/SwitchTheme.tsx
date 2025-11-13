import { IconMoon } from "../icons/IconMoon";
import { IconSun } from "../icons/IconSun";

function newTheme() {
  const tagHTML = document.documentElement;
  tagHTML.classList.toggle("dark");
  const newTheme = tagHTML.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
}

export function SwitchTheme() {
  return (
    <button
      className="block p-1 size-8 -mt-0.5 rounded-full transition hover:text-primary hover:bg-secondary dark:hover:bg-gray-700 hover:scale-110 duration-300 dark:text-white dark:hover:text-yellow-500 cursor-pointer"
      onClick={newTheme}
    >
      <IconSun className="hidden dark:block" />
      <IconMoon className="dark:hidden" />
    </button>
  );
}
