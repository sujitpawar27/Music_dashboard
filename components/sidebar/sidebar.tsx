"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { createPlaylist } from "@/app/store/slices/playlistSlice";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};
export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.playlist.playlists);

  const handleCreatePlaylist = () => {
    const name = prompt("Enter playlist name");
    if (!name) return;

    dispatch(createPlaylist({ id: nanoid(), name }));
  };

  return (
    <aside
      className={`
        shrink-0
        border-r
        bg-muted/30
        transition-all
        duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      <div className="p-4 space-y-4">
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-muted-foreground"
        >
          {collapsed ? "➡" : "⬅"}
        </button>

        {!collapsed && (
          <>
            {/* Liked Songs */}
            <div className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground">Library</p>

              <div className="px-2 py-2 rounded hover:bg-muted cursor-pointer">
                ❤️ Liked Songs
              </div>
            </div>

            {/* Playlists */}
            <div className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground">
                Playlists
              </p>

              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="px-2 py-2 rounded hover:bg-muted cursor-pointer truncate"
                >
                  🎵 {playlist.name}
                </div>
              ))}

              <button
                onClick={handleCreatePlaylist}
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
