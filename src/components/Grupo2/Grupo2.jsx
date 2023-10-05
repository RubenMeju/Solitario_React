import { useContext, useState } from 'react'
import './styles.css'
import { GameContext } from '../mesa/Mesa'
import { encontrarUltimaCartaEnCasilla } from '../../utils'

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

  const drop = (e, carta) => {
    e.preventDefault()
    const ultimaCartaDeLaCasilla = encontrarUltimaCartaEnCasilla(
      carta,
      columnas
    )
    console.log('ultima carta de la casilla', ultimaCartaDeLaCasilla)
    if (primeraCartaCliqueada && primeraCartaCliqueada.numero === 1) {
      const casasCopia = [...casas]

      // Establece datos en el primer elemento del array
      casasCopia[0] = primeraCartaCliqueada // Reemplaza esto con tus datos

      // Actualiza el estado con la nueva copia que contiene los datos modificados
      setCasas(casasCopia)
      if (primeraCartaCliqueada.casilla === 11) {
        const newCartasVolteadas = [...cartasVolteadas]
        newCartasVolteadas.pop()
        setCartasVolteadas(newCartasVolteadas)
      }
      const newColumnas = [...columnas]
      // Elimina la carta de la primera columna
      newColumnas[primeraCartaCliqueada.casilla].pop()

      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newColumnas)
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
          onDrop={(e) => drop(e)}
          onDragOver={(e) => allowDrop(e, carta)}
          // onClick={() => handleClick(carta)}
        >
          <img src={carta.img} alt="carta" className="pos-absolute" />
        </div>
      ))}
    </div>
  )
}
