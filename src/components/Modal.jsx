// Ventana emergente sobre un fondo oscuro.
// "children" es lo que se escriba entre <Modal> y </Modal>.
export default function Modal({ titulo, ancho = 'mediano', children }) {
  return (
    <div className="modal-fondo">
      <div className={`modal modal-${ancho}`} role="dialog" aria-modal="true">
        {titulo && <h2 className="modal-titulo">{titulo}</h2>}
        {children}
      </div>
    </div>
  )
}
