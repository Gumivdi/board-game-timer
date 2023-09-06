import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface ITimer {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface IPlayer {
  id: string;
  name: string;
  color: string;
  timer: ITimer;
  active: boolean;
}

export interface IPlayersState {
  limit: number;
  players: IPlayer[];
}

export type PlayerKeys = keyof IPlayer;

const initialState: IPlayersState = {
  limit: 5,
  players: [
    {
      id: uuid(),
      name: "",
      color: "#005ca3",
      timer: { hours: 0, minutes: 0, seconds: 0 },
      active: false,
    },
  ],
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    add: (state) => {
      state.players.push({
        id: uuid(),
        name: "",
        color: "#005ca3",
        timer: { hours: 0, minutes: 0, seconds: 0 },
        active: false,
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

    toggleTimer: (state, action: PayloadAction<string>) => {
      const playerIndex = state.players.findIndex(
        (player) => player.id === action.payload
      );
      const selectedPlayer = state.players[playerIndex];

      if (selectedPlayer.active) {
        selectedPlayer.active = false;
      } else {
        state.players.map((player) => (player.active = false));
        selectedPlayer.active = true;
      }

      state.players[playerIndex] = selectedPlayer;
    },
  },
});

export const { add, remove, update, toggleTimer } = playersSlice.actions;

export default playersSlice.reducer;
