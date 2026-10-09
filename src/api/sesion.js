// Guarda la sesión (token + usuario) en el navegador para que no se pierda
// al recargar la página.

const CLAVE = 'zarape:sesion'

export function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE))
  } catch {
    return null
  }
}

export function guardarSesion(sesion) {
  localStorage.setItem(CLAVE, JSON.stringify(sesion))
}

export function borrarSesion() {
  localStorage.removeItem(CLAVE)
}
