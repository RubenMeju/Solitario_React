import { useContext, useEffect } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'
import {
  encontrarUltimaCartaEnColumna,
  moverCartasAColumna,
  voltearCarta,
  voltearUltimaCartaDeColumna
} from '../../utils'

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
    console.log('miercoles :', e.target.id)
    e.dataTransfer.effectAllowed = 'all'
    // e.dataTransfer.dropEffect = 'move'
    // Usamos slice para obtener todas las matrices desde la carta seleccionada hasta el final
    const listaCartasParaMover = columnas[carta.columna].slice(carta.columna)
    // Usamos flat para obtener una lista plana de todas las cartas
    console.log('DRAG3 Grupo3  --->>> todas las cartas: ', listaCartasParaMover)
    const data = JSON.stringify(listaCartasParaMover)
    e.dataTransfer.setData('meju', data)
    e.dataTransfer.setData('meju1', JSON.stringify(carta.columna))
  }

  const drop = (e, columna) => {
    e.preventDefault()
    console.log('Columna de destino : ', columna)
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'move'
    e.target.classList.remove('hover')

    const data = e.dataTransfer.getData('meju')

    const cartasMover = JSON.parse(data)
    const columnaInicial = JSON.parse(e.dataTransfer.getData('meju1'))
    console.log('columna Inicial : ', columnaInicial)
    console.log('DROP Grupo3 ---> cartasMover: ', cartasMover)
    const ultimaCartaDeLaCasilla = encontrarUltimaCartaEnColumna(
      columna,
      columnas
    )
    console.log('ultima carta de la columna', ultimaCartaDeLaCasilla)

    const newColumnas = [...columnas]

    if (ultimaCartaDeLaCasilla === null) {
      console.log('La columna está vacía, agregamos la carta a la columna')
      moverCartasAColumna(columnas, newColumnas, cartasMover, columna)
    } else {
      if (
        cartasMover[0]?.numero + 1 === ultimaCartaDeLaCasilla.numero &&
        cartasMover[0]?.color !== ultimaCartaDeLaCasilla.color
      ) {
        if (cartasMover[0].columna === 11) {
          console.log('el movimiento viene desde el mazo grupo1')
          const newCartasVolteadas = [...cartasVolteadas]
          newCartasVolteadas.pop()
          setCartasVolteadas(newCartasVolteadas)
          voltearCarta(ultimaCartaDeLaCasilla)
          moverCartasAColumna(
            columnas,
            newColumnas,
            cartasMover,
            ultimaCartaDeLaCasilla.columna
          )
        } else {
          moverCartasAColumna(
            columnas,
            newColumnas,
            cartasMover,
            ultimaCartaDeLaCasilla.columna
          )
          voltearUltimaCartaDeColumna(columnaInicial, columnas)
        }
      } else {
        console.log('NO SE PUEDE MOVER A ESTA COLUMNA')
      }
    }
    // Actualiza las columnas con los nuevos datos.
    setColumnas(newColumnas)
    e.dataTransfer.clearData()
  }

  useEffect(() => {
    console.log('1111111111soy las columnas useEffect', columnas)
  }, [columnas])

  return (
    <div className="grupo3">
      {columnas.map((columnaBase, index) => (
        <div
          key={index}
          id={index}
          className="carta"
          data-columna={index}
          onDragOver={(e) => allowDrop(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => drop(e, index)}
        >
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={carta.numero + '-' + carta.tipo + '-' + carta.color}
              data-columna={index}
              data-numero={carta.numero}
              data-color={carta.color}
              data-tipo={carta.tipo}
              data-flipped={carta.flipped}
              className="absolute"
              style={{ marginTop: cartaIndex * 30 + 'px' }}
              draggable={true}
              onDrop={(e) => drop(e, index)}
              onDragStart={(e) => drag(e, carta)}
              onDragOver={(e) => allowDrop(e, carta)}
              onDragLeave={(e) => dragLeave(e, carta)}
              // onDragStart={(e) => drag(e, carta)}
            >
              {carta.flipped === false ? (
                // Si es la última carta, muestra la imagen correcta
                <img
                  id={carta.numero + '-' + carta.tipo + '-' + carta.color}
                  src={carta.img}
                  alt={`Carta ${carta.numero} de ${carta.tipo}`}
                  className="feo"
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
