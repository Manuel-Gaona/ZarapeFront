import iconoAdvertencia from '../assets/icono-advertencia.png'
import iconoCorrecto from '../assets/icono-correcto.png'
import Modal from './Modal'

// Avisa el resultado de una operación. tipo: 'correcto' o 'error'
export default function DialogoMensaje({ tipo, texto, onCerrar }) {
  const esError = tipo === 'error'

  return (
    <Modal ancho="chico">
      <div className="dialogo">
        <img
          className="dialogo-icono"
          src={esError ? iconoAdvertencia : iconoCorrecto}
          alt=""
        />
        <h2 className="dialogo-titulo">{esError ? '¡Ups!' : '¡Correcto!'}</h2>
        <p className="dialogo-texto">{texto}</p>
        <div className="botones">
          <button className="boton boton-morado" onClick={onCerrar} autoFocus>
            OK
          </button>
        </div>
      </div>
    </Modal>
  )
}
