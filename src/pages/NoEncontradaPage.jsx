import { Link } from 'react-router-dom'

export default function NoEncontradaPage() {
  return (
    <section className="seccion">
      <h2 className="seccion-titulo">Esta página no existe</h2>
      <p className="carrito-vacio">
        <Link className="boton boton-rojo" to="/">
          Ir al inicio
        </Link>
      </p>
    </section>
  )
}
