import iconoAdvertencia from '../assets/icono-advertencia.png'
import Modal from './Modal'

// Pregunta antes de eliminar un registro
export default function DialogoConfirmar({ pregunta, ocupado, onConfirmar, onCancelar }) {
  return (
    <Modal ancho="chico">
      <div className="dialogo">
        <img className="dialogo-icono" src={iconoAdvertencia} alt="" />
        <h2 className="dialogo-titulo">{pregunta}</h2>
        <p className="dialogo-texto">¡No podrías revertir esto!</p>
        <div className="botones">
          <button className="boton boton-morado" onClick={onConfirmar} disabled={ocupado}>
            {ocupado ? 'Eliminando...' : 'Sí, eliminar!'}
          </button>
          <button className="boton boton-gris" onClick={onCancelar} disabled={ocupado}>
            Cancelar!
          </button>
        </div>
      </div>
    </Modal>
  )
}
