import { useContext, useState } from 'react'
import './styles.css'
import { GameContext } from '../mesa/Mesa'
import { tipos } from '../../utils'

export default function Grupo2() {
  const {
    primeraCartaCliqueada,
    setPrimeraCartaCliqueada,
    setCartasVolteadas,
    allowDrop,
    columnas,
    setColumnas
  } = useContext(GameContext)
  const [corazones, setCorazones] = useState([])
  const [diamantes, setDiamantes] = useState([])
  const [treboles, setTreboles] = useState([])
  const [picas, setPicas] = useState([])

  const drop = (ev, tipo) => {
    ev.preventDefault()

    // console.log('drop grupo2', tipo)
    // console.log('cual es la carta clickeada: ', primeraCartaCliqueada)
    if (
      primeraCartaCliqueada &&
      primeraCartaCliqueada.numero === 1 &&
      primeraCartaCliqueada.tipo === tipo
    ) {
      console.log('se puede mover')
      if (tipo === 'treboles') {
        console.log('IF DE TREBOLES')
        setTreboles((prevTreboles) => [...prevTreboles, primeraCartaCliqueada])
        setCartasVolteadas((prevCartasVolteadas) =>
          prevCartasVolteadas.filter(
            (cartasVolteadas) => cartasVolteadas !== primeraCartaCliqueada
          )
        )
      } else if (tipo === 'diamantes') {
        console.log('IF DE DIAMANTES')
        setDiamantes((prevDiamantes) => [
          ...prevDiamantes,
          primeraCartaCliqueada
        ])
        setCartasVolteadas((prevCartasVolteadas) =>
          prevCartasVolteadas.filter(
            (cartasVolteadas) => cartasVolteadas !== primeraCartaCliqueada
          )
        )
      } else if (tipo === 'picas') {
        console.log('IF DE PICAS')
        setPicas((prevPicas) => [...prevPicas, primeraCartaCliqueada])
        setCartasVolteadas((prevCartasVolteadas) =>
          prevCartasVolteadas.filter(
            (cartasVolteadas) => cartasVolteadas !== primeraCartaCliqueada
          )
        )
      } else if (tipo === 'corazones') {
        console.log('IF DE CORAZONES')
        setCorazones((prevCorazones) => [
          ...prevCorazones,
          primeraCartaCliqueada
        ])
        setCartasVolteadas((prevCartasVolteadas) =>
          prevCartasVolteadas.filter(
            (cartasVolteadas) => cartasVolteadas !== primeraCartaCliqueada
          )
        )
      }
      const newState = [...columnas]
      // Mueve la carta de la primera columna a la segunda columna
      newState[primeraCartaCliqueada.columna].pop() // Elimina la carta de la primera columna
      // ultimaCartaDeLaColumna.flipped = false
      // newState[ultimaCartaDeLaColumna.columna].push(cartaMovida) // Agrega la carta a la segunda columna
      console.log('newstate :', newState)
      // Actualiza el estado con la nueva disposición de las columnas
      setColumnas(newState)
      setPrimeraCartaCliqueada([])
    } else {
      console.log('no se puede mover')
    }
  }

  return (
    <div className="grupo2">
      {tipos.map((tipo) => (
        <div
          key={tipo}
          id={tipo}
          className="carta"
          data-tipo={tipo}
          //   onClick={handleClick}
          onDrop={(e) => drop(e, tipo)}
          onDragOver={(e) => allowDrop(e)}
        >
          {tipo}
          {/* Mapeo de todas las cartas independientemente de su tipo */}
          {tipo === 'corazones' &&
            corazones.map((carta, index) => (
              <div
                key={index}
                data-numero={carta.numero}
                data-color={carta.color}
                data-tipo={carta.tipo}
                data-flipped={carta.flipped}
                // onClick={() => handleClick(carta)}
              >
                <img src={carta.img} alt="carta" className="pos-absolute" />
              </div>
            ))}
          {tipo === 'diamantes' &&
            diamantes.map((carta, index) => (
              <div
                key={index}
                data-numero={carta.numero}
                data-color={carta.color}
                data-tipo={carta.tipo}
                data-flipped={carta.flipped}
                // onClick={() => handleClick(carta)}
              >
                <img src={carta.img} alt="carta" className="pos-absolute" />
              </div>
            ))}
          {tipo === 'treboles' &&
            treboles.map((carta, index) => (
              <div
                key={index}
                data-numero={carta.numero}
                data-color={carta.color}
                data-tipo={carta.tipo}
                data-flipped={carta.flipped}
                // onClick={() => handleClick(carta)}
              >
                <img src={carta.img} alt="carta" className="pos-absolute" />
              </div>
            ))}
          {tipo === 'picas' &&
            picas.map((carta, index) => (
              <div
                key={index}
                data-numero={carta.numero}
                data-color={carta.color}
                data-tipo={carta.tipo}
                data-flipped={carta.flipped}
                // onClick={() => handleClick(carta)}
              >
                <img src={carta.img} alt="carta" className="pos-absolute" />
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
