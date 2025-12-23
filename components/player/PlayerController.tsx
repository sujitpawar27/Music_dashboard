"use client";

import { useAudioPlayer } from "@/app/hooks/useAudioPlayer";

export default function PlayerController() {
  useAudioPlayer();
  return null; // no UI
}
