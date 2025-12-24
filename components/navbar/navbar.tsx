"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const likedCount = useSelector(
    (state: RootState) => state.playlist.likedSongs.length
  );

  const { data: session, status } = useSession();

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-6 w-full">
      {/* App Logo / Name */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
          🎧
        </div>
        <h1 className="font-semibold tracking-tight">Vibe</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {status === "authenticated" && session ? (
          <>
            {/* Liked Songs Count */}
            <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
              <span>❤️</span>
              <span>{likedCount}</span>
            </div>

            {/* Avatar + Logout */}
            <div className="flex items-center gap-3">
              <Image
                src={session.user?.image ?? "/avatar.png"}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full border"
              />

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="
                  text-sm
                  text-muted-foreground
                  hover:text-foreground
                  transition
                  cursor-pointer
                "
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="
              px-4
              py-1.5
              rounded-full
              bg-primary
              text-primary-foreground
              text-sm
              font-medium
              hover:opacity-90
              transition cursor-pointer
            "
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
