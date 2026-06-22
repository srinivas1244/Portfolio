"use client";

import dynamic from "next/dynamic";
import { techGalaxy } from "@/lib/data";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });

/** Lightweight, animated chip-cloud fallback for mobile / reduced-motion. */
function Fallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6">
      {/* soft glow so the panel never looks empty */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.25),transparent_65%)] blur-2xl" />
      <div className="relative flex max-w-md flex-wrap content-center items-center justify-center gap-2 sm:gap-2.5">
        {techGalaxy.map((t, i) => (
          <span
            key={t.label}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs"
            style={{ borderColor: `${t.color}55`, color: "#e3e3ef", background: `${t.color}14` }}
          >
            <span
              className="animate-pulse-node h-1.5 w-1.5 rounded-full"
              style={{ background: t.color, animationDelay: `${-(i % 6) * 0.4}s` }}
            />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsGalaxy() {
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();
  if (mobile || reduce) return <Fallback />;
  return <GalaxyScene />;
}
