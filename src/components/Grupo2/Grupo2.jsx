import { useContext, useState, useEffect } from 'react'
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
    console.log('ultima carta:', Object.keys(ultimaCarta).length)
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
        console.log('LA carta viene del grupo1')

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

    /*
    const primeraCarta = [JSON.parse(e.dataTransfer.getData('meju'))]
    const columnaInicial = JSON.parse(e.dataTransfer.getData('meju1'))
    console.log('DROP2 Grupo2 ---> primeraCarta: ', primeraCarta)

    let ultimaPosicionSelecionada = null
    // le quito el primer digito a columna
    const posicion = columna.toString().substring(1)
    // si ya hay una carta en la columna, la asigno a ultimaPosicionSelecionada
    if (
      casas[posicion] !== undefined &&
      Object.keys(casas[posicion]).length > 0
    ) {
      ultimaPosicionSelecionada = casas[posicion]
    }

    // intento hacer la condicion color tipo numero mayo q
    if (
      (primeraCarta[0]?.color === ultimaPosicionSelecionada?.color &&
        primeraCarta[0]?.tipo === ultimaPosicionSelecionada?.tipo &&
        primeraCarta[0]?.numero - ultimaPosicionSelecionada?.numero === 1) ||
      (ultimaPosicionSelecionada === null && primeraCarta[0]?.numero === 1)
    ) {
      const newCasas = [...casas]

      newCasas[posicion] = primeraCarta[0]

      // Actualiza el estado con la nueva copia que contiene los datos modificados
      setCasas(newCasas)

      if (primeraCarta[0].columna === 11) {
        const newCartasVolteadas = [...cartasVolteadas]
        newCartasVolteadas.pop()
        setCartasVolteadas(newCartasVolteadas)
      } else {
        const newColumnas = [...columnas]
        // Elimina la carta de la primera columna
        newColumnas[primeraCarta[0].columna].pop()
        voltearUltimaCartaDeColumna(columnaInicial, columnas)
        // Actualiza el estado con la nueva disposición de las columnas
        setColumnas(newColumnas)
      }
    } else {
      console.log('No coincide el color o el tipo')
    }
    */
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
          <img src={carta.img} alt="carta" className="absolute img" />
        </div>
      ))}
    </div>
  )
}
