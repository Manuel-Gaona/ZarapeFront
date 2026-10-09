// Registra el service worker (public/sw.js) y se comunica con él.

export function registrarServiceWorker() {
  // No todos los navegadores lo soportan
  if (!('serviceWorker' in navigator)) return

  // En desarrollo (npm run dev) no se registra: la caché estorbaría al
  // recargar los cambios. Para probarlo: npm run build && npm run preview
  if (!import.meta.env.PROD) return

  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js')

      // Cuando ya está activo, le pasamos los archivos que la página descargó
      // antes de que él existiera, para que también queden guardados.
      const registro = await navigator.serviceWorker.ready
      const archivos = performance
        .getEntriesByType('resource')
        .map((recurso) => recurso.name)
        .filter((url) => url.startsWith(window.location.origin))

      registro.active.postMessage({ tipo: 'GUARDAR_ARCHIVOS', urls: archivos })
    } catch (error) {
      console.error('No se pudo registrar el service worker:', error)
    }
  })
}

// Borra las respuestas de la API guardadas sin conexión (al cerrar sesión)
export function borrarDatosGuardados() {
  navigator.serviceWorker?.controller?.postMessage({ tipo: 'BORRAR_DATOS' })
}
