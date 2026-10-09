import { urlImagen } from '../../api/cliente'
import { sucursalesApi } from '../../api/servicios'
import SucursalForm from '../../components/formularios/SucursalForm'
import PaginaCatalogo from '../../components/PaginaCatalogo'
import { hora12 } from '../../utils/formato'

const ENCABEZADOS = [
  'Nombre',
  'Calle',
  'Número',
  'Colonia',
  'Ciudad',
  'Estado',
  'Código Postal',
  'Latitud',
  'Longitud',
  'Foto',
  'URL',
  'Hora de Apertura',
  'Hora de Cierre',
]

export default function SucursalesPage() {
  return (
    <PaginaCatalogo
      servicio={sucursalesApi}
      nombre="Sucursal"
      femenino
      tablaAncha
      encabezados={ENCABEZADOS}
      renderFila={(sucursal) => (
        <>
          <td>{sucursal.nombre}</td>
          <td>{sucursal.calle}</td>
          <td>{sucursal.numero}</td>
          <td>{sucursal.colonia}</td>
          <td>{sucursal.ciudad}</td>
          <td>{sucursal.estado}</td>
          <td>{sucursal.codigo_postal}</td>
          <td>{sucursal.latitud}</td>
          <td>{sucursal.longitud}</td>
          <td>
            {sucursal.foto && (
              <img className="tabla-foto" src={urlImagen(sucursal.foto)} alt="" loading="lazy" />
            )}
          </td>
          <td className="tabla-url">
            {sucursal.url && (
              <a href={sucursal.url} target="_blank" rel="noreferrer">
                {sucursal.url}
              </a>
            )}
          </td>
          <td>{hora12(sucursal.hora_apertura)}</td>
          <td>{hora12(sucursal.hora_cierre)}</td>
        </>
      )}
      renderFormulario={(props) => <SucursalForm {...props} />}
    />
  )
}
