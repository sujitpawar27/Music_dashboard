"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/useDebounce";
import { Album } from "../types/Deezer";

export default function Dashboard() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  useEffect(() => {
    async function fetchAlbums() {
      try {
        setLoading(true);
        setError(null);

        const searchQuery = debouncedQuery.trim() || "trending";

        const res = await fetch(
          `/api/music/Dreezer?q=${encodeURIComponent(searchQuery)}`
        );

        if (!res.ok) throw new Error("Failed to fetch albums");

        const data: Album[] = await res.json();
        setAlbums(data);
      } catch {
        setError("Something went wrong while loading albums");
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums();
  }, [debouncedQuery]);

  return (
    <div className="px-6 pt-6 pb-28 space-y-8">
      {/* 🎧 Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {query === "trending" ? "Trending Albums" : "Search Results"}
        </h1>
        <p className="text-muted-foreground text-sm">
          Discover music you’ll love
        </p>
      </div>

      {/* 🔍 Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search albums, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            px-4 py-2.5
            rounded-full
            bg-muted/60
            border
            focus:outline-none
            focus:ring-2
            focus:ring-primary
          "
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* ⏳ States */}
      {loading ? (
        <p className="text-muted-foreground">Loading albums...</p>
      ) : albums.length === 0 ? (
        <p className="text-muted-foreground">No albums found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              onClick={() => router.push(`/album/${album.id}`)}
              className="group cursor-pointer space-y-2"
            >
              {/* Album Art */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <Image
                  src={album.cover}
                  alt={album.title}
                  height={300}
                  width={300}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* ▶ Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                    ▶
                  </div>
                </div>
              </div>

              {/* Album Info */}
              <div>
                <p className="font-medium truncate">{album.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {album.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
