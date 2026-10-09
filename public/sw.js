/*
 * Service Worker de El Zarape.
 *
 * Es un script que el navegador ejecuta aparte de la página. Puede interceptar
 * las peticiones de red y responderlas desde una caché, y eso es lo que permite
 * que la aplicación funcione sin conexión.
 *
 * Estrategias que usa:
 *   - Navegación (abrir una página): red primero; sin conexión, el index.html guardado.
 *   - API (/api/...):                red primero; sin conexión, la última respuesta guardada.
 *   - Imágenes subidas (/uploads/):  caché primero (casi nunca cambian).
 *   - Archivos de la app (JS, CSS):  caché primero (su nombre cambia en cada versión).
 */

// Al cambiar la versión se descartan las cachés anteriores
const VERSION = 'v1'
const CACHE_APP = `zarape-app-${VERSION}`
const CACHE_API = `zarape-api-${VERSION}`
const CACHE_IMAGENES = `zarape-imagenes-${VERSION}`
const CACHES_ACTUALES = [CACHE_APP, CACHE_API, CACHE_IMAGENES]

// Lo mínimo para que la app abra sin conexión ("app shell")
const ARCHIVOS_BASE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

// 1. INSTALACIÓN: se guardan los archivos base
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches
      .open(CACHE_APP)
      .then((cache) => cache.addAll(ARCHIVOS_BASE))
      .then(() => self.skipWaiting()),
  )
})

// 2. ACTIVACIÓN: se borran las cachés de versiones viejas
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((nombres) =>
        Promise.all(
          nombres
            .filter((nombre) => !CACHES_ACTUALES.includes(nombre))
            .map((nombre) => caches.delete(nombre)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

// 3. PETICIONES: se decide de dónde sale cada respuesta
self.addEventListener('fetch', (evento) => {
  const peticion = evento.request

  // Guardar, editar y eliminar (POST, PUT, DELETE) siempre necesitan conexión
  if (peticion.method !== 'GET') return

  const url = new URL(peticion.url)
  const esMismoOrigen = url.origin === self.location.origin

  if (peticion.mode === 'navigate') {
    evento.respondWith(navegacion(peticion))
  } else if (esMismoOrigen && url.pathname === '/config.js') {
    // La configuración puede cambiar en el servidor: siempre se intenta la red
    evento.respondWith(redPrimero(peticion, CACHE_APP))
  } else if (url.pathname.startsWith('/api/')) {
    evento.respondWith(redPrimero(peticion, CACHE_API))
  } else if (url.pathname.startsWith('/uploads/')) {
    evento.respondWith(cachePrimero(peticion, CACHE_IMAGENES))
  } else if (esMismoOrigen) {
    evento.respondWith(cachePrimero(peticion, CACHE_APP))
  }
})

// 4. MENSAJES que envía la página (ver src/pwa/registrarServiceWorker.js)
self.addEventListener('message', (evento) => {
  const { tipo, urls } = evento.data || {}

  // La primera vez, la página ya descargó sus archivos antes de que existiera
  // el service worker; nos avisa cuáles son para guardarlos también.
  if (tipo === 'GUARDAR_ARCHIVOS') {
    evento.waitUntil(
      caches.open(CACHE_APP).then((cache) =>
        Promise.all(urls.map((url) => cache.add(url).catch(() => null))),
      ),
    )
  }

  // Al cerrar sesión se borran las respuestas guardadas de la API
  if (tipo === 'BORRAR_DATOS') {
    evento.waitUntil(caches.delete(CACHE_API))
  }
})

/* ---------- Estrategias ---------- */

function sePuedeGuardar(respuesta) {
  // "opaque" son respuestas de otro origen (las imágenes de la API)
  return respuesta.ok || respuesta.type === 'opaque'
}

async function redPrimero(peticion, nombreCache) {
  const cache = await caches.open(nombreCache)
  try {
    const respuesta = await fetch(peticion)
    if (respuesta.ok) cache.put(peticion, respuesta.clone())
    return respuesta
  } catch (error) {
    const guardada = await cache.match(peticion)
    if (guardada) return guardada
    throw error
  }
}

async function cachePrimero(peticion, nombreCache) {
  const cache = await caches.open(nombreCache)
  const guardada = await cache.match(peticion)
  if (guardada) return guardada

  const respuesta = await fetch(peticion)
  if (sePuedeGuardar(respuesta)) cache.put(peticion, respuesta.clone())
  return respuesta
}

async function navegacion(peticion) {
  try {
    return await fetch(peticion)
  } catch {
    // Es una SPA: cualquier ruta se resuelve con el mismo index.html
    return caches.match('/index.html')
  }
}
