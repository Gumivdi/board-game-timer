import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "./App.css";

import { Board } from "./components/Board/Board";
import { PlayersForm } from "./components/PlayersForm/PlayersForm";

function App() {
  const { gameRunning } = useSelector((state: RootState) => state.settings);
  return <>{gameRunning ? <Board /> : <PlayersForm />}</>;
}

export default App;
