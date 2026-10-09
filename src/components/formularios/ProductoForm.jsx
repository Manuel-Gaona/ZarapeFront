import { useEffect, useState } from 'react'
import { obtenerCategorias } from '../../api/servicios'
import { useFormulario } from '../../hooks/useFormulario'
import BotonesFormulario from '../BotonesFormulario'
import Campo from '../Campo'
import CampoImagen from '../CampoImagen'

// Sirve para alimentos y para bebidas. tipo: 'alimento' o 'bebida'
export default function ProductoForm({
  tipo,
  nombreTipo,
  registro,
  errores,
  guardando,
  onGuardar,
  onCancelar,
}) {
  const [valores, cambiar, setValores] = useFormulario({
    nombre: registro?.nombre ?? '',
    descripcion: registro?.descripcion ?? '',
    foto: registro?.foto ?? null,
    precio: registro?.precio ?? '',
    categoria_id: registro?.categoria?.id ?? '',
  })

  const [categorias, setCategorias] = useState([])
  useEffect(() => {
    obtenerCategorias(tipo)
      .then(setCategorias)
      .catch(() => setCategorias([]))
  }, [tipo])

  function enviar(evento) {
    evento.preventDefault()
    onGuardar({
      ...valores,
      tipo,
      // Los inputs siempre entregan texto: se convierten a número
      precio: Number(valores.precio),
      categoria_id: Number(valores.categoria_id),
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
        etiqueta={`Foto ${nombreTipo}:`}
        valor={valores.foto}
        error={errores.foto}
        onCambio={(foto) => setValores((actuales) => ({ ...actuales, foto }))}
      />

      <Campo etiqueta="Precio:" error={errores.precio}>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          min="0"
          step="0.01"
          value={valores.precio}
          onChange={cambiar}
          required
        />
      </Campo>

      <Campo etiqueta="Categoria:" error={errores.categoria_id}>
        <select name="categoria_id" value={valores.categoria_id} onChange={cambiar} required>
          <option value="">Selecciona...</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
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
