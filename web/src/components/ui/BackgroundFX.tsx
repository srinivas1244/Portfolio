"use client";

import { useEffect, useRef } from "react";

/**
 * Global animated backdrop for the whole site: aurora blobs that ambiently
 * drift (CSS) AND parallax with scroll (JS), plus a dot grid that shifts as you
 * scroll. Theme-aware, fixed behind all content, and disabled for reduced-motion.
 */
export function BackgroundFX() {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let cur = window.scrollY;

    const loop = () => {
      cur += (window.scrollY - cur) * 0.1;
      if (b1.current) b1.current.style.transform = `translate3d(0, ${cur * 0.12}px, 0)`;
      if (b2.current) b2.current.style.transform = `translate3d(0, ${cur * -0.08}px, 0)`;
      if (b3.current) b3.current.style.transform = `translate3d(0, ${cur * 0.06}px, 0)`;
      if (grid.current) grid.current.style.transform = `translate3d(0, ${cur * -0.05}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* parallax dot grid */}
      <div
        ref={grid}
        className="dot-grid absolute -inset-[12%] opacity-70 [mask-image:radial-gradient(72%_60%_at_50%_40%,black,transparent)]"
      />

      {/* aurora blobs — outer wrapper = scroll parallax, inner = ambient drift */}
      <div ref={b1} className="absolute -left-[15%] top-[2%]">
        <div className="animate-aurora h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_62%)] blur-[90px]" />
      </div>
      <div ref={b2} className="absolute -right-[18%] top-[26%]">
        <div
          className="animate-aurora h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_62%)] blur-[90px]"
          style={{ animationDelay: "-7s" }}
        />
      </div>
      <div ref={b3} className="absolute bottom-[-16%] left-[18%]">
        <div
          className="animate-aurora h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,rgba(255,92,168,0.14),transparent_62%)] blur-[90px]"
          style={{ animationDelay: "-12s" }}
        />
      </div>
    </div>
  );
}
