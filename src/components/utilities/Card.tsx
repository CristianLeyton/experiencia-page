function IconTime() {
    return (
        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "currentColor"}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path></svg>
    )
}

export function Card({title, text, iconTime = false} : {title: string, text: string, iconTime?: boolean}) {
    return (
    <article className="bg-gray-200 dark:bg-gray-900 rounded-xl p-4 text-center relative">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{text}</p>
        
        {iconTime && <span className="absolute top-2 right-2"><IconTime /></span>}
    </article>
    );
}