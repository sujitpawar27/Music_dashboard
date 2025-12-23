"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Image
          src={session.user?.image || ""}
          alt="user_image"
          className="h-8 w-8 rounded-full"
        />
        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  );
}
