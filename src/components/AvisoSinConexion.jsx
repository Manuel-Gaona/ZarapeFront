import { useEnLinea } from '../hooks/useEnLinea'

// Franja que aparece solo cuando el dispositivo se queda sin internet
export default function AvisoSinConexion() {
  const enLinea = useEnLinea()

  if (enLinea) return null

  return (
    <p className="aviso-sin-conexion" role="status">
      Sin conexión: estás viendo la información guardada en este dispositivo.
    </p>
  )
}
