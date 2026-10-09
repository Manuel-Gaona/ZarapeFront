import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'

// Envuelve las rutas del panel: si nadie inició sesión, manda al login.
// <Outlet /> es el lugar donde se dibuja la ruta hija.
export default function RutaProtegida() {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
