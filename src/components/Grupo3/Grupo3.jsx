import { useContext } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'
import { encontrarUltimaCartaEnCasilla } from '../../utils'

export default function Grupo3() {
  const {
    cartasVolteadas,
    setCartasVolteadas,
    columnas,
    setColumnas,
    primeraCartaCliqueada,
    setPrimeraCartaCliqueada,
    allowDrop,
    dragLeave
  } = useContext(GameContext)

  const drag = (e, carta) => {
    // Usamos slice para obtener todas las matrices desde la carta seleccionada hasta el final
    const cartasDesdeSeleccionadaHastaElFinal = columnas[carta.casilla].slice(
      carta.casilla
    )

    // Usamos flat para obtener una lista plana de todas las cartas
    const todasLasCartas = cartasDesdeSeleccionadaHastaElFinal.flat()
    console.log('todas las cartas', todasLasCartas)
    /*
    // Creamos una lista de imágenes
    const listaDeImagenes = todasLasCartas.map((carta, index) => {
      const imgElement = new Image()
      imgElement.src = carta.img
      imgElement.style.position = 'absolute'
      imgElement.style.top = `${30 * index}px` // Espacio vertical de 30px entre imágenes
      document.body.appendChild(imgElement) // Agregamos la imagen al DOM
      return imgElement
    })

    // Configuramos la lista de imágenes como dragImage
    e.dataTransfer.setDragImage(listaDeImagenes[0], 0, 0)
*/
    const data = e.dataTransfer.setData('meju', JSON.stringify(todasLasCartas))
    console.log('soy la data en drag: ', carta)
    setPrimeraCartaCliqueada(carta)
  }
  // tengo q conseguir arrastrar varias cartas a la vez
  const drop = (e, casilla) => {
    e.preventDefault()
    console.log('CASILLA : ', casilla)

    e.target.classList.remove('hover')
    const data = e.dataTransfer.getData('meju')
    console.log('la data del DROP', data)
    const ultimaCartaDeLaCasilla = encontrarUltimaCartaEnCasilla(
      casilla,
      columnas
    )
    console.log('ultima carta de la casilla', ultimaCartaDeLaCasilla)

    // si la columna esta vacia agregamos la carta a la columna destino y la quitamos de la columna donde estaba
    if (ultimaCartaDeLaCasilla === null) {
      console.log('La columna esta vacia agregamos la carta a la columna')
      const newColumnas = [...columnas]

      newColumnas[primeraCartaCliqueada.casilla].pop()

      // Agrega la carta a la segunda casilla
      primeraCartaCliqueada.casilla = casilla
      newColumnas[casilla].push(primeraCartaCliqueada)

      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newColumnas)
    } else {
      if (
        primeraCartaCliqueada.numero + 1 == ultimaCartaDeLaCasilla.numero &&
        primeraCartaCliqueada.color !== ultimaCartaDeLaCasilla.color
      ) {
        const newColumnas = [...columnas]
        if (primeraCartaCliqueada.casilla === 11) {
          const newCartasVolteadas = [...cartasVolteadas]
          newCartasVolteadas.pop()
          setCartasVolteadas(newCartasVolteadas)
          //  console.log('que es newcartasvolteadas: ', newCartasVolteadas)
          ultimaCartaDeLaCasilla.flipped = false
          // Modifico la casilla por la actual
          primeraCartaCliqueada.casilla = ultimaCartaDeLaCasilla.casilla
          // Agrega la carta a la casilla correspontiente
          newColumnas[ultimaCartaDeLaCasilla.casilla].push(
            primeraCartaCliqueada
          )

          // Actualiza el estado con la nueva disposición de las columnas
          setColumnas(newColumnas)
        } else {
          // Elimina la carta de la primera columna
          const cartaMovida = newColumnas[primeraCartaCliqueada.casilla].pop()
          // Se voltea la carta
          ultimaCartaDeLaCasilla.flipped = false
          // Modifico la casilla por la actual
          primeraCartaCliqueada.casilla = ultimaCartaDeLaCasilla.casilla

          // Agrega la carta a la segunda casilla
          newColumnas[ultimaCartaDeLaCasilla.casilla].push(cartaMovida)

          // Actualiza el estado con la nueva disposición de las columnas
          setColumnas(newColumnas)
        }
      } else {
        console.log('NO SE PUEDE MOVER A ESTA COLUMNA')
      }
    }
    // se compara que el numero sea menor y q sea  de distinto color
  }
  return (
    <div className="grupo3">
      {columnas.map((columnaBase, index) => (
        <div
          key={index}
          id={index}
          className="carta"
          data-casilla={index}
          onDrop={(e) => drop(e, index)}
          onDragOver={(e) => allowDrop(e)}
          onDragLeave={(e) => dragLeave(e)}
        >
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={cartaIndex}
              id="drag3"
              data-casilla={index}
              data-numero={carta.numero}
              data-color={carta.color}
              data-tipo={carta.tipo}
              className=" pos-absolute"
              style={{ marginTop: cartaIndex * 30 + 'px' }}
              draggable={true}
              onDragStart={(e) => drag(e, carta)}

              // onDragStart={(e) => drag(e, carta)}
            >
              {cartaIndex === columnaBase.length - 1 ||
              carta.flipped === false ? (
                // Si es la última carta, muestra la imagen correcta
                <img
                  src={carta.img}
                  alt={`Carta ${carta.numero} de ${carta.tipo}`}
                />
              ) : (
                // Si no es la última carta, muestra la imagen boca abajo
                <img src="back.png" alt="Carta boca abajo" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
