import { useEffect, useState } from 'react'

// Indica si el navegador tiene conexión, y se actualiza solo cuando cambia.
//   const enLinea = useEnLinea()
export function useEnLinea() {
  const [enLinea, setEnLinea] = useState(navigator.onLine)

  useEffect(() => {
    const conectar = () => setEnLinea(true)
    const desconectar = () => setEnLinea(false)

    window.addEventListener('online', conectar)
    window.addEventListener('offline', desconectar)

    // Función de limpieza: se ejecuta cuando el componente desaparece
    return () => {
      window.removeEventListener('online', conectar)
      window.removeEventListener('offline', desconectar)
    }
  }, [])

  return enLinea
}
