import { useEffect, useContext, useState } from 'react'

import { GameContext } from '../mesa/Mesa'
import './styles.css'

export default function Grupo1() {
  const { isPlay, barajado } = useContext(GameContext)
  const [cartaPulsada, setCartaPulsada] = useState([])
  const [update, setUpdate] = useState(false)

  const [cartasVolteadas, setCartasVolteadas] = useState([])

  const handleClick = (carta) => {
    setUpdate(false)
    // console.log('carta cliequeada: ', carta)
    // console.log('barajado: ', barajado)
    // console.log('buscando carta: ', barajado[barajado.length - 1])
    // cartasVolteadas.push(barajado[barajado.length - 1])
    setCartasVolteadas((prevCartasVolteadas) => [...prevCartasVolteadas, carta])
    barajado.pop()
    console.log('cartasVolteadas: ', cartasVolteadas)
    console.log('barajado sin una carta', barajado)
    setUpdate(true)
  }
  useEffect(() => {
    console.log('useefect')
  }, [update])

  return (
    <div className="container">
      <section id="sacarCarta" className="section1">
        {barajado.map((carta, index) => (
          <div
            key={index}
            data-numero={carta.numero}
            data-color={carta.color}
            data-tipo={carta.tipo}
            data-flipped={carta.flipped}
            onClick={() => handleClick(carta)}
          >
            <img
              src={carta.flipped ? 'back.png' : carta.img}
              alt="carta"
              className="pos-absolute"
            />
          </div>
        ))}
      </section>
      <section className="section2">
        {cartasVolteadas.map((carta, index) => (
          <div key={index}>
            <img src={carta.img} alt="" className="pos-absolute" />
          </div>
        ))}
      </section>
    </div>
  )
}
