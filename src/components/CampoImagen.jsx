import { useState } from 'react'
import { urlImagen } from '../api/cliente'
import { subirImagen } from '../api/servicios'

// Selector de imagen. En cuanto se elige un archivo se sube a la API, y al
// formulario solo se le entrega la ruta que devuelve ("/uploads/abc.jpg").
//
//   <CampoImagen etiqueta="Foto:" valor={foto} onCambio={setFoto} />
export default function CampoImagen({ etiqueta, valor, error, onCambio }) {
  const [subiendo, setSubiendo] = useState(false)
  const [errorSubida, setErrorSubida] = useState('')

  async function elegirArchivo(evento) {
    const archivo = evento.target.files[0]
    if (!archivo) return

    setSubiendo(true)
    setErrorSubida('')
    try {
      onCambio(await subirImagen(archivo))
    } catch (problema) {
      setErrorSubida(problema.message)
    } finally {
      setSubiendo(false)
    }
  }

  const mensajeError = errorSubida || (Array.isArray(error) ? error[0] : '')

  return (
    <div className="campo">
      <span className="campo-etiqueta">{etiqueta}</span>
      {valor && <img className="campo-vista-previa" src={urlImagen(valor)} alt="Vista previa" />}
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={elegirArchivo}
        disabled={subiendo}
        aria-label={etiqueta}
      />
      {subiendo && <small>Subiendo imagen...</small>}
      {mensajeError && <small className="campo-error">{mensajeError}</small>}
    </div>
  )
}
