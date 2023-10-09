import { useContext, useState } from 'react'
import './styles.css'
import { GameContext } from '../mesa/Mesa'

export default function Grupo2() {
  const {
    primeraCartaCliqueada,
    setPrimeraCartaCliqueada,
    cartasVolteadas,
    setCartasVolteadas,
    columnas,
    setColumnas,
    allowDrop,
    dragLeave
  } = useContext(GameContext)
  const [casas, setCasas] = useState([{}, {}, {}, {}])

  const drop = (e, casilla) => {
    e.preventDefault()
    e.target.classList.remove('hover')

    let ultimaPosicionSelecionada = null
    // le quito el primer digito a casilla
    const posicion = casilla.toString().substring(1)
    // si ya hay una carta en la casilla, la asigno a ultimaPosicionSelecionada
    if (
      casas[posicion] !== undefined &&
      Object.keys(casas[posicion]).length > 0
    ) {
      ultimaPosicionSelecionada = casas[posicion]
    }

    // intento hacer la condicion color tipo numero mayo q
    if (
      (primeraCartaCliqueada.color === ultimaPosicionSelecionada?.color &&
        primeraCartaCliqueada.tipo === ultimaPosicionSelecionada?.tipo &&
        primeraCartaCliqueada.numero - ultimaPosicionSelecionada?.numero ===
          1) ||
      (ultimaPosicionSelecionada === null && primeraCartaCliqueada.numero === 1)
    ) {
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
  }
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
          onDragLeave={(e) => dragLeave(e)}
        >
          <img src={carta.img} alt="carta" className="pos-absolute" />
        </div>
      ))}
    </div>
  )
}
