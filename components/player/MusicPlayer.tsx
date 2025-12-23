"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  pauseTrack,
  playNext,
  playPrevious,
  playTrack,
} from "@/app/store/slices/playerSlice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { likeSong, unlikeSong } from "@/app/store/slices/playlistSlice";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, queue } = useSelector(
    (state: RootState) => state.player
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const likedSongs = useSelector(
    (state: RootState) => state.playlist.likedSongs
  );

  const isLiked = likedSongs.some((track) => track.id === currentTrack?.id);

  const duration = 30; // Deezer preview length

  const currentIndex = currentTrack
    ? queue.findIndex((t) => t.id === currentTrack.id)
    : -1;

  /* ▶️ Play / Pause */
  useEffect(() => {
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  /* 🎵 Load new track */
  useEffect(() => {
    if (!currentTrack?.preview) return;

    audioRef.current?.pause();

    const audio = new Audio(currentTrack.preview);
    audioRef.current = audio;
    audio.volume = 0.8;

    audio.ontimeupdate = () => {
      setProgress(audio.currentTime);
    };

    audio.onended = () => {
      dispatch(playNext());
    };

    audio.play();
    setProgress(0);

    return () => {
      audio.pause();
    };
  }, [currentTrack, dispatch]);

  /* ⛔ NOW it is safe to return */
  if (!currentTrack) return null;

  /* ⏩ Seek */
  const handleSeek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  return (
    <div className="h-24 px-6 bg-background border-t flex flex-col justify-center gap-2">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={currentTrack.album?.cover_medium ?? "/placeholder.png"}
            alt={currentTrack.title}
            width={48}
            height={48}
            className="rounded-md"
          />

          <div className="min-w-0">
            <p className="font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist?.name}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => dispatch(playPrevious())}
            disabled={currentIndex <= 0}
            className="disabled:opacity-40"
          >
            ⏮
          </button>

          <button
            onClick={() =>
              dispatch(isPlaying ? pauseTrack() : playTrack(currentTrack))
            }
            disabled={!currentTrack.preview}
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={() => dispatch(playNext())}
            disabled={currentIndex === queue.length - 1}
            className="disabled:opacity-40"
          >
            ⏭
          </button>
          <button
            onClick={() =>
              dispatch(
                isLiked ? unlikeSong(currentTrack.id) : likeSong(currentTrack)
              )
            }
            title="like Song"
            className={`text-xl transition cursor-pointer ${
              isLiked ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            +
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{formatTime(progress)}</span>

        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="flex-1 h-1 accent-primary cursor-pointer"
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

/* ⏱ Helper */
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
