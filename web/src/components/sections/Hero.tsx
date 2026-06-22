"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, ArrowRight, Download, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";
import { Typewriter } from "@/components/ui/Typewriter";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 + i * 0.12, ease } }),
};

const socials = [
  { icon: GithubIcon, href: profile.socials.github, label: "GitHub" },
  { icon: LinkedinIcon, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: profile.socials.email, label: "Email" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 sm:px-8"
    >
      {/* ambient glow (lightweight, no 3D / WebGL) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-[12%] top-[6%] h-[42vmax] w-[42vmax] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-8%] top-[24%] h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_62%)] blur-3xl" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for internships &amp; collaborations
          </motion.div>

          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-[clamp(2.75rem,11vw,7rem)] font-bold leading-[0.95] tracking-tight"
          >
            Perala
            <br />
            <span className="text-gradient">Srinivasulu</span>
          </motion.h1>

          <motion.div
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-[clamp(1.35rem,5vw,1.9rem)] font-medium text-fg/90"
          >
            I build <Typewriter phrases={profile.typewriter} />
          </motion.div>

          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {profile.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3 text-sm text-muted">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-violet" />}
                {role}
              </span>
            ))}
          </motion.div>

          <motion.p
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            custom={5}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects" variant="primary">
              View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            
            <Button href="#contact" variant="ghost">
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            custom={6}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-8 flex items-center gap-3"
          >
            {socials.map(({ icon: Ico, href, label }) => (
              <Magnetic key={label} className="inline-block">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
                >
                  <Ico className="h-5 w-5" strokeWidth={1.5} />
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="eyebrow">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
