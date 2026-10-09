import { Route, Routes } from 'react-router-dom'
import RutaProtegida from './components/RutaProtegida'
import LayoutAdmin from './layouts/LayoutAdmin'
import LayoutPublico from './layouts/LayoutPublico'
import CombosPage from './pages/admin/CombosPage'
import EmpleadosPage from './pages/admin/EmpleadosPage'
import InicioAdminPage from './pages/admin/InicioAdminPage'
import ProductosPage from './pages/admin/ProductosPage'
import SucursalesPage from './pages/admin/SucursalesPage'
import UsuariosPage from './pages/admin/UsuariosPage'
import CarritoPage from './pages/CarritoPage'
import InicioPage from './pages/InicioPage'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import NoEncontradaPage from './pages/NoEncontradaPage'

// Mapa de la aplicación: qué página se muestra en cada dirección.
//
// Las rutas anidadas comparten la estructura (layout) de su ruta padre.
// "key" hace que React cree un componente nuevo al cambiar de sección, en
// lugar de reutilizar el anterior con los datos de la otra sección.
export default function App() {
  return (
    <Routes>
      {/* Sitio público */}
      <Route element={<LayoutPublico />}>
        <Route index element={<InicioPage />} />
        <Route path="menu/alimentos" element={<MenuPage key="alimentos" seccion="alimentos" />} />
        <Route path="menu/bebidas" element={<MenuPage key="bebidas" seccion="bebidas" />} />
        <Route path="menu/combos" element={<MenuPage key="combos" seccion="combos" />} />
        <Route path="carrito" element={<CarritoPage />} />
        <Route path="*" element={<NoEncontradaPage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />

      {/* Panel de administración: solo con sesión iniciada */}
      <Route element={<RutaProtegida />}>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<InicioAdminPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="empleados" element={<EmpleadosPage />} />
          <Route path="sucursales" element={<SucursalesPage />} />
          <Route path="alimentos" element={<ProductosPage key="alimento" tipo="alimento" />} />
          <Route path="bebidas" element={<ProductosPage key="bebida" tipo="bebida" />} />
          <Route path="combos" element={<CombosPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
