import { Link } from 'react-router-dom'
import { useInstalarApp } from '../hooks/useInstalarApp'

// Pie de las páginas públicas. "enlace" es el link que cambia según la
// página: { ruta: '/login', texto: 'Iniciar Sesion' }
export default function PieDePagina({ enlace }) {
  const { sePuedeInstalar, instalar } = useInstalarApp()

  return (
    <footer className="pie">
      <h2 className="pie-titulo">Restaurante “El Zarape”</h2>
      <p className="pie-lema">¡Somos expertos en comida mexicana!</p>

      <Link className="pie-enlace" to={enlace.ruta}>
        {enlace.texto}
      </Link>

      {sePuedeInstalar && (
        <button className="pie-instalar" onClick={instalar}>
          Instalar aplicación
        </button>
      )}

      <hr className="pie-linea" />
      <small>© Copyright 2024. Technovision</small>
    </footer>
  )
}
