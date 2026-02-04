"use client";

import dynamic from "next/dynamic";

const RoyalCursor = dynamic(() => import("./RoyalCursor").then((mod) => mod.RoyalCursor), { ssr: false });
const SoulMirror = dynamic(() => import("./SoulMirror").then((mod) => mod.SoulMirror), { ssr: false });

export default function ClientVisuals() {
  return (
    <>
      <RoyalCursor />
      <SoulMirror />
    </>
  );
}
