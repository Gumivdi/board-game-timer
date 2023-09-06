import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./playersSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
