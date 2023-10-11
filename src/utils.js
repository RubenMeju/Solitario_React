/* export const crearCartaHTML = (carta, handleClickCarta) => {
  const cartaHTML = document.createElement('div')
  const imagen = document.createElement('img')
  if (carta.flipped) {
    imagen.src = 'back.png'
  } else {
    imagen.src = carta.img
  }
  cartaHTML.dataset.numero = carta.numero
  cartaHTML.dataset.color = carta.color
  cartaHTML.dataset.tipo = carta.tipo

  cartaHTML.classList.add('pos-absolute')
  cartaHTML.onclick = () => handleClickCarta(cartaHTML)

  cartaHTML.appendChild(imagen)
  return cartaHTML
}
*/
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

  console.log('Dar cartas: ', columnas)
  return { barajado, columnas }
}

export const encontrarUltimaCartaEnColumna = (columnaIndex, cartas) => {
  // Verificamos si el índice de la columna es válido
  if (columnaIndex >= 0 && columnaIndex < cartas.length) {
    // Obtenemos la columna específica
    const columna = cartas[columnaIndex]

    // Verificamos si la columna tiene al menos una carta
    if (columna.length > 0) {
      // La última carta en la columna es la que se encuentra en la posición final del array
      return columna[columna.length - 1]
    }
  }

  // Si la columna no es válida o está vacía, podemos devolver un valor nulo o un mensaje de error, dependiendo de tu preferencia.
  return null // o 'No hay cartas en esta columna' u otro mensaje personalizado.
}

export function moverCartasAColumna(
  columnas,
  newColumnas,
  cartasMover,
  columna
) {
  cartasMover.forEach((item) => {
    newColumnas[item.columna].pop()
    item.columna = columna
    newColumnas[columna].push(item)
  })
}

export function voltearCarta(carta) {
  carta.flipped = false
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
