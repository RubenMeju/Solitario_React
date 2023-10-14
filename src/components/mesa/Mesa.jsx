import { useState, createContext } from 'react'
import Grupo1 from '../Grupo1/Grupo1'
import Grupo2 from '../Grupo2/Grupo2'
import Grupo3 from '../Grupo3/Grupo3'
import { useBaraja } from '../../hooks/useBaraja'

export const GameContext = createContext()

export default function Mesa() {
  const {
    barajado,
    setBarajado,
    columnas,
    setColumnas,
    crearBarajaYDarCartas
  } = useBaraja()
  console.log(barajado)
  console.log(columnas)
  const [cartasVolteadas, setCartasVolteadas] = useState([])
  const [casas, setCasas] = useState([{}, {}, {}, {}])

  // funciones para agregar hover
  const allowDrop = (e) => {
    e.preventDefault()
    e.target.classList.add('hover')
  }
  const dragLeave = (ev) => {
    ev.preventDefault()
    ev.target.classList.remove('hover')
  }

  return (
    <div className="mesa">
      <button
        onClick={() => {
          setCasas([{}, {}, {}, {}])
          setCartasVolteadas([])
          crearBarajaYDarCartas()
        }}
      >
        Nuevo juego
      </button>
      <GameContext.Provider
        value={{
          barajado,
          setBarajado,
          columnas,
          setColumnas,
          cartasVolteadas,
          setCartasVolteadas,
          casas,
          setCasas,
          allowDrop,
          dragLeave
        }}
      >
        <div className="fila1">
          <Grupo1 />

          <Grupo2 />
        </div>
        <Grupo3 />
      </GameContext.Provider>
    </div>
  )
}
