import { useState, createContext, useEffect } from 'react'
import Grupo1 from '../Grupo1/Grupo1'
import Grupo2 from '../Grupo2/Grupo2'
import Grupo3 from '../Grupo3/Grupo3'
import { barajarCartas, crearBaraja, darCartas } from '../../utils'

export const GameContext = createContext()

export default function Mesa() {
  const [isPlay, setIsPlay] = useState(false)
  const [barajado, setBarajado] = useState([])
  const [columnas, setColumnas] = useState([])
  const [primeraCartaCliqueada, setPrimeraCartaCliqueada] = useState(null)

  useEffect(() => {
    if (isPlay) {
      crearBaraja()
      barajarCartas()
      const { barajado, columnas } = darCartas()
      setBarajado(barajado)
      setColumnas(columnas)
    }
  }, [isPlay])
  /*
  useEffect(() => {
    // console.log('useEffect mesa 2')

    if (barajado.length > 0) {
      darCartas(barajado, columnas, setColumnas)
    }
  }, [barajado])
*/
  return (
    <div className="mesa">
      <button
        onClick={() => {
          setIsPlay(true)
        }}
      >
        Empezar
      </button>
      <GameContext.Provider
        value={{
          isPlay,
          barajado,
          setBarajado,
          columnas,
          setColumnas,
          primeraCartaCliqueada,
          setPrimeraCartaCliqueada
        }}
      >
        <div className="fila1">
          <Grupo1 />

          <Grupo2 />
        </div>
      </GameContext.Provider>
    </div>
  )
}
