// Cliente HTTP: la única parte de la app que usa fetch().
// Agrega la dirección de la API, el token de sesión y convierte los errores.

import { leerSesion } from './sesion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Evento que se lanza cuando la API responde que la sesión ya no es válida
export const EVENTO_SESION_EXPIRADA = 'zarape:sesion-expirada'

export class ErrorApi extends Error {
  constructor(mensaje, estado = 0, errores = {}) {
    super(mensaje)
    this.estado = estado // código HTTP (0 = no hubo respuesta)
    this.errores = errores // errores por campo: { nombre: ['Es obligatorio'] }
  }
}

// La API guarda las fotos como "/uploads/abc.jpg"; aquí se arma la URL completa
export function urlImagen(foto) {
  return foto ? API_URL + foto : ''
}

/**
 * Hace una petición a la API y devuelve el JSON de la respuesta.
 *
 *   peticion('/api/combos')
 *   peticion('/api/combos', { metodo: 'POST', datos: { nombre: 'San Lunes' } })
 */
export async function peticion(ruta, { metodo = 'GET', datos, formulario } = {}) {
  const opciones = { method: metodo, headers: {} }

  const token = leerSesion()?.token
  if (token) {
    opciones.headers.Authorization = `Bearer ${token}`
  }

  if (datos) {
    opciones.headers['Content-Type'] = 'application/json'
    opciones.body = JSON.stringify(datos)
  } else if (formulario) {
    // FormData (archivos): el navegador pone el Content-Type por su cuenta
    opciones.body = formulario
  }

  let respuesta
  try {
    respuesta = await fetch(API_URL + ruta, opciones)
  } catch {
    throw new ErrorApi('No hay conexión con el servidor. Inténtalo de nuevo más tarde.')
  }

  // 204 = todo bien, pero sin contenido (por ejemplo, al eliminar)
  if (respuesta.status === 204) return null

  const cuerpo = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    if (respuesta.status === 401 && token) {
      window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA))
    }
    throw new ErrorApi(
      cuerpo?.mensaje || 'Ocurrió un error inesperado.',
      respuesta.status,
      cuerpo?.errores,
    )
  }

  return cuerpo
}
