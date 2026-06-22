"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Dark/light theme toggle. Reads the class set by the no-FOUC script in
 * layout, persists the choice to localStorage, and cross-fades the switch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("light");
    root.classList.add("theme-anim");
    root.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* storage unavailable — still toggles for the session */
    }
    setLight(next);
    window.setTimeout(() => root.classList.remove("theme-anim"), 450);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${light ? "dark" : "light"} mode`}
      className={cn(
        "glass relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-muted transition-colors hover:text-fg active:scale-95",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (light ? "moon" : "sun") : "placeholder"}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute"
        >
          {light ? <Moon className="h-5 w-5" strokeWidth={1.6} /> : <Sun className="h-5 w-5" strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
