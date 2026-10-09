import { urlImagen } from '../../api/cliente'
import { alimentosApi, bebidasApi } from '../../api/servicios'
import ProductoForm from '../../components/formularios/ProductoForm'
import PaginaCatalogo from '../../components/PaginaCatalogo'
import { precio } from '../../utils/formato'

// Los catálogos de alimentos y de bebidas son idénticos: es el mismo
// componente y la prop "tipo" decide cuál de los dos se muestra.
const TIPOS = {
  alimento: { servicio: alimentosApi, nombre: 'Alimento', femenino: false },
  bebida: { servicio: bebidasApi, nombre: 'Bebida', femenino: true },
}

export default function ProductosPage({ tipo }) {
  const { servicio, nombre, femenino } = TIPOS[tipo]

  return (
    <PaginaCatalogo
      servicio={servicio}
      nombre={nombre}
      femenino={femenino}
      encabezados={['Nombre', 'Descripción', 'Foto', 'Precio', 'Categoría']}
      renderFila={(producto) => (
        <>
          <td>{producto.nombre}</td>
          <td>{producto.descripcion}</td>
          <td>
            {producto.foto && (
              <img className="tabla-foto" src={urlImagen(producto.foto)} alt="" loading="lazy" />
            )}
          </td>
          <td>{precio(producto.precio)}</td>
          <td>{producto.categoria.nombre}</td>
        </>
      )}
      renderFormulario={(props) => <ProductoForm {...props} tipo={tipo} nombreTipo={nombre} />}
    />
  )
}
