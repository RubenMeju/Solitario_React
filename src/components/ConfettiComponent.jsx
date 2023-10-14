import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'

const ConfettiComponent = () => {
  useEffect(() => {
    // Duración de la animación
    const duration = 3 * 1000
    const end = Date.now() + duration

    // Función para lanzar confeti
    function launchConfetti() {
      // Lanza confeti desde el borde izquierdo
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })

      // Lanza confeti desde el borde derecho
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })
    }

    // Función para realizar la animación
    function frame() {
      launchConfetti()

      // Continuar hasta que se agote el tiempo
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    // Iniciar la animación
    frame()
  }, [])

  return <div></div>
}

export default ConfettiComponent
