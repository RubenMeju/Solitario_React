import Grupo1 from "../Grupo1/Grupo1";
import Grupo2 from "../Grupo2/Grupo2";
import Grupo3 from "../Grupo3/Grupo3";
import "./mesa.css";
export default function Mesa() {
  const mazo = [];
  let barajado = [];
  let columnas = [];

  const tipos = ["corazones", "diamantes", "treboles", "picas"];
  const colores = {
    corazones: "rojo",
    diamantes: "rojo",
    treboles: "negro",
    picas: "negro",
  };

  const crearBaraja = () => {
    for (let i = 1; i <= 13; i++) {
      for (let j = 0; j < tipos.length; j++) {
        const carta = {
          numero: i,
          color: colores[tipos[j]],
          tipo: tipos[j],
          img: `${i}_de_${tipos[j]}.png`,
        };
        mazo.push(carta);
        //console.log("mazo: ", mazo);
      }
    }
  };

  const barajarCartas = () => {
    barajado = mazo
      .map((carta) => ({ carta, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ carta }) => carta);
  };

  const darCartas = () => {
    for (let i = 0; i < 7; i++) {
      columnas.push([]);
      for (let j = 0; j < i + 1; j++) {
        const primeraCarta = barajado[0];
        barajado.shift();
        columnas[i].push(primeraCarta);
      }
    }
    console.log(barajado);
    console.log(columnas);
  };

  const colocarCartas = () => {
    for (let i = 0; i < columnas.length; i++) {
      const columna = document.querySelector(`#columna-${i}`);
      for (let j = 0; j < columnas[i].length; j++) {
        const carta = columnas[i][j];

        const cartaHTML = document.createElement("div");
        const imagen = document.createElement("img");
        imagen.src = carta.img;
        cartaHTML.appendChild(imagen);
        columna.appendChild(cartaHTML);
      }
    }
  };

  return (
    <div className="mesa">
      <button
        onClick={() => {
          crearBaraja();
          barajarCartas();
          darCartas();
          colocarCartas();
        }}
      >
        Empezar
      </button>
      <div className="fila1">
        <Grupo1 />
        <Grupo2 />
      </div>
      <Grupo3 />
    </div>
  );
}
