"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  Search,
  Hash,
  Copy,
  FileDown,
  Mail,
  SunMoon,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

type Cmd = {
  id: string;
  label: string;
  group: "Navigate" | "Actions";
  icon: React.ReactNode;
  keywords?: string;
  hint?: string;
  run: () => void;
};

/** Smooth-scroll to a hash by reusing the global Lenis anchor handler. */
function goToHash(hash: string) {
  const a = document.createElement("a");
  a.href = hash;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function toggleTheme() {
  const root = document.documentElement;
  const next = !root.classList.contains("light");
  root.classList.add("theme-anim");
  root.classList.toggle("light", next);
  try {
    localStorage.setItem("theme", next ? "light" : "dark");
  } catch {
    /* storage unavailable */
  }
  window.setTimeout(() => root.classList.remove("theme-anim"), 450);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Cmd[] = useMemo(() => {
    const close = () => setOpen(false);
    const nav: Cmd[] = navItems.map((n) => ({
      id: `nav-${n.href}`,
      label: n.label,
      group: "Navigate",
      icon: <Hash className="h-4 w-4" strokeWidth={1.6} />,
      keywords: `go to ${n.label} section jump`,
      run: () => {
        close();
        setTimeout(() => goToHash(n.href), 80);
      },
    }));

    const actions: Cmd[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: <Copy className="h-4 w-4" strokeWidth={1.6} />,
        keywords: "clipboard contact mail",
        hint: profile.email,
        run: async () => {
          close();
          try {
            await navigator.clipboard.writeText(profile.email);
            toast.success("Email copied to clipboard");
          } catch {
            toast.error(profile.email);
          }
        },
      },
      {
        id: "email",
        label: "Send me an email",
        group: "Actions",
        icon: <Mail className="h-4 w-4" strokeWidth={1.6} />,
        keywords: "contact mailto write message",
        run: () => {
          close();
          window.location.href = profile.socials.email;
        },
      },
      {
        id: "resume",
        label: "Download résumé",
        group: "Actions",
        icon: <FileDown className="h-4 w-4" strokeWidth={1.6} />,
        keywords: "cv pdf hire",
        run: () => {
          close();
          window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "Actions",
        icon: <GithubIcon className="h-4 w-4" />,
        keywords: "code repositories source srinivas1244",
        run: () => {
          close();
          window.open(profile.socials.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Actions",
        icon: <LinkedinIcon className="h-4 w-4" />,
        keywords: "connect professional network",
        run: () => {
          close();
          window.open(profile.socials.linkedin, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        group: "Actions",
        icon: <SunMoon className="h-4 w-4" strokeWidth={1.6} />,
        keywords: "appearance mode color",
        run: () => {
          close();
          toggleTheme();
        },
      },
    ];

    return [...nav, ...actions];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords?.toLowerCase().includes(q),
    );
  }, [query, commands]);

  // Global open/close shortcuts + external trigger event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  // Reset + focus when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keep selection in range
  useEffect(() => {
    if (index > results.length - 1) setIndex(Math.max(0, results.length - 1));
  }, [results.length, index]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[index]?.run();
    }
  };

  // Scroll the active row into view
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  let counter = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-strong shadow-2xl"
          >
            {/* search row */}
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-muted" strokeWidth={1.6} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search or jump to…"
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-sm text-fg outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>

            {/* results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”.</p>
              )}

              {(["Navigate", "Actions"] as const).map((group) => {
                const items = results.filter((c) => c.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted/70">
                      {group}
                    </div>
                    {items.map((c) => {
                      counter += 1;
                      const i = counter;
                      const selected = i === index;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          data-i={i}
                          role="option"
                          aria-selected={selected}
                          onMouseMove={() => setIndex(i)}
                          onClick={() => c.run()}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                            selected ? "bg-fg/[0.08] text-fg" : "text-muted hover:text-fg",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line",
                              selected ? "bg-gradient-to-br from-violet/30 to-cyan/20 text-fg" : "text-muted",
                            )}
                          >
                            {c.icon}
                          </span>
                          <span className="flex-1 truncate text-fg/90">{c.label}</span>
                          {c.hint && <span className="hidden truncate text-xs text-muted sm:block">{c.hint}</span>}
                          {selected && <CornerDownLeft className="h-3.5 w-3.5 text-muted" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* footer hints */}
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <ArrowUp className="h-3 w-3" />
                <ArrowDown className="h-3 w-3" />
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="h-3 w-3" />
                select
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1 font-mono">⌘</kbd>
                <kbd className="rounded border border-line px-1 font-mono">K</kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
