import { usuariosApi } from '../../api/servicios'
import UsuarioForm from '../../components/formularios/UsuarioForm'
import PaginaCatalogo from '../../components/PaginaCatalogo'

export default function UsuariosPage() {
  return (
    <PaginaCatalogo
      servicio={usuariosApi}
      nombre="Usuario"
      encabezados={['Nombre de Usuario', 'Contraseña']}
      renderFila={(usuario) => (
        <>
          <td>{usuario.nombre}</td>
          {/* La API nunca devuelve la contraseña; solo se muestran asteriscos */}
          <td className="tabla-password">*************</td>
        </>
      )}
      renderFormulario={(props) => <UsuarioForm {...props} />}
    />
  )
}
