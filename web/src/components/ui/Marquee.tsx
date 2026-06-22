"use client";

import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. Renders the items twice and translates the track
 * by -50% so it loops without a seam. Pauses on hover; honors reduced-motion.
 */
export function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const track = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex shrink-0 items-center gap-10 pr-10 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl font-semibold text-fg/70 sm:text-3xl">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-violet/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
