import { useEffect } from "react";

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: {value: string},
    }
    const date = new Date()
    const inputValue: {[key:string]:string} = {
      'Email': target.email.value,
      'Created At': date.toLocaleString(),
    }
    console.log(inputValue)
    const APP_ID = 'AKfycbyO51lxg_HeRy0eApEo_w2V6BJwFnKka9-07ajsJGR0XwySNiufbntY3UkhIEQb8UXdQA'
    const baseURL = `https://script.google.com/macros/s/${APP_ID}/exec`
    const formData = new FormData()
    Object.keys(inputValue).forEach((key) => {
      formData.append(key, inputValue[key])
    })
    try {
       const res = await fetch(baseURL, {
        method: 'POST',
        body: formData,
       })
      if(res.ok){
        console.log('Request was successful:', res);
      }else{
        console.log('Request Failed:', res);        
      }
    }catch(e){
      console.error('Error during fetch:', e);
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-dvh dark:text-secondary">
      <h1 className="text-6xl font-bold text-center">Unirme al equipo</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
        <input name="nombre" placeholder="Nombre" required />
        <input name="apellido" placeholder="Apellido" required />
        <input name="telefono" placeholder="Teléfono" required />
        <input name="email" type="email" placeholder="Correo" required />
        <input name="area" placeholder="Área" required />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
