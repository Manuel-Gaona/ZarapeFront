import { useFormulario } from '../../hooks/useFormulario'
import BotonesFormulario from '../BotonesFormulario'
import Campo from '../Campo'
import CampoImagen from '../CampoImagen'

// Campos de texto simples: se dibujan con un .map() para no repetir el mismo
// bloque de código una vez por cada uno.
const CAMPOS_DE_TEXTO = [
  { nombre: 'nombre', etiqueta: 'Nombre', obligatorio: true },
  { nombre: 'calle', etiqueta: 'Calle', obligatorio: true },
  { nombre: 'numero', etiqueta: 'Número', obligatorio: true },
  { nombre: 'colonia', etiqueta: 'Colonia', obligatorio: true },
  { nombre: 'ciudad', etiqueta: 'Ciudad', obligatorio: true },
  { nombre: 'estado', etiqueta: 'Estado', obligatorio: true },
  { nombre: 'codigo_postal', etiqueta: 'Código Postal', obligatorio: false },
  { nombre: 'latitud', etiqueta: 'Latitud', obligatorio: false },
  { nombre: 'longitud', etiqueta: 'Longitud', obligatorio: false },
]

export default function SucursalForm({ registro, errores, guardando, onGuardar, onCancelar }) {
  const [valores, cambiar, setValores] = useFormulario({
    nombre: registro?.nombre ?? '',
    calle: registro?.calle ?? '',
    numero: registro?.numero ?? '',
    colonia: registro?.colonia ?? '',
    ciudad: registro?.ciudad ?? '',
    estado: registro?.estado ?? '',
    codigo_postal: registro?.codigo_postal ?? '',
    latitud: registro?.latitud ?? '',
    longitud: registro?.longitud ?? '',
    foto: registro?.foto ?? null,
    url: registro?.url ?? '',
    hora_apertura: registro?.hora_apertura ?? '',
    hora_cierre: registro?.hora_cierre ?? '',
  })

  function enviar(evento) {
    evento.preventDefault()
    onGuardar(valores)
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      {CAMPOS_DE_TEXTO.map((campo) => (
        <Campo key={campo.nombre} etiqueta={`${campo.etiqueta}:`} error={errores[campo.nombre]}>
          <input
            name={campo.nombre}
            placeholder={campo.etiqueta}
            value={valores[campo.nombre]}
            onChange={cambiar}
            required={campo.obligatorio}
          />
        </Campo>
      ))}

      <CampoImagen
        etiqueta="Foto Sucursal:"
        valor={valores.foto}
        error={errores.foto}
        onCambio={(foto) => setValores((actuales) => ({ ...actuales, foto }))}
      />

      <Campo etiqueta="URL Página Web:" error={errores.url}>
        <input
          type="url"
          name="url"
          placeholder="https://..."
          value={valores.url}
          onChange={cambiar}
        />
      </Campo>

      <Campo etiqueta="Horario De Apertura:" error={errores.hora_apertura}>
        <input
          type="time"
          name="hora_apertura"
          value={valores.hora_apertura}
          onChange={cambiar}
          required
        />
      </Campo>

      <Campo etiqueta="Horario De Cierre:" error={errores.hora_cierre}>
        <input
          type="time"
          name="hora_cierre"
          value={valores.hora_cierre}
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
