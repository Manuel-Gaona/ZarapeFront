import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import iconoUsuario from '../assets/icono-usuario.png'
import AvisoSinConexion from '../components/AvisoSinConexion'
import PieDePagina from '../components/PieDePagina'
import { useAuth } from '../context/authContext'
import { useFormulario } from '../hooks/useFormulario'
import '../styles/publico.css'

export default function LoginPage() {
  const { usuario, entrar } = useAuth()
  const navegar = useNavigate()

  const [valores, cambiar] = useFormulario({ nombre: '', password: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  // Si ya hay sesión no tiene caso mostrar el login
  if (usuario) {
    return <Navigate to="/admin" replace />
  }

  async function enviar(evento) {
    evento.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await entrar(valores.nombre, valores.password)
      navegar('/admin', { replace: true })
    } catch (problema) {
      setError(problema.message)
      setEnviando(false)
    }
  }

  return (
    <div className="sitio">
      <header className="barra-roja">
        <h1>Login</h1>
      </header>

      <AvisoSinConexion />

      <main className="sitio-contenido login">
        <form className="login-tarjeta" onSubmit={enviar}>
          <h2>Iniciar Sesion</h2>
          <img src={iconoUsuario} alt="" />

          <label>
            <span>Usuario:</span>
            <input
              name="nombre"
              value={valores.nombre}
              onChange={cambiar}
              autoComplete="username"
              required
              autoFocus
            />
          </label>

          <label>
            <span>Contraseña:</span>
            <input
              type="password"
              name="password"
              value={valores.password}
              onChange={cambiar}
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button className="boton boton-rojo" disabled={enviando}>
            {enviando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </main>

      <PieDePagina enlace={{ ruta: '/', texto: 'Menú Principal' }} />
    </div>
  )
}
