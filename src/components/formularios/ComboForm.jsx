import { useEffect, useState } from 'react'
import { alimentosApi, bebidasApi } from '../../api/servicios'
import { useFormulario } from '../../hooks/useFormulario'
import { precio } from '../../utils/formato'
import BotonesFormulario from '../BotonesFormulario'
import Campo from '../Campo'
import CampoImagen from '../CampoImagen'

// Lista desplegable + cantidad + botón para sumar un producto al combo
function SelectorProducto({ etiqueta, productos, onAgregar }) {
  const [productoId, setProductoId] = useState('')
  const [cantidad, setCantidad] = useState(1)

  function agregar() {
    const producto = productos.find((p) => p.id === Number(productoId))
    if (!producto || cantidad < 1) return

    onAgregar(producto, Number(cantidad))
    setProductoId('')
    setCantidad(1)
  }

  return (
    <div className="selector-producto">
      <span className="campo-etiqueta">{etiqueta}</span>
      <select
        aria-label={etiqueta}
        value={productoId}
        onChange={(evento) => setProductoId(evento.target.value)}
      >
        <option value="">Selecciona...</option>
        {productos.map((producto) => (
          <option key={producto.id} value={producto.id}>
            {producto.nombre}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        placeholder="Cantidad"
        aria-label={`Cantidad de ${etiqueta}`}
        value={cantidad}
        onChange={(evento) => setCantidad(evento.target.value)}
      />
      <button type="button" className="boton-chico" onClick={agregar}>
        Agregar
      </button>
    </div>
  )
}

export default function ComboForm({ registro, errores, guardando, onGuardar, onCancelar }) {
  const [valores, cambiar, setValores] = useFormulario({
    nombre: registro?.nombre ?? '',
    descripcion: registro?.descripcion ?? '',
    foto: registro?.foto ?? null,
    precio: registro?.precio ?? '',
  })

  // Productos que forman el combo: [{ producto, cantidad }]
  const [detalles, setDetalles] = useState(registro?.detalles ?? [])

  // Opciones de las dos listas desplegables
  const [alimentos, setAlimentos] = useState([])
  const [bebidas, setBebidas] = useState([])
  useEffect(() => {
    alimentosApi.listar().then(setAlimentos).catch(() => setAlimentos([]))
    bebidasApi.listar().then(setBebidas).catch(() => setBebidas([]))
  }, [])

  function agregarDetalle(producto, cantidad) {
    setDetalles((actuales) => {
      const yaEsta = actuales.some((d) => d.producto.id === producto.id)
      if (!yaEsta) return [...actuales, { producto, cantidad }]

      // Si el producto ya estaba en el combo, solo se suma la cantidad
      return actuales.map((d) =>
        d.producto.id === producto.id ? { ...d, cantidad: d.cantidad + cantidad } : d,
      )
    })
  }

  function quitarDetalle(productoId) {
    setDetalles((actuales) => actuales.filter((d) => d.producto.id !== productoId))
  }

  // Lo que costarían los productos por separado (sirve de referencia)
  const total = detalles.reduce((suma, d) => suma + d.producto.precio * d.cantidad, 0)

  function enviar(evento) {
    evento.preventDefault()
    onGuardar({
      ...valores,
      precio: Number(valores.precio),
      // A la API solo le interesan el id del producto y la cantidad
      detalles: detalles.map((d) => ({ producto_id: d.producto.id, cantidad: d.cantidad })),
    })
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <Campo etiqueta="Nombre:" error={errores.nombre}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={valores.nombre}
          onChange={cambiar}
          required
          autoFocus
        />
      </Campo>

      <Campo etiqueta="Descripción:" error={errores.descripcion}>
        <textarea
          name="descripcion"
          placeholder="Descripción..."
          rows={3}
          value={valores.descripcion}
          onChange={cambiar}
        />
      </Campo>

      <CampoImagen
        etiqueta="Foto Combo:"
        valor={valores.foto}
        error={errores.foto}
        onCambio={(foto) => setValores((actuales) => ({ ...actuales, foto }))}
      />

      <SelectorProducto etiqueta="Alimento:" productos={alimentos} onAgregar={agregarDetalle} />
      <SelectorProducto etiqueta="Bebida:" productos={bebidas} onAgregar={agregarDetalle} />

      <div className="campo">
        <span className="campo-etiqueta">Detalle:</span>
        <table className="tabla tabla-compacta">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio U.</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle) => (
              <tr key={detalle.producto.id}>
                <td>{detalle.cantidad}</td>
                <td>{detalle.producto.nombre}</td>
                <td>{precio(detalle.producto.precio)}</td>
                <td>{precio(detalle.producto.precio * detalle.cantidad)}</td>
                <td>
                  <button
                    type="button"
                    className="boton-chico"
                    onClick={() => quitarDetalle(detalle.producto.id)}
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {Array.isArray(errores.detalles) && (
          <small className="campo-error">{errores.detalles[0]}</small>
        )}
      </div>

      <p className="formulario-total">Total: {precio(total)}</p>

      <Campo etiqueta="Precio Combo:" error={errores.precio}>
        <input
          type="number"
          name="precio"
          placeholder="Precio Combo"
          min="0"
          step="0.01"
          value={valores.precio}
          onChange={cambiar}
          required
        />
      </Campo>

      <BotonesFormulario
        esEdicion={registro !== null}
        guardando={guardando}
        onCancelar={onCancelar}
      />
    </form>
  )
}
