"use client";

import { useDispatch } from "react-redux";
import { playTrack, setQueue } from "@/app/store/slices/playerSlice";
import { DeezerTrack } from "@/app/types/Deezer";

type Props = {
  track: DeezerTrack;
  allTracks: DeezerTrack[];
  index: number;
};

export default function TrackRow({ track, allTracks, index }: Props) {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setQueue(allTracks));
    dispatch(playTrack(track));
  };

  return (
    <div className="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition cursor-pointer">
      {/* Index / Play */}
      <div className="w-6 text-sm text-muted-foreground group-hover:hidden">
        {index + 1}
      </div>

      <button
        onClick={handlePlay}
        className="hidden group-hover:block text-primary text-lg"
      >
        ▶
      </button>

      {/* Track Title */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{track.title}</p>
      </div>

      {/* Duration (optional future) */}
      <span className="text-xs text-muted-foreground">
        {Math.floor(track.duration / 60)}:
        {String(track.duration % 60).padStart(2, "0")}
      </span>
    </div>
  );
}
