import { useDispatch, useSelector } from "react-redux";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Button, IconButton, TextField } from "@mui/material";

import type { RootState } from "../../store/store";
import { add, remove, update } from "../../store/playersSlice";

export const PlayersForm = () => {
  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { limit, players } = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>
        Gracze ({players.length}/{limit})
      </h1>
      <form
        onSubmit={onFormSubmitHandler}
        style={{ display: "grid", gap: "12px" }}
      >
        {players.map((player) => (
          <div
            style={{ display: "flex", alignItems: "center" }}
            key={player.id}
          >
            <TextField
              label="Nazwa gracza"
              type="text"
              variant="outlined"
              value={player.name}
              onChange={(e) =>
                dispatch(
                  update({
                    id: player.id,
                    data: { key: "name", value: e.target.value },
                  })
                )
              }
            />
            <input
              style={{ height: "56px", marginRight: "10px" }}
              type="color"
              value={player.color}
              onChange={(e) =>
                dispatch(
                  update({
                    id: player.id,
                    data: { key: "color", value: e.target.value },
                  })
                )
              }
            />

            {player.id !== players.at(-1)?.id && (
              <IconButton
                aria-label="Usuń gracza"
                onClick={() => dispatch(remove(player.id))}
              >
                <PersonRemoveIcon />
              </IconButton>
            )}
            {players.length < limit && player.id === players.at(-1)?.id && (
              <IconButton
                aria-label="Dodaj gracza"
                onClick={() => dispatch(add())}
              >
                <PersonAddAlt1Icon />
              </IconButton>
            )}
          </div>
        ))}

        <Button
          variant="contained"
          disabled={!!players.filter((player) => player.name === "").length}
        >
          Rozpocznij
        </Button>
      </form>
    </div>
  );
};
