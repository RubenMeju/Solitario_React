import { useDispatch } from "react-redux";
import Grupo1 from "../Grupo1/Grupo1";
import Grupo2 from "../Grupo2/Grupo2";
import Grupo3 from "../Grupo3/Grupo3";
import {
  barajarCartas,
  prepararCartasGrupo1,
  prepararCartasGrupo3,
  crearBaraja,
  darCartas,
} from "../../redux/gameSlice";
export default function Mesa() {
  const dispatch = useDispatch();

  return (
    <div className="mesa">
      <button
        onClick={() => {
          dispatch(crearBaraja());
          dispatch(barajarCartas());
          dispatch(darCartas());
          dispatch(prepararCartasGrupo1());
          dispatch(prepararCartasGrupo3());
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
