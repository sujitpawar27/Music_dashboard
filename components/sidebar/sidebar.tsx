"use client";

import { useSession, signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { createPlaylist } from "@/app/store/slices/playlistSlice";
import { nanoid } from "@reduxjs/toolkit";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const playlists = useSelector((state: RootState) => state.playlist.playlists);

  return (
    <aside
      className={`
        hidden md:block
        shrink-0
        border-r
        bg-muted/30
        transition-all
        duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      <div className="p-4 space-y-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-muted-foreground"
        >
          {collapsed ? "➡" : "⬅"}
        </button>

        {status === "loading" && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}

        {status === "unauthenticated" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Log in to access:</p>

            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your Library</li>
              <li>• Liked Songs</li>
              <li>• Playlists</li>
            </ul>

            <button
              onClick={() => signIn()}
              className="w-full py-2 rounded-full bg-primary text-primary-foreground"
            >
              Log in
            </button>
          </div>
        )}

        {status === "authenticated" && (
          <>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Library</p>
              <div className="px-2 py-2 rounded hover:bg-muted cursor-pointer">
                ❤️ Liked Songs
              </div>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground">
                Playlists
              </p>

              <div className="space-y-1">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="px-2 py-2 rounded hover:bg-muted cursor-pointer truncate"
                  >
                    🎵 {playlist.name}
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  dispatch(
                    createPlaylist({
                      id: nanoid(),
                      name: "New Playlist",
                    })
                  )
                }
                className="mt-2 w-full text-left px-2 py-2 rounded hover:bg-muted text-sm"
              >
                ➕ Create Playlist
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
