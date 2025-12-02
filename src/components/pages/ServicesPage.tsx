import { useEffect } from "react";

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbydT8Ap4joqkUnwBm4Tsw8iyjO6BkhuVSuuYk0uR6pzOYaQqaTSzfOrk8xupjVGIH9DOQ/exec";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const res = await fetch(WEB_APP_URL, {
    method: "POST",
    body: formData,   // ← no JSON, no headers!
  });

  const json = await res.json();
  console.log(json);

  if (json.status === "success") {
    alert("Formulario enviado con éxito!");
    e.currentTarget.reset();
  } else {
    alert("Hubo un error al enviar el formulario");
  }
}

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh dark:text-secondary">
      <h1 className="text-6xl font-bold text-center">Unirme al equipo</h1>

      <form id="voluntariosForm" onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
        <input name="nombre" placeholder="Nombre" required />
        <input name="apellido" placeholder="Apellido" required />
        <input name="telefono" placeholder="Teléfono" required />
        <input name="correo" type="email" placeholder="Correo" required />
        <input name="area" placeholder="Área" required />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
