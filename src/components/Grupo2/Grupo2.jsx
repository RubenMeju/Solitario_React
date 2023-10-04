import { useContext, useState } from 'react'
import './styles.css'
import { GameContext } from '../mesa/Mesa'

export default function Grupo2() {
  const {
    primeraCartaCliqueada,
    setPrimeraCartaCliqueada,
    setCartasVolteadas,
    allowDrop
  } = useContext(GameContext)

  const [casa, setCasa] = useState([])

  const handleClick = () => {
    console.log('Casillas: ', primeraCartaCliqueada)
  }

  const drop = (ev) => {
    ev.preventDefault()

    console.log('drop grupo2', ev)
    if (primeraCartaCliqueada && primeraCartaCliqueada.numero === 1) {
      const data = ev.dataTransfer.getData('text')
      ev.target.appendChild(document.getElementById(data))
      console.log('se puede mover')
      setCasa((prevCasa) => [...prevCasa, primeraCartaCliqueada])
      setCartasVolteadas((prevCartasVolteadas) =>
        prevCartasVolteadas.filter(
          (cartasVolteadas) => cartasVolteadas !== primeraCartaCliqueada
        )
      )
      setPrimeraCartaCliqueada([])
    } else {
      console.log('no se puede mover')
    }
  }

  return (
    <div className="grupo2">
      <div
        className="carta"
        onClick={handleClick}
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
      >
        {casa.map((carta, index) => (
          <div
            key={index}
            data-numero={carta.numero}
            data-color={carta.color}
            data-tipo={carta.tipo}
            data-flipped={carta.flipped}
            onClick={() => handleClick(carta)}
          >
            <img src={carta.img} alt="carta" className="pos-absolute" />
          </div>
        ))}
      </div>
    </div>
  )
}
