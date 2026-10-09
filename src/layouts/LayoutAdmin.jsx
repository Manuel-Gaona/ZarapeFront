import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import iconoAdmin from '../assets/icono-admin.png'
import AvisoSinConexion from '../components/AvisoSinConexion'
import { useAuth } from '../context/authContext'
import '../styles/admin.css'

const CATALOGOS = [
  { ruta: '/admin/usuarios', texto: 'Usuarios' },
  { ruta: '/admin/empleados', texto: 'Empleados' },
  { ruta: '/admin/sucursales', texto: 'Sucursales' },
  { ruta: '/admin/alimentos', texto: 'Alimentos' },
  { ruta: '/admin/bebidas', texto: 'Bebidas' },
  { ruta: '/admin/combos', texto: 'Combos' },
]

// Estructura del panel de administración: barra roja con el botón de menú
// y un menú lateral que se abre y se cierra.
export default function LayoutAdmin() {
  const { usuario, salir } = useAuth()
  const { pathname } = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  // El título de la barra es el nombre del catálogo que se está viendo
  const catalogoActual = CATALOGOS.find((catalogo) => catalogo.ruta === pathname)
  const titulo = catalogoActual ? catalogoActual.texto : 'Gestión “El Zarape”'

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <div className={menuAbierto ? 'admin admin-menu-abierto' : 'admin'}>
      <aside className="admin-menu" aria-hidden={!menuAbierto}>
        <img className="admin-menu-icono" src={iconoAdmin} alt="" />
        <h2 className="admin-menu-titulo">Administrador</h2>
        <p className="admin-menu-usuario">{usuario.nombre}</p>

        <h3 className="admin-menu-seccion">Catálogos:</h3>
        <ul className="admin-menu-lista">
          {CATALOGOS.map((catalogo) => (
            <li key={catalogo.ruta}>
              <NavLink to={catalogo.ruta} onClick={cerrarMenu}>
                {catalogo.texto}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="admin-menu-pie">
          <Link to="/" onClick={cerrarMenu}>
            Ver sitio
          </Link>
          <button onClick={salir}>Cerrar sesión</button>
        </div>
      </aside>

      <div className="admin-principal">
        <header className="barra-roja">
          <button
            className="boton-hamburguesa"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
          >
            <span />
            <span />
            <span />
          </button>
          <h1>{titulo}</h1>
        </header>

        <AvisoSinConexion />

        <main className="admin-contenido">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
