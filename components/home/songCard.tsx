"use client";

import Image from "next/image";
import { SpotifyTrack } from "@/app/types/Deezer";
import { useRouter } from "next/navigation";

type Props = {
  song: SpotifyTrack;
};

export default function SongCard({ song }: Props) {
  const router = useRouter();

  console.log("Song", song);

  const goToAlbum = () => {
    const albumId = song.id;
    router.push(`/album/${albumId}`);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative" onClick={goToAlbum}>
        <Image
          src={song.images[0]?.url || "/placeholder.png"}
          width={300}
          height={300}
          alt={song.name}
          className="rounded-md"
        />

        <p className="mt-2 font-medium truncate">{song.name}</p>
        <p className="text-sm text-muted-foreground truncate">
          {song.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
