"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Mail, Search } from "lucide-react";
import { navItems, profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const mobileSocials = [
  { icon: GithubIcon, href: profile.socials.github, label: "GitHub" },
  { icon: LinkedinIcon, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: profile.socials.email, label: "Email" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Frosted bar after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#home"
            className={cn(
              "rounded-full px-3 py-1.5 font-display text-lg font-bold tracking-tight transition-colors",
              scrolled && "glass",
            )}
          >
            {profile.initials}
            <span className="text-violet">.</span>
          </a>

          {/* Desktop nav */}
          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 md:flex",
              scrolled ? "glass" : "bg-transparent",
            )}
          >
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-fg/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              aria-label="Open command menu"
              className="glass flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <Search className="h-4 w-4" strokeWidth={1.6} />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden rounded border border-line px-1 font-mono text-[10px] lg:inline">⌘K</kbd>
            </button>
            <ThemeToggle />
            <Magnetic className="inline-block">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  scrolled ? "bg-fg text-ink" : "glass text-fg hover:bg-fg/[0.07]",
                )}
              >
                GitHub
              </a>
            </Magnetic>
          </div>

          {/* Mobile cluster */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              aria-label="Open command menu"
              className="glass rounded-full p-2.5 text-muted transition-transform active:scale-95"
            >
              <Search className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="glass rounded-full p-2.5 transition-transform active:scale-95"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-lg font-bold">
                {profile.initials}
                <span className="text-violet">.</span>
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="glass rounded-full p-2.5 transition-transform active:scale-95">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {navItems.map((item, i) => {
                const isActive = active === item.href.slice(1);
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    className={cn(
                      "flex items-center gap-3 py-1.5 font-display text-[clamp(2rem,9vw,2.75rem)] font-semibold transition-colors active:opacity-70",
                      isActive ? "text-fg" : "text-muted",
                    )}
                  >
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet to-cyan" />
                    )}
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-5 px-8 pb-12"
            >
              <div className="flex items-center gap-3">
                {mobileSocials.map(({ icon: Ico, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors hover:text-fg active:scale-95"
                  >
                    <Ico className="h-5 w-5" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
              <a href={profile.socials.email} className="block text-sm text-muted">
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
