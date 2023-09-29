import { useEffect } from 'react'
import { crearCartaHTML } from '../../utils'

export default function Grupo1({ barajado, isPlay }) {
  console.log('bajarado al iniciar', barajado)
  const prepararCartasGrupo1 = (barajado) => {
    for (let i = 0; i < barajado.length; i++) {
      const carta = barajado[i]
      const cartaHTML = crearCartaHTML(carta)
      const grupo1 = document.querySelector('#grupo1')
      grupo1.appendChild(cartaHTML)
    }
  }

  useEffect(() => {
    if (isPlay === true) {
      console.log('isplay grupo1: ', isPlay)
      prepararCartasGrupo1(barajado)
      console.log('barajado en useefect,', barajado)
    }
  }, [isPlay])

  return (
    <div id="grupo1" onClick={() => console.log('Carta pulsada')}>
      <img src="back.png" alt="" className="grupo1" />
    </div>
  )
}
