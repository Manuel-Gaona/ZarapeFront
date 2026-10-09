import { useFormulario } from '../../hooks/useFormulario'
import BotonesFormulario from '../BotonesFormulario'
import Campo from '../Campo'

// Todos los formularios reciben las mismas props (ver PaginaCatalogo.jsx):
//   registro    el registro a editar, o null si es uno nuevo
//   errores     errores por campo que devolvió la API
//   guardando   true mientras se espera la respuesta
//   onGuardar   función que recibe los datos listos para enviar
//   onCancelar  función para cerrar el formulario
export default function UsuarioForm({ registro, errores, guardando, onGuardar, onCancelar }) {
  const esEdicion = registro !== null

  const [valores, cambiar] = useFormulario({
    nombre: registro?.nombre ?? '',
    password: '',
  })

  function enviar(evento) {
    evento.preventDefault()

    const datos = { nombre: valores.nombre }
    // Al editar, la contraseña solo se envía si se escribió una nueva
    if (valores.password) {
      datos.password = valores.password
    }
    onGuardar(datos)
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <Campo etiqueta="Nombre:" error={errores.nombre}>
        <input name="nombre" value={valores.nombre} onChange={cambiar} required autoFocus />
      </Campo>

      <Campo etiqueta="Contraseña:" error={errores.password}>
        <input
          type="password"
          name="password"
          value={valores.password}
          onChange={cambiar}
          placeholder={esEdicion ? 'Vacío = no cambiarla' : 'Mínimo 6 caracteres'}
          required={!esEdicion}
          minLength={6}
          autoComplete="new-password"
        />
      </Campo>

      <BotonesFormulario esEdicion={esEdicion} guardando={guardando} onCancelar={onCancelar} />
    </form>
  )
}
