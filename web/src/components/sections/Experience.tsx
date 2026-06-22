"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Rocket, Trophy, type LucideIcon } from "lucide-react";
import { timeline, type TimelineEntry } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const kindMeta: Record<TimelineEntry["kind"], { icon: LucideIcon; color: string }> = {
  education: { icon: GraduationCap, color: "#7c5cff" },
  build: { icon: Rocket, color: "#22d3ee" },
  achievement: { icon: Trophy, color: "#ffb86b" },
};

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <SectionHeading
        eyebrow="Education"
        title="The academic path that"
        highlight="shaped me."
        subtitle="The schools and degree that built my foundation in computer science."
      />

      <div ref={ref} className="relative mt-16 pl-12 sm:pl-16">
        {/* track */}
        <div className="absolute left-4 top-2 h-full w-px bg-fg/10 sm:left-6" />
        <motion.div
          style={{ height: fill }}
          className="absolute left-4 top-2 w-px bg-gradient-to-b from-violet via-cyan to-magenta sm:left-6"
        />

        <div className="space-y-12">
          {timeline
            .filter((item) => item.kind === "education")
            .map((item, i) => {
            const { icon: Ico, color } = kindMeta[item.kind];
            return (
              <motion.div
                key={item.title + item.period}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* node */}
                <div
                  className="absolute -left-[34px] top-0 flex h-9 w-9 items-center justify-center rounded-xl glass-strong sm:-left-[42px]"
                  style={{ boxShadow: `0 0 18px -4px ${color}` }}
                >
                  <Ico className="h-4 w-4" style={{ color }} strokeWidth={1.75} />
                </div>

                <div className="group rounded-2xl glass p-6 transition-colors hover:bg-fg/[0.06]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs" style={{ color }}>
                      {item.period}
                    </span>
                    <span className="text-xs text-muted">· {item.org}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
