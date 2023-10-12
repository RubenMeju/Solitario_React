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

  function buscarCartaPorId(idCarta, columnas) {
    for (const lista of columnas) {
      for (const carta of lista) {
        if (carta.id === idCarta) {
          return carta // Devuelve la carta si se encuentra
        }
      }
    }
    return null // Retorna null si el ID no se encuentra
  }

  const drag = (e, carta) => {
    console.log('drag3 cartaID :', e.target.id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'

    e.dataTransfer.setData('meju', JSON.stringify(carta))
  }

  const drop = (e, ultimaCarta) => {
    e.preventDefault()
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'move'
    e.target.classList.remove('hover')

    const primeraCarta = JSON.parse(e.dataTransfer.getData('meju'))
    console.log('Drog3 primeraCarta', primeraCarta.color)
    console.log('Drog3 ultimaCarta : ', ultimaCarta.color)

    if (
      primeraCarta.numero + 1 === ultimaCarta.numero &&
      primeraCarta.color !== ultimaCarta.color
    ) {
      console.log('la carta se puede mover')
      // si la carta viene del grupo3
      const newColumnas = [...columnas]
      // Elimina la carta de la columna selecionada
      newColumnas[primeraCarta.columna].pop()
      voltearUltimaCartaDeColumna(primeraCarta.columna, columnas)
      primeraCarta.columna = ultimaCarta.columna
      newColumnas[ultimaCarta.columna].push(primeraCarta)
      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newColumnas)
    } else {
      console.log('Movimiento no permitido!!!')
    }
    /*
    const cartasMover = [JSON.parse(data)]
    const columnaInicial = JSON.parse(e.dataTransfer.getData('meju1'))
    console.log('drog columna Inicial : ', columnaInicial)
    console.log('DROP Grupo3 --->LLEga del drag cartasMover: ', cartasMover)
    const ultimaCartaDeLaCasilla = encontrarUltimaCartaEnColumna(
      columna,
      columnas
    )
    console.log('drop3: ultima carta de la columna: ', ultimaCartaDeLaCasilla)

    const newColumnas = [...columnas]

    if (ultimaCartaDeLaCasilla === null) {
      console.log('drop La columna está vacía, agregamos la carta a la columna')
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
          console.log('drog el movimiento viene desde las columnas grupo3')

          moverCartasAColumna(
            columnas,
            newColumnas,
            cartasMover,
            ultimaCartaDeLaCasilla.columna
          )
          voltearUltimaCartaDeColumna(columnaInicial, columnas)
        }
      }
    }
    // Actualiza las columnas con los nuevos datos.
    setColumnas(newColumnas)
    */
  }

  useEffect(() => {
    console.log(' las columnas useEffect', columnas)
  }, [columnas])

  return (
    <div className="grupo3">
      {columnas.map((columnaBase, index) => (
        <div
          key={index}
          id={index}
          className="carta"
          data-columna={index}
          // onDragOver={(e) => allowDrop(e)}
          //  onDragLeave={(e) => dragLeave(e)}
          //  onDrop={(e) => drop(e, index)}
        >
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={carta.numero + '-' + carta.tipo + '-' + carta.color}
              className=" absolute"
              style={{ marginTop: cartaIndex * 60 + 'px' }}
              data-columna={index}
              data-numero={carta.numero}
              data-color={carta.color}
              data-tipo={carta.tipo}
              data-flipped={carta.flipped}
              draggable={true}
              onDragStart={(e) => drag(e, carta)}
              onDragOver={(e) => allowDrop(e)}
              onDragLeave={(e) => dragLeave(e)}
              onDrop={(e) => drop(e, carta)}
              // onDragStart={(e) => drag(e, carta)}
            >
              {carta.flipped === false ? (
                // Si es la última carta, muestra la imagen correcta
                <img
                  src={carta.img}
                  alt={carta.id}
                  className="img"
                  id={carta.id}
                />
              ) : (
                // Si no es la última carta, muestra la imagen boca abajo
                <img
                  src="back.png"
                  alt="Carta boca abajo"
                  className="img"
                  id={carta.id}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
