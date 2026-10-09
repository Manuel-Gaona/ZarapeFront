// Un campo de formulario: etiqueta + control (children) + mensaje de error.
//
//   <Campo etiqueta="Nombre:" error={errores.nombre}>
//     <input name="nombre" value={valores.nombre} onChange={cambiar} />
//   </Campo>
//
// "error" es la lista de mensajes que manda la API para ese campo.
export default function Campo({ etiqueta, error, children }) {
  const mensaje = Array.isArray(error) ? error[0] : ''

  return (
    <label className="campo">
      <span className="campo-etiqueta">{etiqueta}</span>
      {children}
      {mensaje && <small className="campo-error">{mensaje}</small>}
    </label>
  )
}
