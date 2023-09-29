import { useEffect } from 'react'
import { crearCartaHTML } from '../../utils'

export default function Grupo3({ columnas, isPlay, primeraCartaCliqueada }) {
  const handleClickCarta = (carta) => {
    console.log('Carta clicked')

    if (primeraCartaCliqueada) {
      const segundaCartaCliqueada = carta
      if (
        primeraCartaCliqueada.dataset.numero ==
          segundaCartaCliqueada.dataset.numero - 1 &&
        segundaCartaCliqueada.dataset.color !==
          primeraCartaCliqueada.dataset.color
      ) {
        alert('moviemiento permitido')
      } else {
        alert('no se puede mover!!!!!')
      }
    } else {
      primeraCartaCliqueada = carta
      carta.style.border = '2px solid red'
    }
  }

  const prepararCartasGrupo3 = (columnas) => {
    for (let i = 0; i < columnas.length; i++) {
      const columna = document.querySelector(`#columna-${i}`)
      for (let j = 0; j < columnas[i].length; j++) {
        const finalColumna = j === columnas[i].length - 1
        const carta = columnas[i][j]
        if (finalColumna) {
          carta.flipped = false
        }
        const cartaHTML = crearCartaHTML(carta, handleClickCarta)
        cartaHTML.style.top = `${j * 30}px`
        columna.appendChild(cartaHTML)
      }
    }
  }

  useEffect(() => {
    if (isPlay === true) {
      console.log('isplay grupo3: ', isPlay)
      prepararCartasGrupo3(columnas)
    }
  }, [isPlay])

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
