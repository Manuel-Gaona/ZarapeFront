import { alimentosApi, bebidasApi, combosApi } from '../api/servicios'
import TarjetaMenu from '../components/TarjetaMenu'
import { useCatalogo } from '../hooks/useCatalogo'

// Una sola página para las tres secciones del menú. Lo que cambia es de
// dónde se piden los datos, y eso se decide con la prop "seccion".
const SECCIONES = {
  alimentos: { servicio: alimentosApi, prefijoClave: 'producto' },
  bebidas: { servicio: bebidasApi, prefijoClave: 'producto' },
  combos: { servicio: combosApi, prefijoClave: 'combo' },
}

export default function MenuPage({ seccion }) {
  const { servicio, prefijoClave } = SECCIONES[seccion]
  const { registros, cargando, error } = useCatalogo(servicio)

  return (
    <section className="menu">
      {cargando && <p className="menu-estado">Cargando {seccion}...</p>}
      {error && <p className="menu-estado">{error}</p>}
      {!cargando && !error && registros.length === 0 && (
        <p className="menu-estado">Por ahora no hay {seccion} disponibles.</p>
      )}

      <div className={seccion === 'combos' ? 'menu-rejilla menu-rejilla-combos' : 'menu-rejilla'}>
        {registros.map((articulo) => (
          <TarjetaMenu
            key={articulo.id}
            articulo={articulo}
            clave={`${prefijoClave}-${articulo.id}`}
          />
        ))}
      </div>
    </section>
  )
}
