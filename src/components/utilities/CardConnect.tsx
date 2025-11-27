function IconCoffee(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
    >
      <title>cafe</title>
      <path
        fill="currentColor"
        d="M2 28h28v2H2zm22.5-17H8a2 2 0 0 0-2 2v8a5.006 5.006 0 0 0 5 5h8a5.006 5.006 0 0 0 5-5v-1h.5a4.5 4.5 0 0 0 0-9M22 21a3.003 3.003 0 0 1-3 3h-8a3.003 3.003 0 0 1-3-3v-8h14zm2.5-3H24v-5h.5a2.5 2.5 0 0 1 0 5M19 9h-2v-.146a1.99 1.99 0 0 0-1.105-1.789L13.21 5.724A3.98 3.98 0 0 1 11 2.146V1h2v1.146a1.99 1.99 0 0 0 1.106 1.789l2.683 1.341A3.98 3.98 0 0 1 19 8.854z"
      />
    </svg>
  );
}

function IconPray(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
    >
      <title>praying-hands</title>
      <path
        fill="currentColor"
        d="M15 3c-1.645 0-3 1.355-3 3l.016-.164l-.985 5.91l-1.89 5.172C9.105 16.965 9.062 17 9 17H8v-1H3v13h5v-3h3.926c1.644 0 3.125-.797 4.074-2.035c.95 1.238 2.43 2.035 4.074 2.035H24v3h5V16h-5v1h-1c-.063 0-.105-.035-.14-.082l-1.891-5.172l-.985-5.91L20 6c0-1.645-1.355-3-3-3c-.34 0-.688.066-1 .227A2.2 2.2 0 0 0 15 3m-.035 2.016c.02.144.035.472.035.984v15.438A3.12 3.12 0 0 1 11.926 24H8v-5h1a2.19 2.19 0 0 0 1.902-1.11l.04-.074l2.027-5.562L14 6.082V6c0-.55.422-.965.965-.984m2.07 0c.543.02.965.433.965.984v.082l1.031 6.172l2.028 5.562l.039.075A2.19 2.19 0 0 0 23 19h1v5h-3.926A3.12 3.12 0 0 1 17 21.437V6c0-.512.016-.84.035-.984M5 18h1v9H5zm21 0h1v9h-1z"
      />
    </svg>
  );
}

export function IconGroup(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <title>user-group</title>
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      >
        <path d="M15.5 11a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0" />
        <path d="M15.483 11.35q.484.149 1.017.15a3.5 3.5 0 1 0-3.483-3.85m-2.034 0a3.5 3.5 0 1 0-2.466 3.7M22 16.5c0-2.761-2.462-5-5.5-5m1 8c0-2.761-2.462-5-5.5-5s-5.5 2.239-5.5 5" />
        <path d="M7.5 11.5c-3.038 0-5.5 2.239-5.5 5" />
      </g>
    </svg>
  );
}

export function CardConnect({
  title,
  text,
  link,
  iconCoffee = false,
  iconPray = false,
  iconGroup = false,
}: {
  title: string;
  text: string;
  link: string;
  iconCoffee?: boolean;
  iconPray?: boolean;
  iconGroup?: boolean;
}) {

  return (
    <article className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 text-center hover:border-yellow-500 transition-colors duration-300 border border-zinc-300 dark:border-zinc-700 group flex flex-col gap-2 justify-center items-center card">
      {iconCoffee && (
        <span className="group-hover:text-yellow-500 transition-colors duration-300">
          <IconCoffee className="size-16" />
        </span>
      )}

      {iconPray && (
        <span className="group-hover:text-yellow-500 transition-colors duration-300">
          <IconPray className="size-16" />
        </span>
      )}

      {iconGroup && (
        <span className="group-hover:text-yellow-500 transition-colors duration-300">
          <IconGroup className="size-16" />
        </span>
      )}
      <h3 className="text-2xl font-swash">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{text}</p>

      <a
        href={link}
        target="_blank"
        className="mt-1 bg-primary rounded-full px-3 py-1.5 text-white dark:text-primary dark:bg-white font-semibold hover:bg-yellow-500 transition-colors duration-300 active:bg-yellow-500 text-sm"
      >
        Formulario
      </a>
    </article>
  );
}
