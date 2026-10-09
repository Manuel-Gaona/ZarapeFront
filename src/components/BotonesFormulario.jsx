// Botones del final de cada formulario: guardar (envía el <form>) y cancelar
export default function BotonesFormulario({ esEdicion, guardando, onCancelar }) {
  const textoGuardar = esEdicion ? 'Guardar' : 'Agregar'

  return (
    <div className="botones">
      <button type="submit" className="boton boton-morado" disabled={guardando}>
        {guardando ? 'Guardando...' : textoGuardar}
      </button>
      <button type="button" className="boton boton-gris" onClick={onCancelar} disabled={guardando}>
        Cancelar
      </button>
    </div>
  )
}
