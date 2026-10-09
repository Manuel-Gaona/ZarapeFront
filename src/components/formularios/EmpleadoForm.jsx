import { useEffect, useState } from 'react'
import { obtenerPuestos } from '../../api/servicios'
import { useFormulario } from '../../hooks/useFormulario'
import BotonesFormulario from '../BotonesFormulario'
import Campo from '../Campo'

export default function EmpleadoForm({ registro, errores, guardando, onGuardar, onCancelar }) {
  const [valores, cambiar] = useFormulario({
    nombre: registro?.nombre ?? '',
    apellido_materno: registro?.apellido_materno ?? '',
    apellido_paterno: registro?.apellido_paterno ?? '',
    puesto: registro?.puesto ?? '',
  })

  // Las opciones de la lista de puestos vienen de la API
  const [puestos, setPuestos] = useState([])
  useEffect(() => {
    obtenerPuestos()
      .then(setPuestos)
      .catch(() => setPuestos([]))
  }, [])

  function enviar(evento) {
    evento.preventDefault()
    onGuardar(valores)
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

      <Campo etiqueta="Apellido Materno:" error={errores.apellido_materno}>
        <input
          name="apellido_materno"
          placeholder="Apellido Materno"
          value={valores.apellido_materno}
          onChange={cambiar}
        />
      </Campo>

      <Campo etiqueta="Apellido Paterno:" error={errores.apellido_paterno}>
        <input
          name="apellido_paterno"
          placeholder="Apellido Paterno"
          value={valores.apellido_paterno}
          onChange={cambiar}
          required
        />
      </Campo>

      <Campo etiqueta="Puesto" error={errores.puesto}>
        <select name="puesto" value={valores.puesto} onChange={cambiar} required>
          <option value="">Selecciona...</option>
          {puestos.map((puesto) => (
            <option key={puesto}>{puesto}</option>
          ))}
        </select>
      </Campo>

      <BotonesFormulario
        esEdicion={registro !== null}
        guardando={guardando}
        onCancelar={onCancelar}
      />
    </form>
  )
}
