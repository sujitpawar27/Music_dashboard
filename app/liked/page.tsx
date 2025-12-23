"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import TrackRow from "@/components/album/trackRow";

export default function LikedSongsPage() {
  const likedSongs = useSelector(
    (state: RootState) => state.playlist.likedSongs
  );

  if (likedSongs.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Liked Songs</h1>
        <p className="text-muted-foreground mt-2">
          You haven’t liked any songs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-28 space-y-4">
      <h1 className="text-3xl font-bold">❤️ Liked Songs</h1>

      <div className="space-y-1">
        {likedSongs.map((track, index) => (
          <TrackRow
            key={track.id}
            track={track}
            allTracks={likedSongs}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
