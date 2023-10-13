const barajaInicial = []
let barajado = []
const columnas = []
export const tipos = ['corazones', 'diamantes', 'treboles', 'picas']
const colores = {
  corazones: 'rojo',
  diamantes: 'rojo',
  treboles: 'negro',
  picas: 'negro'
}

export const crearBaraja = () => {
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
      barajaInicial.push(carta)
    }
  }
}

export const barajarCartas = () => {
  const cartasBarajadas = barajaInicial
    .map((carta) => ({ carta, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ carta }) => carta)
  barajado = cartasBarajadas
}

export const darCartas = () => {
  for (let i = 0; i < 7; i++) {
    columnas.push([])
    for (let j = 0; j < i + 1; j++) {
      const primeraCarta = barajado[0]
      primeraCarta.columna = i
      barajado.shift()
      columnas[i].push(primeraCarta)
    }
  }

  // set 'flipped' en 'false' para la última carta de cada columna
  columnas.forEach((columna) => {
    if (columna.length > 0) {
      columna[columna.length - 1].flipped = false
    }
  })

  return { barajado, columnas }
}

export function voltearUltimaCartaDeColumna(columnaInicial, columnas) {
  if (columnaInicial >= 0 && columnaInicial < columnas.length) {
    const columna = columnas[columnaInicial]

    if (columna.length > 0) {
      const ultimaCarta = columna[columna.length - 1]
      ultimaCarta.flipped = false
    } else {
      console.log('La columna está vacía, no hay cartas para voltear.')
    }
  } else {
    console.log('Número de columna no válido.')
  }
}

export function encontrarCartasEnColumna(arrayDeDatos, cartaSeleccionada) {
  const elementosEnColumna = []
  let found = false

  for (let i = 0; i < arrayDeDatos.length; i++) {
    const subArray = arrayDeDatos[i]

    for (let j = 0; j < subArray.length; j++) {
      if (subArray[j].id === cartaSeleccionada.id) {
        found = true
      }

      if (found) {
        elementosEnColumna.push(subArray[j])
      }
    }

    if (found) {
      break
    }
  }

  return elementosEnColumna
}
