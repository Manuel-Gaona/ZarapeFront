import { useEffect, useState } from 'react'

// Carga la lista de un recurso de la API y ofrece las operaciones para
// buscar, guardar y eliminar. Lo usan el menú y todos los catálogos.
//
//   const { registros, cargando, error, buscar, guardar, eliminar } =
//     useCatalogo(empleadosApi)
export function useCatalogo(servicio) {
  const [registros, setRegistros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  // Se incrementa para volver a pedir la lista después de un cambio
  const [version, setVersion] = useState(0)

  useEffect(() => {
    // Si el componente desaparece antes de que llegue la respuesta, se ignora
    let vigente = true

    servicio
      .listar(busqueda)
      .then((datos) => {
        if (!vigente) return
        setRegistros(datos)
        setError('')
      })
      .catch((problema) => {
        if (vigente) setError(problema.message)
      })
      .finally(() => {
        if (vigente) setCargando(false)
      })

    return () => {
      vigente = false
    }
  }, [servicio, busqueda, version])

  function recargar() {
    setCargando(true)
    setVersion((actual) => actual + 1)
  }

  function buscar(texto) {
    setBusqueda(texto.trim())
    recargar()
  }

  // Con id actualiza el registro; sin id crea uno nuevo
  async function guardar(datos, id) {
    if (id) {
      await servicio.actualizar(id, datos)
    } else {
      await servicio.crear(datos)
    }
    recargar()
  }

  async function eliminar(id) {
    await servicio.eliminar(id)
    recargar()
  }

  return { registros, cargando, error, buscar, guardar, eliminar }
}
