import esencia from '../assets/esencia.jpg'
import galeria1 from '../assets/galeria-1.jpg'
import galeria2 from '../assets/galeria-2.jpg'
import galeria3 from '../assets/galeria-3.jpg'
import galeria4 from '../assets/galeria-4.jpg'
import galeria5 from '../assets/galeria-5.jpg'
import galeria6 from '../assets/galeria-6.jpg'
import paso1 from '../assets/paso-1.png'
import paso2 from '../assets/paso-2.png'
import paso3 from '../assets/paso-3.png'

const GALERIA = [
  { foto: galeria1, nombre: 'Chile en nogada' },
  { foto: galeria2, nombre: 'Enchiladas' },
  { foto: galeria3, nombre: 'Pozole' },
  { foto: galeria4, nombre: 'Flautas' },
  { foto: galeria5, nombre: 'Huaraches' },
  { foto: galeria6, nombre: 'Mole' },
]

const PASOS = [
  { icono: paso1, texto: 'Ordena tus alimentos a consumir.' },
  { icono: paso2, texto: 'Paga tu orden.' },
  { icono: paso3, texto: 'Espera a que tu comida este lista (sonará avisador).' },
]

export default function InicioPage() {
  return (
    <>
      <section className="portada">
        <h2 className="portada-titulo">“El Zarape”</h2>
        <p className="portada-texto">
          ¡Sumérgete en un mundo de sabores auténticos de México! Descubre la pasión en cada
          bocado.
        </p>
      </section>

      <section className="seccion seccion-mushroom">
        <h2 className="seccion-titulo">
          Descubre la esencia de “El Zarape”, donde la tradición y la innovación se fusionan.
        </h2>
        <div className="esencia">
          <img src={esencia} alt="Mesa con platillos mexicanos" />
          <div>
            <p>
              En "El Zarape", cada platillo cuenta una historia única que te transportará a las
              calles de México.
            </p>
            <p>
              Nuestro compromiso es ofrecerte una experiencia culinaria inolvidable, llena de
              autenticidad y pasión.
            </p>
            <p>
              ¡Ven y únete a nuestra familia gastronómica para vivir momentos inolvidables juntos!
            </p>
          </div>
        </div>
      </section>

      <section className="seccion seccion-onion">
        <h2 className="seccion-titulo">¡Esto sí es sabor!</h2>
        <div className="galeria">
          {GALERIA.map((platillo) => (
            <img key={platillo.nombre} src={platillo.foto} alt={platillo.nombre} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="seccion">
        <h2 className="seccion-titulo">Pasos a seguir para ordenar</h2>
        <ol className="pasos">
          {PASOS.map((paso, indice) => (
            <li key={paso.texto}>
              <img src={paso.icono} alt="" />
              <p>
                <strong>{indice + 1}.-</strong> {paso.texto}
              </p>
            </li>
          ))}
        </ol>
        <h2 className="seccion-titulo">¡Listo, disfruta tu comida!</h2>
      </section>
    </>
  )
}
