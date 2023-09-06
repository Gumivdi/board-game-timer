import { useSelector } from "react-redux";
import "./Board.css";

import type { RootState } from "../../store/store";
import Timer from "../Timer/Timer";

export const Board = () => {
  const { players } = useSelector((state: RootState) => state.players);

  return (
    <div className="board">
      {players.map((player) => (
        <div style={{ display: "flex", alignItems: "center" }} key={player.id}>
          <Timer player={player} />
        </div>
      ))}
    </div>
  );
};
