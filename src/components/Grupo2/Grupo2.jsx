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

  const drop = (e, columna) => {
    e.preventDefault()
    e.target.classList.remove('hover')
    const cartaAcasa = JSON.parse(e.dataTransfer.getData('meju'))
    const columnaInicial = JSON.parse(e.dataTransfer.getData('meju1'))
    console.log('DROP2 Grupo2 ---> cartaAcasa: ', cartaAcasa)

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
      (cartaAcasa[0]?.color === ultimaPosicionSelecionada?.color &&
        cartaAcasa[0]?.tipo === ultimaPosicionSelecionada?.tipo &&
        cartaAcasa[0]?.numero - ultimaPosicionSelecionada?.numero === 1) ||
      (ultimaPosicionSelecionada === null && cartaAcasa[0]?.numero === 1)
    ) {
      const newCasas = [...casas]

      newCasas[posicion] = cartaAcasa[0]

      // Actualiza el estado con la nueva copia que contiene los datos modificados
      setCasas(newCasas)

      if (cartaAcasa[0].columna === 11) {
        const newCartasVolteadas = [...cartasVolteadas]
        newCartasVolteadas.pop()
        setCartasVolteadas(newCartasVolteadas)
      } else {
        const newColumnas = [...columnas]
        // Elimina la carta de la primera columna
        newColumnas[cartaAcasa[0].columna].pop()
        voltearUltimaCartaDeColumna(columnaInicial, columnas)
        // Actualiza el estado con la nueva disposición de las columnas
        setColumnas(newColumnas)
      }
    } else {
      console.log('No coincide el color o el tipo')
    }
  }

  useEffect(() => {
    console.log('Se vuelve a cargar el componente:', columnas)
  }, [columnas])

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
          onDrop={(e) => drop(e, `2${index}`)}
          onDragOver={(e) => allowDrop(e)}
          onDragLeave={(e) => dragLeave(e)}
        >
          <img src={carta.img} alt="carta" className="pos-absolute" />
        </div>
      ))}
    </div>
  )
}
