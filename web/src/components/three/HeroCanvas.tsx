"use client";

import dynamic from "next/dynamic";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

// Heavy WebGL — loaded only on the client, after the rest of the page.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** A calm CSS fallback for mobile / reduced-motion (keeps it fast & accessible). */
function Fallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-64 w-64">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/60 via-cyan/30 to-transparent blur-2xl" />
        <div className="animate-float absolute inset-8 rounded-full border border-fg/10 bg-fg/[0.03] backdrop-blur-sm" />
        <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-fg/10" />
      </div>
    </div>
  );
}

export function HeroCanvas() {
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();

  if (mobile || reduce) return <Fallback />;
  return <HeroScene />;
}
