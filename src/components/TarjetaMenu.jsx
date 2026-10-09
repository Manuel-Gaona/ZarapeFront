import { useState } from 'react'
import { urlImagen } from '../api/cliente'
import { useCarrito } from '../context/carritoContext'

// Tarjeta de un alimento, bebida o combo en el menú público.
// "clave" identifica al artículo dentro del carrito ("producto-3", "combo-1").
export default function TarjetaMenu({ articulo, clave }) {
  const { agregar } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [anadido, setAnadido] = useState(false)

  const total = articulo.precio * cantidad

  function anadir() {
    agregar(
      { clave, nombre: articulo.nombre, precio: articulo.precio, foto: articulo.foto },
      cantidad,
    )
    setCantidad(1)

    // El botón cambia de texto un momento para confirmar la acción
    setAnadido(true)
    setTimeout(() => setAnadido(false), 1500)
  }

  function cambiarCantidad(evento) {
    // Mínimo 1, aunque se borre el número o se escriba uno negativo
    setCantidad(Math.max(1, Number(evento.target.value) || 1))
  }

  return (
    <article className="tarjeta">
      {articulo.foto && (
        <img className="tarjeta-foto" src={urlImagen(articulo.foto)} alt="" loading="lazy" />
      )}

      <h3 className="tarjeta-nombre">{articulo.nombre}</h3>

      {/* Solo los combos tienen "detalles": la lista de lo que incluyen */}
      {articulo.detalles && (
        <ul className="tarjeta-detalles">
          {articulo.detalles.map((detalle) => (
            <li key={detalle.id}>
              {detalle.cantidad} {detalle.producto.nombre}.
            </li>
          ))}
        </ul>
      )}

      <dl className="tarjeta-datos">
        <dt>Precio</dt>
        <dd>{articulo.precio}</dd>

        <dt>
          <label htmlFor={`cantidad-${clave}`}>Cantidad:</label>
        </dt>
        <dd>
          <input
            id={`cantidad-${clave}`}
            type="number"
            min="1"
            value={cantidad}
            onChange={cambiarCantidad}
          />
        </dd>

        <dt>Total:</dt>
        <dd>{total}</dd>
      </dl>

      <button className="boton boton-rojo" onClick={anadir}>
        {anadido ? '¡Añadido!' : 'Añadir'}
      </button>
    </article>
  )
}
