import { useState } from 'react'
import Grupo1 from '../Grupo1/Grupo1'
import Grupo2 from '../Grupo2/Grupo2'
import Grupo3 from '../Grupo3/Grupo3'

const mazo = []
let barajado = []
const columnas = []
const primeraCartaCliqueada = null

const tipos = ['corazones', 'diamantes', 'treboles', 'picas']
const colores = {
  corazones: 'rojo',
  diamantes: 'rojo',
  treboles: 'negro',
  picas: 'negro'
}

const crearBaraja = () => {
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < tipos.length; j++) {
      const carta = {
        numero: i,
        color: colores[tipos[j]],
        tipo: tipos[j],
        img: `${i}_de_${tipos[j]}.png`,
        flipped: true
      }
      mazo.push(carta)
      // console.log("mazo: ", mazo);
    }
  }
  console.log('valor mazo: ', mazo)
}

const barajarCartas = () => {
  barajado = mazo
    .map((carta) => ({ carta, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ carta }) => carta)
  console.log('Valor barajado: ', barajado)
}
const darCartas = () => {
  for (let i = 0; i < 7; i++) {
    columnas.push([])
    for (let j = 0; j < i + 1; j++) {
      const primeraCarta = barajado[0]
      barajado.shift()
      columnas[i].push(primeraCarta)
    }
  }
  console.log('Dar cartas: ', columnas)
}

export default function Mesa() {
  const [isPlay, setIsPlay] = useState(false)
  return (
    <div className="mesa">
      <button
        onClick={() => {
          crearBaraja()
          barajarCartas()
          darCartas()
          setIsPlay(true)
        }}
      >
        Empezar
      </button>
      <div className="fila1">
        <Grupo1 barajado={barajado} isPlay={isPlay} />
        <Grupo2 />
      </div>
      <Grupo3
        columnas={columnas}
        isPlay={isPlay}
        primeraCartaCliqueada={primeraCartaCliqueada}
      />
    </div>
  )
}
