import { useContext, useState } from 'react'
import './styles.css'
import { GameContext } from '../mesa/Mesa'
import { voltearUltimaCartaDeColumna } from '../../utils'

export default function Grupo2() {
  const {
    cartasVolteadas,
    setCartasVolteadas,
    columnas,
    setColumnas,
    allowDrop,
    dragLeave
  } = useContext(GameContext)
  const [casas, setCasas] = useState([{}, {}, {}, {}])

  const drop = (e, ultimaCarta, posCasa) => {
    e.preventDefault()
    e.target.classList.remove('hover')
    const primeraCarta = JSON.parse(e.dataTransfer.getData('meju'))
    // console.log('ultima carta:', Object.keys(ultimaCarta).length)
    if (
      (primeraCarta?.color === ultimaCarta?.color &&
        primeraCarta?.tipo === ultimaCarta?.tipo &&
        primeraCarta?.numero - ultimaCarta?.numero === 1) ||
      (Object.keys(ultimaCarta).length === 0 && primeraCarta?.numero === 1)
    ) {
      const newCasas = [...casas]
      newCasas[posCasa] = primeraCarta
      setCasas(newCasas)
      // si la carta viene del grupo1
      if (primeraCarta.columna === 11) {
        const newCartasVolteadas = [...cartasVolteadas]
        newCartasVolteadas.pop()
        setCartasVolteadas(newCartasVolteadas)
      } else {
        // si la carta viene del grupo3
        const newColumnas = [...columnas]
        // Elimina la carta de la primera columna
        newColumnas[primeraCarta.columna].pop()
        voltearUltimaCartaDeColumna(primeraCarta.columna, columnas)
        // Actualiza el estado con la nueva disposición de las columnas
        setColumnas(newColumnas)
      }
    }
  }

  return (
    <div className="grupo2">
      {casas.map((carta, index) => (
        <div
          key={index}
          className="carta"
          data-columna={`2${index}`}
          data-numero={carta.numero}
          data-color={carta.color}
          data-tipo={carta.tipo}
          data-flipped={carta.flipped}
          onDrop={(e) => drop(e, carta, index)}
          onDragOver={(e) => allowDrop(e)}
          onDragLeave={(e) => dragLeave(e)}
        >
          {carta.img ? (
            <img src={carta.img} alt="carta" className="absolute img" />
          ) : null}
        </div>
      ))}
    </div>
  )
}
