import { useState } from 'react'

// Maneja los valores de un formulario en un solo objeto de estado.
//
//   const [valores, cambiar] = useFormulario({ nombre: '', puesto: '' })
//   <input name="nombre" value={valores.nombre} onChange={cambiar} />
//
// El atributo "name" del input debe llamarse igual que la propiedad.
export function useFormulario(valoresIniciales) {
  const [valores, setValores] = useState(valoresIniciales)

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
  }

  return [valores, cambiar, setValores]
}
