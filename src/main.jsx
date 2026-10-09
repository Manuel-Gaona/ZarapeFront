import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import CarritoProvider from './context/CarritoProvider.jsx'
import { registrarServiceWorker } from './pwa/registrarServiceWorker.js'
import './index.css'
import './styles/componentes.css'

// Los "providers" envuelven la app para que cualquier componente pueda
// usar las rutas, la sesión y el carrito.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

// PWA: activa el modo sin conexión
registrarServiceWorker()
