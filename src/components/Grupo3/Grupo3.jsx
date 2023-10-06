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
    allowDrop
  } = useContext(GameContext)

  const drag = (e, carta) => {
    e.dataTransfer.setData('drag3', e.target.id)
    setPrimeraCartaCliqueada(carta)
  }

  const drop = (e, casilla) => {
    e.preventDefault()
    const ultimaCartaDeLaCasilla = encontrarUltimaCartaEnCasilla(
      casilla,
      columnas
    )
    console.log('ultima carta de la casilla', ultimaCartaDeLaCasilla)
    // se compara que el numero sea menor y q sea  de distinto color
    if (
      primeraCartaCliqueada.numero < ultimaCartaDeLaCasilla.numero &&
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
        newColumnas[ultimaCartaDeLaCasilla.casilla].push(primeraCartaCliqueada)

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
  return (
    <div className="grupo3">
      {columnas.map((columnaBase, index) => (
        <div
          key={index}
          className="columna"
          data-casilla={index}
          onDrop={(e) => drop(e, index)}
          onDragOver={(e) => allowDrop(e)}
        >
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={cartaIndex}
              id={carta.numero + '-' + carta.tipo + '-' + carta.color}
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
