import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

//Esto es para inicializar el tema deseado en la web
(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme == 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  } catch (error) {
    
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
