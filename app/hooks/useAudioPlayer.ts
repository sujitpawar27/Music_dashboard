// "use client";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { playNext } from "@/app/store/slices/playerSlice";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTrackIdRef = useRef<number | null>(null);
  const dispatch = useDispatch();

  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  // 1️⃣ Create audio instance ONCE
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = 1;
    audio.muted = false;

    audio.onended = () => {
      dispatch(playNext());
    };

    audio.onerror = () => {
      dispatch(playNext());
    };

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [dispatch]);

  // 2️⃣ Handle track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const src = currentTrack.preview;

    // ❌ Deezer track without preview
    if (!src) {
      dispatch(playNext());
      return;
    }

    // Prevent reloading same track
    if (lastTrackIdRef.current === currentTrack.id) return;
    lastTrackIdRef.current = currentTrack.id;

    audio.pause();
    audio.src = src;
    audio.load(); // ✅ required

    audio.play().catch(() => {
      // Autoplay may be blocked until user action
    });
  }, [currentTrack, dispatch]);

  // 3️⃣ Handle play / pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);
};
