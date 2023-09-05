import { createSlice } from "@reduxjs/toolkit";

export interface ISettingsState {
  gameRunning: boolean;
}

const initialState: ISettingsState = {
  gameRunning: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    switchRunningMode: (state) => {
      state.gameRunning = !state.gameRunning;
    },
  },
});

export const { switchRunningMode } = settingsSlice.actions;

export default settingsSlice.reducer;
