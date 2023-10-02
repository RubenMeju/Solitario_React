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
    setPrimeraCartaCliqueada
  } = useContext(GameContext)

  const handleClick = (carta) => {
    setPrimeraCartaCliqueada([])
    console.log('la carta q clikeo: ', carta)
    console.log('la primera carta cliqueada', primeraCartaCliqueada)

    setCartasVolteadas((prevCartasVolteadas) => [...prevCartasVolteadas, carta])
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
              <img src="back.png" alt="carta" className="pos-absolute" />
            </div>
          ))}
      </section>
      <section className="section2">
        {cartasVolteadas.map((carta, index) => (
          <div
            key={index}
            data-numero={carta.numero}
            data-color={carta.color}
            data-tipo={carta.tipo}
            data-flipped={carta.flipped}
            onClick={() => setPrimeraCartaCliqueada(carta)}
          >
            <img
              src={carta.img}
              alt="carta-volteada"
              className="pos-absolute"
              style={{
                border:
                  primeraCartaCliqueada === carta ? '2px solid red' : 'none'
              }}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
