import { createContext, useContext } from 'react'

// Un "contexto" comparte datos con todos los componentes sin pasarlos por props.
// Este guarda quién inició sesión. Su valor lo define AuthProvider.jsx
export const AuthContext = createContext(null)

// Hook para leerlo:  const { usuario, entrar, salir } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}
