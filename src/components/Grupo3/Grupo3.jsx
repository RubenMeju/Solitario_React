import { useContext, useEffect } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'
import { voltearUltimaCartaDeColumna } from '../../utils'

export default function Grupo3() {
  const {
    cartasVolteadas,
    setCartasVolteadas,
    columnas,
    setColumnas,
    allowDrop,
    dragLeave
  } = useContext(GameContext)

  function encontrarCartasEnColumna(arrayDeDatos, cartaSeleccionada) {
    const elementosEnColumna = []
    let found = false

    for (let i = 0; i < arrayDeDatos.length; i++) {
      const subArray = arrayDeDatos[i]

      for (let j = 0; j < subArray.length; j++) {
        if (subArray[j].id === cartaSeleccionada.id) {
          found = true
        }

        if (found) {
          elementosEnColumna.push(subArray[j])
        }
      }

      if (found) {
        break // Deja de buscar una vez que encuentres la carta seleccionada.
      }
    }

    return elementosEnColumna
  }

  function encontrarUltimaCartaDeColumna(columnas, numeroColumna) {
    if (numeroColumna >= 0 && numeroColumna < columnas.length) {
      const columna = columnas[numeroColumna]
      if (columna.length > 0) {
        const ultimaCarta = columna[columna.length - 1]
        return ultimaCarta
      }
    }
    // Si la columna está vacía o no existe, puedes manejarlo como desees.
    return null // o cualquier otro valor que indique que no se encontró una última carta.
  }

  const drag = (e, carta) => {
    console.log('drag3 cartaID :', e.target.id)
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
    console.log('Drog3 primeraCarta', primeraCarta.columna)
    console.log('Drog3 ultimaCarta : ', ultimaCarta)

    // La carta viene del grupo1
    if (primeraCarta.columna === 11) {
      console.log('el movimiento viene desde el mazo grupo1')
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

    if (
      primeraCarta.numero + 1 === ultimaCarta.numero &&
      primeraCarta.color !== ultimaCarta.color
    ) {
      const listaDeCartas = encontrarCartasEnColumna(columnas, primeraCarta)
      console.log('Drop3 ListaDeCartas', listaDeCartas)

      // si las cartas vienen del grupo3
      const newColumnas = [...columnas]

      for (let i = 0; i < listaDeCartas.length; i++) {
        const carta = listaDeCartas[i]
        // Realiza operaciones con la carta, por ejemplo, imprimir su ID.
        console.log('ID de la carta:', carta.id)
        // Elimina la carta de la columna seleccionada

        newColumnas[carta.columna].pop()
        voltearUltimaCartaDeColumna(primeraCarta.columna, columnas)

        carta.columna = ultimaCarta.columna
        newColumnas[ultimaCarta.columna].push(carta)
      }

      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newColumnas)
      console.log('la carta se puede mover')
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
    console.log('dropColumnaVacia primeraCarta', primeraCarta)
    console.log('dropColumnaVacia columna : ', columna)

    console.log('La columna esta vacia')
    const listaDeCartas = encontrarCartasEnColumna(columnas, primeraCarta)
    console.log('mejuuuus', listaDeCartas)

    // si las cartas vienen del grupo3
    const newColumnas = [...columnas]

    for (let i = 0; i < listaDeCartas.length; i++) {
      const carta = listaDeCartas[i]
      // Realiza operaciones con la carta, por ejemplo, imprimir su ID.
      console.log('ID de la carta:', carta.id)
      // Elimina la carta de la columna seleccionada
      newColumnas[carta.columna].pop()
      voltearUltimaCartaDeColumna(primeraCarta.columna, columnas)

      carta.columna = columna
      newColumnas[columna].push(carta)
    }

    // Actualiza el estado con la nueva disposición de las columnas
    setColumnas(newColumnas)
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
          onDragOver={(e) => allowDrop(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => dropColumnaVacia(e, index)}
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
