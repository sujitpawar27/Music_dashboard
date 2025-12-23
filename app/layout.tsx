"use client";
import PlayerController from "@/components/player/PlayerController";
import "./globals.css";
import Providers from "./providers";
import MusicPlayer from "@/components/player/MusicPlayer";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen ">
        <Providers>
          <PlayerController />

          <div className="flex h-full">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0 ">
              <header className="h-14 border-b flex items-center px-6">
                <Navbar />
              </header>

              <main className="flex-1 overflow-y-auto ">{children}</main>
            </div>
          </div>

          {/* Fixed Player */}
          <footer className="fixed bottom-0 left-0 right-0 z-50">
            <MusicPlayer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
