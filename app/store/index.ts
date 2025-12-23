"use client";
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import uiReducer from "./slices/uiSlice";
import playlistReducer from "./slices/playlistSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist: playlistReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
