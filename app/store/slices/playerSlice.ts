import { DeezerTrack } from "@/app/types/Deezer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayerState = {
  currentTrack: DeezerTrack | null;
  queue: DeezerTrack[];
  isPlaying: boolean;
};

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<DeezerTrack>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    pauseTrack(state) {
      state.isPlaying = false;
    },
    setQueue(state, action: PayloadAction<DeezerTrack[]>) {
      state.queue = action.payload;
    },
    playNext(state) {
      if (!state.currentTrack) return;
      const index = state.queue.findIndex(
        (t) => t.id === state.currentTrack?.id
      );
      state.isPlaying = true;
      state.currentTrack = state.queue[index + 1] || null;
    },
    playPrevious(state) {
      if (!state.currentTrack) return;
      const index = state.queue.findIndex(
        (t) => t.id === state.currentTrack?.id
      );
      state.isPlaying = true;
      state.currentTrack = state.queue[index - 1] || null;
    },
  },
});

export const { playTrack, pauseTrack, setQueue, playNext, playPrevious } =
  playerSlice.actions;

export default playerSlice.reducer;
