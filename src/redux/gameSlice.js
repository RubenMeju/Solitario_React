import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mazo: [],
  barajado: [],
  columnas: [],

  tipos: ["corazones", "diamantes", "treboles", "picas"],
  colores: {
    corazones: "rojo",
    diamantes: "rojo",
    treboles: "negro",
    picas: "negro",
  },
};

const crearCartaHTML = (carta) => {
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

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    crearBaraja: (state) => {
      for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < state.tipos.length; j++) {
          const carta = {
            numero: i,
            color: state.colores[state.tipos[j]],
            tipo: state.tipos[j],
            img: `${i}_de_${state.tipos[j]}.png`,
            flipped: true,
          };
          state.mazo.push(carta);
          //console.log("mazo: ", mazo);
        }
      }
    },
    barajarCartas: (state) => {
      state.barajado = state.mazo
        .map((carta) => ({ carta, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ carta }) => carta);
      //console.log("funcion barajarCartas: ", state.barajado);
    },
    darCartas: (state) => {
      for (let i = 0; i < 7; i++) {
        state.columnas.push([]);
        for (let j = 0; j < i + 1; j++) {
          const primeraCarta = state.barajado[0];
          state.barajado.shift();
          state.columnas[i].push(primeraCarta);
        }
      }
    },
    prepararCartasGrupo1: (state) => {
      for (let i = 0; i < state.barajado.length; i++) {
        const carta = state.barajado[i];
        const cartaHTML = crearCartaHTML(carta);
        const grupo1 = document.querySelector("#grupo1");
        grupo1.appendChild(cartaHTML);
      }
    },

    prepararCartasGrupo3: (state) => {
      for (let i = 0; i < state.columnas.length; i++) {
        const columna = document.querySelector(`#columna-${i}`);
        for (let j = 0; j < state.columnas[i].length; j++) {
          const finalColumna = j === state.columnas[i].length - 1;
          const carta = state.columnas[i][j];
          if (finalColumna) {
            carta.flipped = false;
          }

          const cartaHTML = crearCartaHTML(carta);

          cartaHTML.style.top = `${j * 30}px`;

          columna.appendChild(cartaHTML);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  crearBaraja,
  barajarCartas,
  darCartas,
  prepararCartasGrupo1,
  prepararCartasGrupo3,
} = gameSlice.actions;

export default gameSlice.reducer;
