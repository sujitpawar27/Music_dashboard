"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { DeezerTrack } from "@/app/types/Deezer";
import TrackRow from "@/components/album/trackRow";

export default function AlbumPage() {
  const { albumId } = useParams<{ albumId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["album", albumId],
    enabled: !!albumId,
    queryFn: async () => {
      const res = await fetch(`/api/music/album/${albumId}`);
      if (!res.ok) throw new Error("Album not found");
      return res.json();
    },
  });

  if (isLoading) return <p className="p-6">Loading album...</p>;
  if (!data) return <p className="p-6">Album not found</p>;

  const tracks: DeezerTrack[] = data.tracks;
  const album = tracks[0];

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Album Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-6 flex gap-6">
        <Image
          src={album.album.cover_big}
          width={220}
          height={220}
          alt={album.album.title}
          className="rounded-lg shadow-md"
        />

        <div className="flex flex-col justify-end">
          <p className="text-sm uppercase text-muted-foreground">Album</p>
          <h1 className="text-3xl font-bold">{album.album.title}</h1>
          <p className="text-muted-foreground mt-1">
            {album.artist.name} • {tracks.length} songs
          </p>
        </div>
      </div>

      {/* Scrollable Tracks */}
      <div className="flex-1 overflow-y-auto pb-24">
        {tracks.map((track, index) => (
          <TrackRow
            key={track.id}
            track={track}
            allTracks={tracks}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
