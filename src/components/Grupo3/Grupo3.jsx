import { useContext } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'

export default function Grupo3() {
  const {
    columnas,
    setColumnas,
    primeraCartaCliqueada,
    setPrimeraCartaCliqueada,
    allowDrop
  } = useContext(GameContext)

  const drag = (e, carta) => {
    e.dataTransfer.setData('drag3', e.target.id)
    console.log('Carta selecionada drag', carta)
    setPrimeraCartaCliqueada(carta)
  }
  const encontrarUltimaCartaEnColumna = (columnaIndex, cartas) => {
    // Verificamos si el índice de la columna es válido
    if (columnaIndex >= 0 && columnaIndex < cartas.length) {
      // Obtenemos la columna específica
      const columna = cartas[columnaIndex]

      // Verificamos si la columna tiene al menos una carta
      if (columna.length > 0) {
        // La última carta en la columna es la que se encuentra en la posición final del array
        return columna[columna.length - 1]
      }
    }

    // Si la columna no es válida o está vacía, podemos devolver un valor nulo o un mensaje de error, dependiendo de tu preferencia.
    return null // o 'No hay cartas en esta columna' u otro mensaje personalizado.
  }

  const drop = (e, columna) => {
    console.log('mejuuu: ', columna)
    e.preventDefault()
    const ultimaCartaDeLaColumna = encontrarUltimaCartaEnColumna(
      columna,
      columnas
    )
    console.log('Soy la ultima carta de la columna:', ultimaCartaDeLaColumna)
    // se compara que el numero sea menor y q sea  de distinto color
    if (
      primeraCartaCliqueada.numero < ultimaCartaDeLaColumna.numero &&
      primeraCartaCliqueada.color !== ultimaCartaDeLaColumna.color
    ) {
      console.log('se puede mover a esta columna')
      //   primeraCartaCliqueada.columna
      const newState = [...columnas]
      console.log('numerito de la columan :', primeraCartaCliqueada.columna)

      // Mueve la carta de la primera columna a la segunda columna
      const cartaMovida = newState[primeraCartaCliqueada.columna].pop() // Elimina la carta de la primera columna
      ultimaCartaDeLaColumna.flipped = false
      newState[ultimaCartaDeLaColumna.columna].push(cartaMovida) // Agrega la carta a la segunda columna
      console.log('newstate :', newState)
      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newState)
    } else {
      console.log('NO SE PUEDE MOVER A ESTA COLUMNA')
    }
  }

  return (
    <div className="grupo3">
      {columnas.map((columnaBase, index) => (
        <div
          key={index}
          className="columna"
          data-columna={index}
          onDrop={(e) => drop(e, index)}
          onDragOver={(e) => allowDrop(e)}
        >
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={cartaIndex}
              id={carta.numero + '-' + carta.tipo + '-' + carta.color}
              data-columna={index}
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
