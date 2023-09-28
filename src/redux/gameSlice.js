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
    colocarCartas: (state) => {
      for (let i = 0; i < state.columnas.length; i++) {
        const columna = document.querySelector(`#columna-${i}`);
        for (let j = 0; j < state.columnas[i].length; j++) {
          const finalColumna = j === state.columnas[i].length - 1;
          const carta = state.columnas[i][j];

          const cartaHTML = document.createElement("div");
          const imagen = document.createElement("img");

          if (finalColumna) {
            carta.flipped = false;
          }

          if (carta.flipped) {
            imagen.src = "back.png";
          } else {
            imagen.src = carta.img;
          }

          cartaHTML.classList.add("pos-absolute");
          cartaHTML.style.top = `${j * 30}px`;
          cartaHTML.appendChild(imagen);
          columna.appendChild(cartaHTML);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { crearBaraja, barajarCartas, darCartas, colocarCartas } =
  gameSlice.actions;

export default gameSlice.reducer;
