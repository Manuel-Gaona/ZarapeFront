import { useState } from 'react'
import iconoEditar from '../assets/icono-editar.png'
import iconoEliminar from '../assets/icono-eliminar.png'
import { useCatalogo } from '../hooks/useCatalogo'
import DialogoConfirmar from './DialogoConfirmar'
import DialogoMensaje from './DialogoMensaje'
import Modal from './Modal'

// Pantalla completa de un catálogo: botón de agregar, buscador, tabla,
// formulario en ventana emergente y los avisos de confirmación y resultado.
//
// Los 6 catálogos funcionan igual; lo único que cambia entre ellos llega
// por props:
//   servicio          funciones de la API (ver src/api/servicios.js)
//   nombre            "Empleado", "Sucursal"...
//   femenino          true para "la sucursal", "la bebida"
//   encabezados       títulos de las columnas
//   renderFila        función que dibuja las celdas <td> de un registro
//   renderFormulario  función que dibuja el formulario
//   anchoModal        'chico', 'mediano' o 'grande' (opcional)
//   tablaAncha        true si la tabla tiene muchas columnas (opcional)
export default function PaginaCatalogo({
  servicio,
  nombre,
  femenino = false,
  encabezados,
  renderFila,
  renderFormulario,
  anchoModal,
  tablaAncha = false,
}) {
  const { registros, cargando, error, buscar, guardar, eliminar } = useCatalogo(servicio)

  const [textoBusqueda, setTextoBusqueda] = useState('')
  // null = formulario cerrado. Abierto: { registro } (registro null = nuevo)
  const [formulario, setFormulario] = useState(null)
  const [erroresFormulario, setErroresFormulario] = useState({})
  const [porEliminar, setPorEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(null)
  const [ocupado, setOcupado] = useState(false)

  // Textos según el género: "El empleado" / "La sucursal"
  const elNombre = `${femenino ? 'La' : 'El'} ${nombre.toLowerCase()}`
  const esteNombre = `${femenino ? 'esta' : 'este'} ${nombre.toLowerCase()}`

  function abrirFormulario(registro) {
    setErroresFormulario({})
    setFormulario({ registro })
  }

  function enviarBusqueda(evento) {
    evento.preventDefault()
    buscar(textoBusqueda)
  }

  async function manejarGuardar(datos) {
    setOcupado(true)
    setErroresFormulario({})
    try {
      await guardar(datos, formulario.registro?.id)
      setFormulario(null)
      setMensaje({ tipo: 'correcto', texto: `${elNombre} se guardó correctamente` })
    } catch (problema) {
      const hayErroresPorCampo = Object.keys(problema.errores || {}).length > 0
      if (hayErroresPorCampo) {
        // Se muestran junto a cada campo y el formulario sigue abierto
        setErroresFormulario(problema.errores)
      } else {
        setMensaje({ tipo: 'error', texto: problema.message })
      }
    } finally {
      setOcupado(false)
    }
  }

  async function manejarEliminar() {
    setOcupado(true)
    try {
      await eliminar(porEliminar.id)
      setMensaje({ tipo: 'correcto', texto: `${elNombre} se eliminó correctamente` })
    } catch (problema) {
      setMensaje({ tipo: 'error', texto: problema.message })
    } finally {
      setPorEliminar(null)
      setOcupado(false)
    }
  }

  return (
    <section className="catalogo">
      <div className="catalogo-barra">
        <button className="boton boton-cafe" onClick={() => abrirFormulario(null)}>
          Agregar {nombre}
        </button>

        <form className="catalogo-busqueda" onSubmit={enviarBusqueda}>
          <input
            type="search"
            placeholder={`Buscar ${nombre}....`}
            aria-label={`Buscar ${nombre}`}
            value={textoBusqueda}
            onChange={(evento) => setTextoBusqueda(evento.target.value)}
          />
          <button className="boton boton-cafe">Buscar</button>
        </form>
      </div>

      {error && <p className="aviso-error">{error}</p>}

      <div className="tabla-contenedor">
        <table className={tablaAncha ? 'tabla tabla-ancha' : 'tabla'}>
          <thead>
            <tr>
              {encabezados.map((encabezado) => (
                <th key={encabezado}>{encabezado}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                {renderFila(registro)}
                <td className="tabla-acciones">
                  <button title="Editar" onClick={() => abrirFormulario(registro)}>
                    <img src={iconoEditar} alt="Editar" />
                  </button>
                  <button title="Eliminar" onClick={() => setPorEliminar(registro)}>
                    <img src={iconoEliminar} alt="Eliminar" />
                  </button>
                </td>
              </tr>
            ))}

            {registros.length === 0 && (
              <tr>
                <td colSpan={encabezados.length + 1}>
                  {cargando ? 'Cargando...' : 'No hay registros para mostrar.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {formulario && (
        <Modal
          titulo={`${formulario.registro ? 'Editar' : 'Agregar'} ${nombre}`}
          ancho={anchoModal}
        >
          {renderFormulario({
            registro: formulario.registro,
            errores: erroresFormulario,
            guardando: ocupado,
            onGuardar: manejarGuardar,
            onCancelar: () => setFormulario(null),
          })}
        </Modal>
      )}

      {porEliminar && (
        <DialogoConfirmar
          pregunta={`¿Estás seguro de eliminar ${esteNombre}?`}
          ocupado={ocupado}
          onConfirmar={manejarEliminar}
          onCancelar={() => setPorEliminar(null)}
        />
      )}

      {mensaje && (
        <DialogoMensaje
          tipo={mensaje.tipo}
          texto={mensaje.texto}
          onCerrar={() => setMensaje(null)}
        />
      )}
    </section>
  )
}
