import { useContext } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'

export default function Grupo3() {
  const { columnas, primeraCartaCliqueada, setPrimeraCartaCliqueada } =
    useContext(GameContext)

  const handleClickCarta = (carta) => {
    console.log('Carta selecionada', carta)

    if (primeraCartaCliqueada) {
      console.log('Ya existe una primera cliqueada')
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
      carta.style.border = '2px solid red'

      setPrimeraCartaCliqueada(carta)
    }
  }

  /*
  const prepararCartasGrupo3 = () => {
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
    if (columnas.length > 0) {
      console.log('actualizar cartas si hubo movimiento')
      prepararCartasGrupo3()
    }
  }, [columnas, update, primeraCartaCliqueada])
*/

  console.log('las columnas: ', columnas)
  return (
    <div className="grupo3">
      {columnas.map((columnaBase, index) => (
        <div key={index} className="columna">
          {columnaBase.map((carta, cartaIndex) => (
            <div
              key={cartaIndex}
              data-numero={carta.numero}
              data-color={carta.color}
              data-tipo={carta.tipo}
              className=" pos-absolute"
              style={{ marginTop: cartaIndex * 30 + 'px' }}
            >
              {cartaIndex === columnaBase.length - 1 ? (
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
