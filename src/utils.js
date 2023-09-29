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
