import { empleadosApi } from '../../api/servicios'
import EmpleadoForm from '../../components/formularios/EmpleadoForm'
import PaginaCatalogo from '../../components/PaginaCatalogo'

export default function EmpleadosPage() {
  return (
    <PaginaCatalogo
      servicio={empleadosApi}
      nombre="Empleado"
      encabezados={['Nombres', 'Apellido Materno', 'Apellido Paterno', 'Puesto']}
      renderFila={(empleado) => (
        <>
          <td>{empleado.nombre}</td>
          <td>{empleado.apellido_materno}</td>
          <td>{empleado.apellido_paterno}</td>
          <td>{empleado.puesto}</td>
        </>
      )}
      renderFormulario={(props) => <EmpleadoForm {...props} />}
    />
  )
}
