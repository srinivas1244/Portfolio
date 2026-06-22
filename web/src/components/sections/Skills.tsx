"use client";

import { skillCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";
import { SkillsGalaxy } from "@/components/three/SkillsGalaxy";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <SectionHeading
        eyebrow="Capabilities"
        title="A constellation of"
        highlight="technologies."
        subtitle="The stack I reach for to design, build and ship — from interface to AI to cloud."
      />

      {/* 3D tech galaxy (interactive on desktop, animated chip cloud on mobile) */}
      <Reveal className="mt-10 sm:mt-14">
        <div className="relative h-[300px] overflow-hidden rounded-[28px] glass md:h-[460px] lg:h-[560px]">
          <SkillsGalaxy />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent" />
          <div className="pointer-events-none absolute left-5 top-5 hidden eyebrow md:block">
            Interactive · WebGL
          </div>
        </div>
      </Reveal>

      {/* Categorized skills */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.title} delay={(i % 3) * 0.08} className="h-full">
            <TiltCard className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-colors duration-300 hover:bg-fg/[0.06] active:scale-[0.99]">
              <span className="absolute right-5 top-5 font-mono text-xs text-muted/60">{cat.num}</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20">
                <Icon name={cat.icon} className="h-5 w-5 text-fg" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{cat.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1 text-xs text-fg/80 transition-colors group-hover:border-fg/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
