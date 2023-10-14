import { useContext } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'
import {
  encontrarCartasEnColumna,
  voltearUltimaCartaDeColumna
} from '../../utils'
import sound2 from '../../assets/fijar.mp3'

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
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setData('meju', JSON.stringify(carta))
  }

  const drop = (e, ultimaCarta) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'move'
    e.target.classList.remove('hover')

    const primeraCarta = JSON.parse(e.dataTransfer.getData('meju'))

    if (
      primeraCarta.numero + 1 === ultimaCarta.numero &&
      primeraCarta.color !== ultimaCarta.color
    ) {
      const sound2 = document.querySelector('#sound2')
      sound2.volume = 0.5
      sound2.play()
      // La carta viene del grupo1
      if (primeraCarta.columna === 11) {
        // elimino la carta del grupo1
        const newCartasVolteadas = [...cartasVolteadas]
        newCartasVolteadas.pop()
        setCartasVolteadas(newCartasVolteadas)
        // añadir la carta al grupo3  (esto se puede refactorizar)
        const newColumnas = [...columnas]
        // Elimina la carta de la columna selecionada
        primeraCarta.flipped = false
        primeraCarta.columna = ultimaCarta.columna
        newColumnas[ultimaCarta.columna].push(primeraCarta)
        // Actualiza el estado con la nueva disposición de las columnas
        setColumnas(newColumnas)
      }
      const listaDeCartas = encontrarCartasEnColumna(columnas, primeraCarta)

      // si las cartas vienen del grupo3
      const newColumnas = [...columnas]

      for (let i = 0; i < listaDeCartas.length; i++) {
        const carta = listaDeCartas[i]
        // Elimina la carta de la columna seleccionada
        newColumnas[carta.columna].pop()
        voltearUltimaCartaDeColumna(primeraCarta.columna, columnas)
        carta.columna = ultimaCarta.columna
        newColumnas[ultimaCarta.columna].push(carta)
      }

      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newColumnas)
    } else {
      console.log('Movimiento no permitido!!!')
    }
  }

  const dropColumnaVacia = (e, columna) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'move'
    e.target.classList.remove('hover')

    const primeraCarta = JSON.parse(e.dataTransfer.getData('meju'))
    const sound2 = document.querySelector('#sound2')
    sound2.volume = 0.5
    sound2.play()
    // La carta viene del grupo1
    if (primeraCarta.columna === 11) {
      // elimino la carta del grupo1
      const newCartasVolteadas = [...cartasVolteadas]
      newCartasVolteadas.pop()
      setCartasVolteadas(newCartasVolteadas)
      // añadir la carta al grupo3  (esto se puede refactorizar)
      const newColumnas = [...columnas]
      // Elimina la carta de la columna selecionada
      primeraCarta.flipped = false
      primeraCarta.columna = columna
      newColumnas[columna].push(primeraCarta)
      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newColumnas)
    } else {
      const listaDeCartas = encontrarCartasEnColumna(columnas, primeraCarta)

      // si las cartas vienen del grupo3
      const newColumnas = [...columnas]

      for (let i = 0; i < listaDeCartas.length; i++) {
        const carta = listaDeCartas[i]
        // Elimina la carta de la columna seleccionada
        newColumnas[carta.columna].pop()
        voltearUltimaCartaDeColumna(primeraCarta.columna, columnas)

        carta.columna = columna
        newColumnas[columna].push(carta)
      }
      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newColumnas)
    }
  }

  return (
    <div className="grupo3">
      <audio id="sound2" src={sound2}></audio>
      {columnas.map((columnaBase, index) => (
        <div
          key={index}
          id={index}
          className="carta"
          data-columna={index}
          onDragOver={(e) => allowDrop(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => dropColumnaVacia(e, index)}
        >
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={carta.numero + '-' + carta.tipo + '-' + carta.color}
              className=" absolute"
              style={{ marginTop: cartaIndex * 30 + 'px' }}
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
