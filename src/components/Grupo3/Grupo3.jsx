import { useContext, useEffect } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'
import { encontrarUltimaCartaEnCasilla } from '../../utils'

export default function Grupo3() {
  const {
    cartasVolteadas,
    setCartasVolteadas,
    columnas,
    setColumnas,
    allowDrop,
    dragLeave
  } = useContext(GameContext)

  const drag = (e, carta) => {
    console.log('el drag3', e.target.id)
    // Usamos slice para obtener todas las matrices desde la carta seleccionada hasta el final
    const listaCartasParaMover = columnas[carta.casilla].slice(carta.casilla)
    console.log('DRAG3 Grupo3 --> listaCartasParaMover:', listaCartasParaMover)
    // Usamos flat para obtener una lista plana de todas las cartas
    const todasLasCartas = listaCartasParaMover.flat()
    console.log('DRAG3 Grupo3  --->>> todas las cartas: ', todasLasCartas)

    e.dataTransfer.setData('meju', JSON.stringify(todasLasCartas))
  }

  const drop = (e, casilla) => {
    e.preventDefault()
    console.log('CASILLA : ', casilla)

    e.target.classList.remove('hover')
    const cartasMover = JSON.parse(e.dataTransfer.getData('meju'))
    console.log('DROP Grupo3 ---> cartasMover: ', cartasMover)
    const ultimaCartaDeLaCasilla = encontrarUltimaCartaEnCasilla(
      casilla,
      columnas
    )
    console.log('ultima carta de la casilla', ultimaCartaDeLaCasilla)

    if (ultimaCartaDeLaCasilla === null) {
      console.log('La columna está vacía, agregamos la carta a la columna')
      const newColumnas = [...columnas]
      cartasMover.forEach((item) => {
        newColumnas[item.casilla].pop()
        item.casilla = casilla
        newColumnas[casilla].push(item)
        // return newColumnas
      })
      setColumnas(newColumnas)
    } else {
      console.log('')
      if (
        cartasMover[0]?.numero + 1 === ultimaCartaDeLaCasilla.numero &&
        cartasMover[0]?.color !== ultimaCartaDeLaCasilla.color
      ) {
        const newColumnas = [...columnas]
        if (cartasMover[0].casilla === 11) {
          console.log('el movimiento viene desde el mazo grupo1')
          const newCartasVolteadas = [...cartasVolteadas]
          newCartasVolteadas.pop()
          setCartasVolteadas(newCartasVolteadas)
          ultimaCartaDeLaCasilla.flipped = false
          cartasMover[0].casilla = ultimaCartaDeLaCasilla.casilla
          newColumnas[ultimaCartaDeLaCasilla.casilla].push(cartasMover[0])
          setColumnas(newColumnas)
        } else {
          cartasMover.forEach((item) => {
            console.log(
              'cada vez q paso por el forEarch imprimo una carta : ',
              item
            )
            newColumnas[item.casilla].pop()
            ultimaCartaDeLaCasilla.flipped = false
            item.casilla = ultimaCartaDeLaCasilla.casilla
            newColumnas[ultimaCartaDeLaCasilla.casilla].push(item)
            // return newColumnas
          })
          setColumnas(newColumnas)
        }
      } else {
        console.log('NO SE PUEDE MOVER A ESTA COLUMNA')
      }
    }
  }
  useEffect(() => {
    console.log('soy las columnas useEffect', columnas)
  }, [columnas])

  return (
    <div className="grupo3">
      {columnas.map((columnaBase, index) => (
        <div
          key={index}
          id={index}
          className="carta"
          data-casilla={index}
          ///   onDragOver={(e) => allowDrop(e)}
          /// onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => drop(e, index)}
        >
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={carta.numero + '-' + carta.tipo + '-' + carta.color}
              id={carta.numero + '-' + carta.tipo + '-' + carta.color}
              data-casilla={index}
              data-numero={carta.numero}
              data-color={carta.color}
              data-tipo={carta.tipo}
              data-flipped={carta.flipped}
              className=" pos-absolute"
              style={{ marginTop: cartaIndex * 30 + 'px' }}
              draggable={true}
              onDrop={(e) => drop(e, index)}
              onDragStart={(e) => drag(e, carta)}
              onDragOver={(e) => allowDrop(e)}
              onDragLeave={(e) => dragLeave(e)}
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
