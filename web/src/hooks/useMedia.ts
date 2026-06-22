"use client";

import { useEffect, useState } from "react";

/** SSR-safe media-query hook. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on coarse-pointer / small-screen devices (skip heavy effects). */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px), (pointer: coarse)");
}
