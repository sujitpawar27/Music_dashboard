"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeezerTrack } from "@/app/types/Deezer";

type Playlist = {
  id: string;
  name: string;
  tracks: DeezerTrack[];
};

type PlaylistState = {
  playlists: Playlist[];
  likedSongs: DeezerTrack[];
};

const loadState = (): PlaylistState => {
  if (typeof window === "undefined") {
    return { playlists: [], likedSongs: [] };
  }

  try {
    const stored = localStorage.getItem("playlistState");
    return stored ? JSON.parse(stored) : { playlists: [], likedSongs: [] };
  } catch {
    return { playlists: [], likedSongs: [] };
  }
};

const saveState = (state: PlaylistState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("playlistState", JSON.stringify(state));
};

const initialState: PlaylistState = loadState();

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    createPlaylist: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.playlists.push({
        id: action.payload.id,
        name: action.payload.name,
        tracks: [],
      });
      saveState(state);
    },

    addToPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; track: DeezerTrack }>
    ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (!playlist) return;

      if (!playlist.tracks.some((t) => t.id === action.payload.track.id)) {
        playlist.tracks.push(action.payload.track);
        saveState(state);
      }
    },

    removeFromPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; trackId: number }>
    ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (!playlist) return;

      playlist.tracks = playlist.tracks.filter(
        (t) => t.id !== action.payload.trackId
      );
      saveState(state);
    },

    likeSong: (state, action: PayloadAction<DeezerTrack>) => {
      if (!state.likedSongs.some((t) => t.id === action.payload.id)) {
        state.likedSongs.push(action.payload);
        saveState(state);
      }
    },

    unlikeSong: (state, action: PayloadAction<number>) => {
      state.likedSongs = state.likedSongs.filter(
        (t) => t.id !== action.payload
      );
      saveState(state);
    },
  },
});

export const {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  likeSong,
  unlikeSong,
} = playlistSlice.actions;

export default playlistSlice.reducer;
