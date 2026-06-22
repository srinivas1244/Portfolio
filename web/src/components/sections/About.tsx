"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { profile, journeyArc, aboutHighlights } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <SectionHeading
        eyebrow="About"
        title="From curious student to"
        highlight="AI builder."
        subtitle="— a short story about how I got here and where I'm headed."
      />

      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Portrait */}
        <Reveal className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
          <div className="ring-glow relative aspect-[4/5] overflow-hidden rounded-[28px] glass">
            <Image
              src="/profile.jpg"
              alt={profile.name}
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          </div>
          {/* floating badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong absolute -right-3 top-8 flex items-center gap-2 rounded-2xl px-3 py-2 text-sm"
          >
            <Sparkles className="h-4 w-4 text-violet" />
            AI Engineer
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong absolute -left-3 bottom-10 flex items-center gap-2 rounded-2xl px-3 py-2 text-sm"
          >
            <MapPin className="h-4 w-4 text-cyan" />
            {profile.location}
          </motion.div>
        </Reveal>

        {/* Narrative */}
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-fg/85">
              I&apos;m a Computer Science engineer who fell for the part of software where ideas
              turn into something people can actually use. {profile.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-muted">
              Lately that means wiring large language models into real products, designing clean
              APIs, and obsessing over the details that make an interface feel alive. I learn by
              shipping — every project pushes me a little further.
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="glass rounded-2xl p-4">
                <div className="font-display text-3xl font-bold text-fg">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </Reveal>
            ))}
          </div>

          {/* Highlights */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {aboutHighlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08} className="h-full">
                <TiltCard className="group h-full rounded-2xl glass p-5 transition-colors duration-300 hover:bg-fg/[0.06] active:scale-[0.99]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20 text-fg">
                    <Icon name={h.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{h.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.copy}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Journey arc */}
      <div className="mt-24">
        <Reveal>
          <h3 className="font-display text-2xl font-semibold text-muted">The arc so far</h3>
        </Reveal>
        <div className="relative mt-10 grid gap-6 md:grid-cols-4">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-fg/15 to-transparent md:block" />
          {journeyArc.map((step, i) => (
            <Reveal key={step.phase} delay={i * 0.12} className="relative">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl glass-strong font-mono text-sm text-violet">
                {step.phase}
              </div>
              <h4 className="mt-5 font-display text-xl font-semibold">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
