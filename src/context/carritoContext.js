import { createContext, useContext } from 'react'

// Contexto del carrito de compras. Su valor lo define CarritoProvider.jsx
export const CarritoContext = createContext(null)

// Hook para leerlo:  const { articulos, agregar, total } = useCarrito()
export function useCarrito() {
  return useContext(CarritoContext)
}
