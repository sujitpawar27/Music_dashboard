import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ albumId: string }> }
) {
  const { albumId } = await context.params; // ✅ unwrap params

  const res = await fetch(`https://api.deezer.com/album/${albumId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Album not found" },
      { status: res.status }
    );
  }

  const album = await res.json();

  return NextResponse.json({
    id: album.id,
    title: album.title,
    cover: album.cover_medium,
    artist: album.artist?.name,
    tracks: album.tracks?.data ?? [],
  });
}
