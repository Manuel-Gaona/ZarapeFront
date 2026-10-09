import { useEffect, useState } from 'react'

// Permite mostrar un botón propio de "Instalar aplicación" (PWA).
//
// Cuando la app cumple los requisitos para instalarse, el navegador lanza el
// evento "beforeinstallprompt". Lo guardamos para usarlo al pulsar el botón.
//   const { sePuedeInstalar, instalar } = useInstalarApp()
export function useInstalarApp() {
  const [eventoInstalar, setEventoInstalar] = useState(null)

  useEffect(() => {
    function guardarEvento(evento) {
      evento.preventDefault() // evita el aviso automático del navegador
      setEventoInstalar(evento)
    }
    const olvidarEvento = () => setEventoInstalar(null)

    window.addEventListener('beforeinstallprompt', guardarEvento)
    window.addEventListener('appinstalled', olvidarEvento)
    return () => {
      window.removeEventListener('beforeinstallprompt', guardarEvento)
      window.removeEventListener('appinstalled', olvidarEvento)
    }
  }, [])

  async function instalar() {
    await eventoInstalar.prompt()
    setEventoInstalar(null)
  }

  return { sePuedeInstalar: eventoInstalar !== null, instalar }
}
