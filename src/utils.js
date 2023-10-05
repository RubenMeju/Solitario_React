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
        casilla: 0,
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
      primeraCarta.casilla = i
      barajado.shift()
      columnas[i].push(primeraCarta)
    }
  }
  // console.log('Dar cartas: ', columnas)
  return { barajado, columnas }
}

export const encontrarUltimaCartaEnCasilla = (casillaIndex, cartas) => {
  // Verificamos si el índice de la casilla es válido
  if (casillaIndex >= 0 && casillaIndex < cartas.length) {
    // Obtenemos la casilla específica
    const casilla = cartas[casillaIndex]

    // Verificamos si la casilla tiene al menos una carta
    if (casilla.length > 0) {
      // La última carta en la casilla es la que se encuentra en la posición final del array
      return casilla[casilla.length - 1]
    }
  }

  // Si la casilla no es válida o está vacía, podemos devolver un valor nulo o un mensaje de error, dependiendo de tu preferencia.
  return null // o 'No hay cartas en esta casilla' u otro mensaje personalizado.
}
