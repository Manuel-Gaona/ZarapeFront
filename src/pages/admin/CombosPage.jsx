import { useState } from 'react'
import { urlImagen } from '../../api/cliente'
import { combosApi } from '../../api/servicios'
import ComboForm from '../../components/formularios/ComboForm'
import Modal from '../../components/Modal'
import PaginaCatalogo from '../../components/PaginaCatalogo'
import { precio } from '../../utils/formato'

export default function CombosPage() {
  // Combo cuyo detalle se está viendo (null = ventana cerrada)
  const [comboVisto, setComboVisto] = useState(null)

  return (
    <>
      <PaginaCatalogo
        servicio={combosApi}
        nombre="Combo"
        anchoModal="grande"
        encabezados={['Nombre', 'Precio', 'Descripción', 'Detalle Combo', 'Foto']}
        renderFila={(combo) => (
          <>
            <td>{combo.nombre}</td>
            <td>{precio(combo.precio)}</td>
            <td>{combo.descripcion}</td>
            <td>
              <button className="boton-enlace" onClick={() => setComboVisto(combo)}>
                Ver Detalle
              </button>
            </td>
            <td>
              {combo.foto && (
                <img className="tabla-foto" src={urlImagen(combo.foto)} alt="" loading="lazy" />
              )}
            </td>
          </>
        )}
        renderFormulario={(props) => <ComboForm {...props} />}
      />

      {comboVisto && (
        <Modal titulo={comboVisto.nombre}>
          <table className="tabla tabla-compacta">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Nombre</th>
                <th>Precio U.</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {comboVisto.detalles.map((detalle) => (
                <tr key={detalle.id}>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.producto.nombre}</td>
                  <td>{precio(detalle.producto.precio)}</td>
                  <td>{precio(detalle.producto.precio * detalle.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="formulario-total">Precio Combo: {precio(comboVisto.precio)}</p>
          <div className="botones">
            <button className="boton boton-gris" onClick={() => setComboVisto(null)}>
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
