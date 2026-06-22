"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim gradient progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[65] h-0.5 origin-left bg-gradient-to-r from-violet via-cyan to-magenta"
    />
  );
}
