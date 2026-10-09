// Funciones para hablar con cada recurso de la API.
// Los componentes usan estas funciones y nunca escriben URLs a mano.

import { peticion } from './cliente'

// Convierte { tipo: 'bebida', buscar: 'jugo' } en "?tipo=bebida&buscar=jugo"
function aConsulta(filtros) {
  const parametros = new URLSearchParams()
  for (const [clave, valor] of Object.entries(filtros)) {
    if (valor) parametros.set(clave, valor)
  }
  const texto = parametros.toString()
  return texto ? `?${texto}` : ''
}

// Todos los catálogos tienen las mismas 4 operaciones (CRUD), así que se
// generan con una sola función en lugar de repetir el código 6 veces.
function crearServicio(ruta, filtrosFijos = {}) {
  return {
    listar: (buscar = '') => peticion(ruta + aConsulta({ ...filtrosFijos, buscar })),
    crear: (datos) => peticion(ruta, { metodo: 'POST', datos }),
    actualizar: (id, datos) => peticion(`${ruta}/${id}`, { metodo: 'PUT', datos }),
    eliminar: (id) => peticion(`${ruta}/${id}`, { metodo: 'DELETE' }),
  }
}

export const usuariosApi = crearServicio('/api/usuarios')
export const empleadosApi = crearServicio('/api/empleados')
export const sucursalesApi = crearServicio('/api/sucursales')
export const combosApi = crearServicio('/api/combos')

// Alimentos y bebidas son el mismo recurso (productos) filtrado por tipo
export const alimentosApi = crearServicio('/api/productos', { tipo: 'alimento' })
export const bebidasApi = crearServicio('/api/productos', { tipo: 'bebida' })

export function obtenerCategorias(tipo) {
  return peticion(`/api/categorias?tipo=${tipo}`)
}

export function obtenerPuestos() {
  return peticion('/api/empleados/puestos')
}

export function iniciarSesion(nombre, password) {
  return peticion('/api/auth/login', { metodo: 'POST', datos: { nombre, password } })
}

// Sube una imagen y devuelve su ruta, por ejemplo "/uploads/abc.jpg"
export async function subirImagen(archivo) {
  const formulario = new FormData()
  formulario.append('archivo', archivo)
  const respuesta = await peticion('/api/imagenes', { metodo: 'POST', formulario })
  return respuesta.foto
}
