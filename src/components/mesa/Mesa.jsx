import { useState, createContext } from 'react'
import Grupo1 from '../Grupo1/Grupo1'
import Grupo2 from '../Grupo2/Grupo2'
import Grupo3 from '../Grupo3/Grupo3'
import { useBaraja } from '../../hooks/useBaraja'
import ConfettiComponent from '../ConfettiComponent'

export const GameContext = createContext()

function todasColumnasVacias(matriz) {
  for (let i = 0; i < matriz.length; i++) {
    if (matriz[i].length > 0) {
      return false // Si al menos una columna no está vacía, retornar falso.
    }
  }
  return true // Si todas las columnas están vacías, retornar verdadero.
}

export default function Mesa() {
  const [isplay, setIsplay] = useState(false)
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

  console.log('barajado: ', barajado)
  console.log('cartasVolteadas: ', cartasVolteadas)
  console.log('casas: ', casas)
  console.log('las columnasÇ: ', columnas)
  return (
    <div className="mesa">
      <button
        onClick={() => {
          setIsplay(false)
          setCasas([{}, {}, {}, {}])
          setCartasVolteadas([])
          crearBarajaYDarCartas()
          setIsplay(true)
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

        {isplay &&
        barajado.length === 0 &&
        cartasVolteadas.length === 0 &&
        todasColumnasVacias(columnas) ? (
          <ConfettiComponent />
        ) : null}
      </GameContext.Provider>
    </div>
  )
}
