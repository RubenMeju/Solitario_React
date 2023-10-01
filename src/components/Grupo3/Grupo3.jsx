import { useEffect, useState } from 'react'
import { crearCartaHTML } from '../../utils'

export default function Grupo3({ columnas, isPlay, primeraCartaCliqueada }) {
  const [update, setUpdate] = useState(false)

  const handleClickCarta = (carta) => {
    // console.log('Carta clicked')

    if (primeraCartaCliqueada) {
      // setUpdate(false)
      const segundaCartaCliqueada = carta
      if (
        primeraCartaCliqueada.dataset.numero ==
          segundaCartaCliqueada.dataset.numero - 1 &&
        segundaCartaCliqueada.dataset.color !==
          primeraCartaCliqueada.dataset.color
      ) {
        // alert('moviemiento permitido')
        const columnaDeLaPrimeraCarta =
          columnas[Number(primeraCartaCliqueada.dataset.column)]
        const columnaDeLaSegundaCarta =
          columnas[Number(segundaCartaCliqueada.dataset.column)]
        const primeraCarta = columnaDeLaPrimeraCarta.pop()
        columnaDeLaSegundaCarta.push(primeraCarta)

        setUpdate(true)
        // prepararCartasGrupo3(segundaCarta)
      } else {
        alert('no se puede mover!!!!!')
      }
    } else {
      primeraCartaCliqueada = carta
      carta.style.border = '2px solid red'
    }
  }

  const prepararCartasGrupo3 = (columnas) => {
    // Limpiar el contenido de todas las columnas antes de agregar las cartas
    for (let i = 0; i < columnas.length; i++) {
      const columna = document.querySelector(`#columna-${i}`)
      columna.innerHTML = '' // Limpiar el contenido
      for (let j = 0; j < columnas[i].length; j++) {
        const finalColumna = j === columnas[i].length - 1
        const carta = columnas[i][j]
        if (finalColumna) {
          carta.flipped = false
        }
        const cartaHTML = crearCartaHTML(carta, handleClickCarta)
        cartaHTML.dataset.column = i
        cartaHTML.style.top = `${j * 30}px`
        columna.appendChild(cartaHTML)
      }
    }
  }

  useEffect(() => {
    if (isPlay === true) {
      prepararCartasGrupo3(columnas)
    }
  }, [isPlay, columnas, update])

  return (
    <div className="grupo3">
      <div className="carta" id="columna-0"></div>
      <div className="carta" id="columna-1"></div>
      <div className="carta" id="columna-2"></div>
      <div className="carta" id="columna-3"></div>
      <div className="carta" id="columna-4"></div>
      <div className="carta" id="columna-5"></div>
      <div className="carta" id="columna-6"></div>
    </div>
  )
}
