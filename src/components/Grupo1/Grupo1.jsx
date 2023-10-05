import { useContext } from 'react'
import { GameContext } from '../mesa/Mesa'
import './styles.css'

export default function Grupo1() {
  const {
    barajado,
    setBarajado,
    cartasVolteadas,
    setCartasVolteadas,
    primeraCartaCliqueada,
    setPrimeraCartaCliqueada,
    allowDrop,
    drop
  } = useContext(GameContext)

  const volterCarta = (carta) => {
    setPrimeraCartaCliqueada([])
    // console.log('la carta q clikeo: ', carta)
    //  console.log('la primera carta cliqueada', primeraCartaCliqueada)

    // añado la carta cliqueada a cartas volteadas
    setCartasVolteadas((prevCartasVolteadas) => [...prevCartasVolteadas, carta])
    // quito la carta cliqueada a barajado
    setBarajado((prevBarajado) =>
      prevBarajado.filter((barajado) => barajado !== carta)
    )
  }

  const resetearCartas = () => {
    if (barajado.length === 0) {
      console.log('resetear cartas', barajado)
      setBarajado(cartasVolteadas)
      setCartasVolteadas([])
    }
  }
  const drag = (ev, carta) => {
    ev.dataTransfer.setData('text', carta)
    setPrimeraCartaCliqueada(carta)
  }

  // console.log('Barajado', barajado)
  // console.log('cartasVolteadas', cartasVolteadas)

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
              <img src="back.png" alt="carta" className="pos-absolute" />
            </div>
          ))}
      </section>
      <section className="section2">
        {cartasVolteadas.map((carta, index) => (
          <div
            id="div1"
            onDrop={(e) => drop(e)}
            onDragOver={(e) => allowDrop(e)}
            key={index}
            data-casilla={11}
            data-numero={carta.numero}
            data-color={carta.color}
            data-tipo={carta.tipo}
            data-flipped={carta.flipped}
            // onClick={() => setPrimeraCartaCliqueada(carta)}
          >
            <img
              src={carta.img}
              alt="carta-volteada"
              className="pos-absolute"
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
