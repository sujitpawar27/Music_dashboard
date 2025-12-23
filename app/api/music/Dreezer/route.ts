import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "trending";

  const res = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b33886bb10mshfb598b98620b996p14b95ejsn0bf05f14ccbb",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch Deezer data" },
      { status: res.status }
    );
  }

  const deezer = await res.json();

  // ✅ TRANSFORM tracks → albums
  const albumMap = new Map<number, any>();

  deezer.data.forEach((track: any) => {
    const album = track.album;
    if (!albumMap.has(album.id)) {
      albumMap.set(album.id, {
        id: album.id,
        title: album.title,
        cover: album.cover_medium,
        artist: track.artist.name,
      });
    }
  });

  return NextResponse.json(Array.from(albumMap.values()));
}
