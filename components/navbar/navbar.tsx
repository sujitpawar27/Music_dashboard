"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const likedCount = useSelector(
    (state: RootState) => state.playlist.likedSongs.length
  );

  const { data: session } = useSession();

  return (
    <header className="h-14 border-b flex items-center justify-between px-6 w-full">
      {/* App Name */}
      <h1 className="font-semibold">Music App</h1>

      {/* Liked Songs Count */}
      <div className="text-sm text-muted-foreground">
        ❤️ Liked Songs:{" "}
        <span className="font-medium text-foreground">{likedCount}</span>
      </div>

      {/* Auth Section */}
      <div>
        {session ? (
          <div className="flex items-center gap-3">
            <Image
              src={"https://avatar.iran.liara.run/public"}
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
            <button
              onClick={() => signOut()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm font-medium hover:underline cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
