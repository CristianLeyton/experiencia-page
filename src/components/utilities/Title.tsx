export function Title({text} : {text: string}) {
    return (
        <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-swash text-center">{text}</h2>
    );
}