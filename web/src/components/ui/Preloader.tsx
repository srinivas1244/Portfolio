"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic intro: counts to 100 then curtains up. Purely visual overlay —
 * content renders underneath immediately, so it never blocks interactivity.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const DURATION = 1500;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-end gap-3">
            <span className="font-display text-5xl font-bold tracking-tight text-fg">
              PS<span className="text-violet">.</span>
            </span>
          </div>
          <div className="mt-8 h-px w-56 overflow-hidden bg-fg/10">
            <motion.div
              className="h-full bg-gradient-to-r from-violet to-cyan"
              style={{ width: `${count}%` }}
            />
          </div>
          <div className="mt-4 flex w-56 items-center justify-between">
            <span className="eyebrow">Loading experience</span>
            <span className="font-mono text-sm text-muted tabular-nums">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
