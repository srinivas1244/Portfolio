"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, X, BadgeCheck } from "lucide-react";
import { certifications, type Certification } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-20">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications &amp;"
        highlight="Certifications"
        subtitle="Continuous, self-driven learning across full-stack, backend, AI and cloud."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={(i % 4) * 0.07}>
            <button
              onClick={() => setActive(cert)}
              className="group flex h-full w-full flex-col items-start rounded-2xl glass p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-fg/[0.06]"
            >
              <div className="flex w-full items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20">
                  <Award className="h-6 w-6 text-fg" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-xs text-muted">{cert.year}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{cert.title}</h3>
              <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
              <span className="mt-4 text-xs text-violet opacity-0 transition-opacity group-hover:opacity-100">
                View details →
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl glass-strong p-8"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 rounded-full p-2 text-muted transition-colors hover:bg-fg/10 hover:text-fg"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet/40 to-cyan/30">
                <BadgeCheck className="h-7 w-7 text-fg" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{active.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {active.issuer} · {active.year}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg/80">{active.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1 text-xs text-fg/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {active.url && (
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink"
                >
                  Verify credential
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
