import { useCallback, useEffect, useState } from 'react'
import { EVENTO_SESION_EXPIRADA } from '../api/cliente'
import { iniciarSesion } from '../api/servicios'
import { borrarSesion, guardarSesion, leerSesion } from '../api/sesion'
import { borrarDatosGuardados } from '../pwa/registrarServiceWorker'
import { AuthContext } from './authContext'

export default function AuthProvider({ children }) {
  // Al abrir la app se recupera la sesión guardada (si hay)
  const [sesion, setSesion] = useState(leerSesion)

  async function entrar(nombre, password) {
    const nuevaSesion = await iniciarSesion(nombre, password)
    guardarSesion(nuevaSesion)
    setSesion(nuevaSesion)
  }

  const salir = useCallback(() => {
    borrarSesion()
    borrarDatosGuardados()
    setSesion(null)
  }, [])

  // Si la API avisa que el token ya no sirve, se cierra la sesión
  useEffect(() => {
    window.addEventListener(EVENTO_SESION_EXPIRADA, salir)
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, salir)
  }, [salir])

  const valor = { usuario: sesion?.usuario ?? null, entrar, salir }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
