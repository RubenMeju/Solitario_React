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
    console.log('la casilla es: ', casilla)
    e.preventDefault()
    // le quito el primer digito a casilla
    const posicion = casilla.toString().substring(1)
    console.log('posicion: ', posicion)
    // compruebo cual es la ultima carta de la casilla (posicion)
    if (
      casas[posicion] !== undefined &&
      Object.keys(casas[posicion]).length > 0
    ) {
      console.log(casas[posicion])
    }
    if (primeraCartaCliqueada && primeraCartaCliqueada.numero === 1) {
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
      console.log('no se puede mover')
    }
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
