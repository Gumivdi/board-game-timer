import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface IPlayer {
  id: string;
  name: string;
  color: string;
  timer: number;
}

export interface IPlayersState {
  limit: number;
  players: IPlayer[];
}

export type PlayerKeys = keyof IPlayer;

const initialState: IPlayersState = {
  limit: 5,
  players: [{ id: uuid(), name: "", color: "#000000", timer: 0 }],
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    add: (state) => {
      state.players.push({
        id: uuid(),
        name: "",
        color: "#000000",
        timer: 0,
      });
    },
    remove: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload
      );
    },
    update: (
      state,
      action: PayloadAction<{
        id: string;
        data: { key: PlayerKeys; value: IPlayer[PlayerKeys] };
      }>
    ) => {
      const playerIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      state.players[playerIndex] = {
        ...state.players[playerIndex],
        [action.payload.data.key]: action.payload.data.value,
      };
    },
  },
});

export const { add, remove, update } = playersSlice.actions;

export default playersSlice.reducer;
