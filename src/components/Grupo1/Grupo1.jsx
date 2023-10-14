import { useContext } from 'react'
import { GameContext } from '../mesa/Mesa'
import './styles.css'
import sound1 from '../../assets/carta.mp3'

export default function Grupo1() {
  const {
    barajado,
    setBarajado,
    cartasVolteadas,
    setCartasVolteadas,
    allowDrop
  } = useContext(GameContext)

  const volterCarta = (carta) => {
    const music = document.querySelector('#music')
    music.volume = 0.1
    music.play()
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
  }

  return (
    <div className="container">
      <audio id="music" src={sound1}></audio>
      <section id="sacarCarta" className="carta" onClick={resetearCartas}>
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
              draggable={true}
              onDragStart={(e) => drag(e, carta)}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
