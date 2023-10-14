import { useState } from 'react'

export const useBaraja = () => {
  console.log('useBaraja')
  const [barajado, setBarajado] = useState([])
  const [columnas, setColumnas] = useState([])

  const tipos = ['corazones', 'diamantes', 'treboles', 'picas']
  const colores = {
    corazones: 'rojo',
    diamantes: 'rojo',
    treboles: 'negro',
    picas: 'negro'
  }

  const crearBarajaYDarCartas = () => {
    const baraja = []

    // Crear la baraja
    for (let i = 1; i <= 13; i++) {
      for (let j = 0; j < tipos.length; j++) {
        const carta = {
          id: i + '-' + tipos[j] + '-' + colores[tipos[j]],
          numero: i,
          color: colores[tipos[j]],
          tipo: tipos[j],
          img: `${i}_de_${tipos[j]}.png`,
          columna: 11,
          flipped: true
        }
        baraja.push(carta)
      }
    }

    // Barajar la baraja
    const cartasBarajadas = baraja
      .map((carta) => ({ carta, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ carta }) => carta)

    // Repartir las cartas en las columnas
    const nuevasColumnas = []
    for (let i = 0; i < 7; i++) {
      nuevasColumnas.push([])
      for (let j = 0; j < i + 1; j++) {
        const primeraCarta = cartasBarajadas.shift()
        primeraCarta.columna = i
        nuevasColumnas[i].push(primeraCarta)
      }
    }

    // Voltear la última carta de cada columna
    nuevasColumnas.forEach((columna) => {
      if (columna.length > 0) {
        columna[columna.length - 1].flipped = false
      }
    })

    // Actualizar el estado de barajado y columnas
    setBarajado(cartasBarajadas)
    setColumnas(nuevasColumnas)
  }

  return {
    barajado,
    setBarajado,
    columnas,
    setColumnas,
    crearBarajaYDarCartas
  }
}
