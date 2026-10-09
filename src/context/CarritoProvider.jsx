import { useEffect, useState } from 'react'
import { CarritoContext } from './carritoContext'

const CLAVE = 'zarape:carrito'

function leerCarritoGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || []
  } catch {
    return []
  }
}

export default function CarritoProvider({ children }) {
  // Cada artículo: { clave, nombre, precio, foto, cantidad }
  const [articulos, setArticulos] = useState(leerCarritoGuardado)

  // Cada vez que el carrito cambia se guarda, para no perderlo al recargar
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(articulos))
  }, [articulos])

  function agregar(articulo, cantidad) {
    setArticulos((actuales) => {
      const yaEsta = actuales.some((a) => a.clave === articulo.clave)
      if (!yaEsta) return [...actuales, { ...articulo, cantidad }]

      // Si ya estaba en el carrito, solo se suma la cantidad
      return actuales.map((a) =>
        a.clave === articulo.clave ? { ...a, cantidad: a.cantidad + cantidad } : a,
      )
    })
  }

  function cambiarCantidad(clave, cantidad) {
    setArticulos((actuales) =>
      actuales.map((a) => (a.clave === clave ? { ...a, cantidad } : a)),
    )
  }

  function quitar(clave) {
    setArticulos((actuales) => actuales.filter((a) => a.clave !== clave))
  }

  function vaciar() {
    setArticulos([])
  }

  // Valores calculados a partir del estado (no necesitan su propio useState)
  const piezas = articulos.reduce((suma, a) => suma + a.cantidad, 0)
  const total = articulos.reduce((suma, a) => suma + a.precio * a.cantidad, 0)

  const valor = { articulos, piezas, total, agregar, cambiarCantidad, quitar, vaciar }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}
