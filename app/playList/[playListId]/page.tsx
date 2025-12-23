"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import TrackRow from "@/components/album/TrackRow";

export default function PlaylistPage() {
  const { playlistId } = useParams<{ playlistId: string }>();

  const playlist = useSelector((state: RootState) =>
    state.playlist.playlists.find((p) => p.id === playlistId)
  );

  if (!playlist) {
    return <div className="p-6">Playlist not found</div>;
  }

  return (
    <div className="p-6 pb-28 space-y-4">
      <h1 className="text-3xl font-bold">{playlist.name}</h1>
      <p className="text-muted-foreground">{playlist.tracks.length} songs</p>

      {playlist.tracks.length === 0 ? (
        <p className="text-muted-foreground mt-4">This playlist is empty.</p>
      ) : (
        <div className="space-y-1">
          {playlist.tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              allTracks={playlist.tracks}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
