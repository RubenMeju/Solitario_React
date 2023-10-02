export const crearCartaHTML = (carta, handleClickCarta) => {
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

const barajaInicial = []
let barajado = []
const columnas = []
const tipos = ['corazones', 'diamantes', 'treboles', 'picas']
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
      barajado.shift()
      columnas[i].push(primeraCarta)
    }
  }
  console.log('Dar cartas: ', columnas)
  return { barajado, columnas }
}
