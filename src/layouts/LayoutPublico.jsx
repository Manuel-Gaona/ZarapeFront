import { Link, NavLink, Outlet } from 'react-router-dom'
import iconoCarrito from '../assets/icono-carrito.png'
import logo from '../assets/logo.png'
import AvisoSinConexion from '../components/AvisoSinConexion'
import PieDePagina from '../components/PieDePagina'
import { useAuth } from '../context/authContext'
import { useCarrito } from '../context/carritoContext'
import '../styles/publico.css'

// Estructura que comparten las páginas públicas: barra roja, menú y pie.
// La página de cada ruta se dibuja donde está <Outlet />.
export default function LayoutPublico() {
  const { usuario } = useAuth()
  const { piezas } = useCarrito()

  const enlacePie = usuario
    ? { ruta: '/admin', texto: 'Panel de administración' }
    : { ruta: '/login', texto: 'Iniciar Sesion' }

  return (
    <div className="sitio">
      <header className="barra-roja">
        <h1>Restaurante “El Zarape”</h1>
      </header>

      <nav className="menu-publico">
        <Link to="/" className="menu-publico-logo">
          <img src={logo} alt="Inicio" />
        </Link>

        {/* NavLink agrega la clase "active" al enlace de la página actual */}
        <div className="menu-publico-enlaces">
          <NavLink to="/menu/alimentos">Alimentos</NavLink>
          <NavLink to="/menu/bebidas">Bebidas</NavLink>
          <NavLink to="/menu/combos">Combos</NavLink>
        </div>

        <Link to="/carrito" className="menu-publico-carrito" aria-label="Ver carrito">
          <img src={iconoCarrito} alt="" />
          {piezas > 0 && <span className="carrito-contador">{piezas}</span>}
        </Link>
      </nav>

      <AvisoSinConexion />

      <main className="sitio-contenido">
        <Outlet />
      </main>

      <PieDePagina enlace={enlacePie} />
    </div>
  )
}
