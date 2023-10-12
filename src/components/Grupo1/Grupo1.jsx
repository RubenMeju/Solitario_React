import { useContext, useState } from 'react'
import { GameContext } from '../mesa/Mesa'
import './styles.css'

export default function Grupo1() {
  const {
    barajado,
    setBarajado,
    cartasVolteadas,
    setCartasVolteadas,
    allowDrop
  } = useContext(GameContext)
  const [primeraCartaCliqueada, setPrimeraCartaCliqueada] = useState(null)

  const volterCarta = (carta) => {
    setPrimeraCartaCliqueada([])
    // añado la carta cliqueada a cartas volteadas
    setCartasVolteadas((prevCartasVolteadas) => [...prevCartasVolteadas, carta])
    // quito la carta cliqueada a barajado
    setBarajado((prevBarajado) =>
      prevBarajado.filter((barajado) => barajado !== carta)
    )
  }

  const resetearCartas = () => {
    if (barajado.length === 0) {
      // console.log('resetear cartas', barajado)
      setBarajado(cartasVolteadas)
      setCartasVolteadas([])
    }
  }
  const drag = (e, carta) => {
    console.log('drag1 carta: ', carta)
    e.dataTransfer.setData('meju', JSON.stringify(carta))
    setPrimeraCartaCliqueada(carta)
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
              data-casilla={11}
              data-numero={carta.numero}
              data-color={carta.color}
              data-tipo={carta.tipo}
              data-flipped={carta.flipped}
              onClick={() => volterCarta(carta)}
            >
              <img src="back.png" alt="carta" className="absolute img" />
            </div>
          ))}
      </section>
      <section className="section2">
        {cartasVolteadas.map((carta, index) => (
          <div
            id="div1"
            //   onDrop={(e) => drop(e)}
            onDragOver={(e) => allowDrop(e)}
            key={index}
            data-casilla={11}
            data-numero={carta.numero}
            data-color={carta.color}
            data-tipo={carta.tipo}
            data-flipped={carta.flipped}
          >
            <img
              src={carta.img}
              alt="carta-volteada"
              className="absolute img"
              style={{
                border:
                  primeraCartaCliqueada === carta ? '2px solid red' : 'none'
              }}
              draggable={true}
              onDragStart={(e) => drag(e, carta)}
              id="drag1"
            />
          </div>
        ))}
      </section>
    </div>
  )
}
