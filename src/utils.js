export const crearCartaHTML = (carta) => {
  const cartaHTML = document.createElement("div");
  const imagen = document.createElement("img");
  if (carta.flipped) {
    imagen.src = "back.png";
  } else {
    imagen.src = carta.img;
  }
  cartaHTML.classList.add("pos-absolute");
  cartaHTML.appendChild(imagen);
  return cartaHTML;
};
