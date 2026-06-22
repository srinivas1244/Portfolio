"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks raw and normalized mouse position without causing re-renders.
 * Returns stable refs — read them inside animation loops.
 */
export function useMouseTracker() {
  const raw = useRef({ x: 0, y: 0 });
  /** Normalized to [-1, 1] — x: left=-1, right=+1; y: down=-1, up=+1 */
  const normalized = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      raw.current = { x: e.clientX, y: e.clientY };
      normalized.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { raw, normalized };
}
