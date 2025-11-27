import { IconTime } from "../icons/IconTime";

export function Card({title, text, iconTime = false} : {title: string, text: string, iconTime?: boolean}) {
    return (
    <article className="bg-zinc-200 dark:bg-zinc-900 rounded-xl p-4 text-center relative hover:border-yellow-500 transition-colors duration-300 border border-secondary dark:border-primary group card">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{text}</p>
        
        {iconTime && <span className="absolute top-2 right-2 group-hover:text-yellow-500 transition-colors duration-300"><IconTime /></span>}
    </article>
    );
}