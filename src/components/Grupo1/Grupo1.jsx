import { useContext, useState } from 'react'
import { GameContext } from '../mesa/Mesa'
import './styles.css'

export default function Grupo1() {
  const { barajado, setBarajado } = useContext(GameContext)
  const [cartasVolteadas, setCartasVolteadas] = useState([])

  const handleClick = (carta) => {
    setCartasVolteadas((prevCartasVolteadas) => [...prevCartasVolteadas, carta])
    setBarajado((prevBarajado) =>
      prevBarajado.filter((barajado) => barajado !== carta)
    )
  }

  const resetearCartas = () => {
    console.log('meju valor barajado lenth', barajado.length > 0)
    if (barajado.length === 0) {
      console.log('resetear cartas', barajado)
      setBarajado(cartasVolteadas)
      setCartasVolteadas([])
    }
  }

  return (
    <div className="container">
      <section id="sacarCarta" className="section1" onClick={resetearCartas}>
        {barajado
          .slice()
          .reverse()
          .map((carta, index) => (
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
            <img
              src={carta.img}
              alt="carta-volteada"
              className="pos-absolute"
            />
          </div>
        ))}
      </section>
    </div>
  )
}
