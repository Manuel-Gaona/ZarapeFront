import { Link } from 'react-router-dom'
import { urlImagen } from '../api/cliente'
import { useCarrito } from '../context/carritoContext'
import { precio } from '../utils/formato'

export default function CarritoPage() {
  const { articulos, total, cambiarCantidad, quitar, vaciar } = useCarrito()

  if (articulos.length === 0) {
    return (
      <section className="carrito">
        <h2 className="seccion-titulo">Tu carrito está vacío</h2>
        <p className="carrito-vacio">
          <Link className="boton boton-rojo" to="/menu/alimentos">
            Ver el menú
          </Link>
        </p>
      </section>
    )
  }

  return (
    <section className="carrito">
      <h2 className="seccion-titulo">Tu orden</h2>

      <ul className="carrito-lista">
        {articulos.map((articulo) => (
          <li key={articulo.clave} className="carrito-articulo">
            {articulo.foto && <img src={urlImagen(articulo.foto)} alt="" />}

            <div className="carrito-articulo-datos">
              <strong>{articulo.nombre}</strong>
              <span>{precio(articulo.precio)} c/u</span>
            </div>

            <input
              type="number"
              min="1"
              aria-label={`Cantidad de ${articulo.nombre}`}
              value={articulo.cantidad}
              onChange={(evento) =>
                cambiarCantidad(articulo.clave, Math.max(1, Number(evento.target.value) || 1))
              }
            />

            <strong className="carrito-articulo-total">
              {precio(articulo.precio * articulo.cantidad)}
            </strong>

            <button className="boton-chico" onClick={() => quitar(articulo.clave)}>
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <p className="carrito-total">Total: {precio(total)}</p>

      <div className="botones">
        <button className="boton boton-gris" onClick={vaciar}>
          Vaciar carrito
        </button>
        <Link className="boton boton-rojo" to="/menu/alimentos">
          Seguir ordenando
        </Link>
      </div>
    </section>
  )
}
