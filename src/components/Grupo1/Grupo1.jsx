import { useEffect, useContext, useState } from 'react'
import { crearCartaHTML } from '../../utils'
import { GameContext } from '../mesa/Mesa'

export default function Grupo1() {
  const { isPlay, barajado } = useContext(GameContext)

  const [update, setUpdate] = useState(false)

  const handleClickCarta = () => {}
  const prepararCartasGrupo1 = () => {
    // barajado.innerHTML = ''
    for (let i = 0; i < barajado.length; i++) {
      const carta = barajado[i]
      const cartaHTML = crearCartaHTML(carta, handleClickCarta)
      const grupo1 = document.querySelector('#sacarCarta')
      grupo1.appendChild(cartaHTML)
    }
  }

  useEffect(() => {
    if (barajado.length > 0) {
      console.log('isplay grupo1: ', isPlay)
      prepararCartasGrupo1()
      console.log('barajado en useefect,', barajado)
    }
  }, [barajado, update])

  return (
    <div id="grupo1" onClick={() => console.log('Carta pulsada')}>
      <section id="sacarCarta" className="carta"></section>
      <section id="cartaElegida"></section>
    </div>
  )
}
