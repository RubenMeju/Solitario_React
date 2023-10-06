import { useContext, useState } from 'react'
import './styles.css'
import { GameContext } from '../mesa/Mesa'

export default function Grupo2() {
  const {
    primeraCartaCliqueada,
    setPrimeraCartaCliqueada,
    allowDrop,
    cartasVolteadas,
    setCartasVolteadas,
    columnas,
    setColumnas
  } = useContext(GameContext)
  const [casas, setCasas] = useState([{}, {}, {}, {}])

  const drop = (e, casilla) => {
    e.preventDefault()
    let ultimaPosicionSelecionada = null
    // le quito el primer digito a casilla
    const posicion = casilla.toString().substring(1)
    // si ya hay una carta en la casilla, la asigno a ultimaPosicionSelecionada
    if (
      casas[posicion] !== undefined &&
      Object.keys(casas[posicion]).length > 0
    ) {
      ultimaPosicionSelecionada = casas[posicion]
      console.log('ya hay una carta en el destino', ultimaPosicionSelecionada)
    }

    console.log('aquiiiii ultima posicion', ultimaPosicionSelecionada)

    // intento hacer la condicion color tipo numero mayo q
    if (
      (primeraCartaCliqueada.color === ultimaPosicionSelecionada?.color &&
        primeraCartaCliqueada.tipo === ultimaPosicionSelecionada?.tipo &&
        primeraCartaCliqueada.numero - ultimaPosicionSelecionada?.numero ===
          1) ||
      (ultimaPosicionSelecionada === null && primeraCartaCliqueada.numero === 1)
    ) {
      console.log(
        'el color y el tipo coinciden y la carta a añadir es mayor en 1'
      )
      const newCasas = [...casas]

      newCasas[posicion] = primeraCartaCliqueada

      // Actualiza el estado con la nueva copia que contiene los datos modificados
      setCasas(newCasas)

      if (primeraCartaCliqueada.casilla === 11) {
        const newCartasVolteadas = [...cartasVolteadas]
        newCartasVolteadas.pop()
        setCartasVolteadas(newCartasVolteadas)
      } else {
        const newColumnas = [...columnas]
        // Elimina la carta de la primera columna
        newColumnas[primeraCartaCliqueada.casilla].pop()
        // Actualiza el estado con la nueva disposición de las columnas
        setColumnas(newColumnas)
      }

      setPrimeraCartaCliqueada([])
    } else {
      console.log('No coincide el color o el tipo')
    }

    console.log('ultima carta selecionada', ultimaPosicionSelecionada)
  }
  console.log('casas: ', casas)
  return (
    <div className="grupo2">
      {casas.map((carta, index) => (
        <div
          key={index}
          className="carta"
          data-casilla={`2${index}`}
          data-numero={carta.numero}
          data-color={carta.color}
          data-tipo={carta.tipo}
          data-flipped={carta.flipped}
          onDrop={(e) => drop(e, `2${index}`)}
          onDragOver={(e) => allowDrop(e)}
          // onClick={() => handleClick(carta)}
        >
          <img src={carta.img} alt="carta" className="pos-absolute" />
        </div>
      ))}
    </div>
  )
}
