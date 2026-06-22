"use client";

import { motion } from "framer-motion";
import { stackLayers, type StackLayer } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function Slab({ layer }: { layer: StackLayer }) {
  return (
    <div className="relative h-[132px] w-[132px] sm:h-[160px] sm:w-[160px]">
      <div
        className="iso-slab absolute inset-0 rounded-[18px]"
        style={{
          background: `linear-gradient(135deg, ${layer.from}, ${layer.to})`,
          boxShadow: `0 34px 60px -22px ${layer.to}77, inset 0 0 0 1px rgba(255,255,255,0.28)`,
        }}
      >
        {/* glossy sheen */}
        <div className="absolute inset-0 rounded-[18px] bg-[linear-gradient(135deg,rgba(255,255,255,0.4),transparent_46%)]" />
      </div>
    </div>
  );
}

function Row({ layer, index }: { layer: StackLayer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      className={cn(
        "group relative grid items-center gap-3 lg:grid-cols-[180px_1fr_210px] lg:gap-6",
        index > 0 && "-mt-6 sm:-mt-8 lg:mt-0",
      )}
    >
      {/* label */}
      <div className="order-2 text-center lg:order-1 lg:text-right">
        <div className="font-mono text-xs text-muted/70">{String(index + 1).padStart(2, "0")}</div>
        <h3 className="mt-0.5 font-display text-lg font-semibold transition-colors group-hover:text-fg sm:text-xl">
          {layer.name}
        </h3>
      </div>

      {/* isometric slab */}
      <div className="order-1 flex justify-center lg:order-2">
        <Slab layer={layer} />
      </div>

      {/* caption + chips */}
      <div className="order-3 text-center lg:text-left">
        <p className="text-sm text-muted">{layer.caption}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5 lg:justify-start">
          {layer.techs.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-fg/[0.03] px-2 py-0.5 text-[11px] text-fg/80 transition-colors group-hover:border-fg/25"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl scroll-mt-20 overflow-hidden px-5 py-20 sm:px-8 sm:py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="The Stack"
        title="Layers of my"
        highlight="STACK."
        subtitle="Hover a layer to explore the tools — from the interface users touch down to the languages it's built on."
      />

      <div className="iso-scene relative mt-20 space-y-2 sm:mt-24 lg:space-y-10">
        {/* central connector line + pulsing nodes (desktop) */}
        <div className="pointer-events-none absolute left-1/2 top-6 bottom-6 hidden w-px -translate-x-1/2 lg:block">
          <div
            className="h-full w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--color-line) 0 5px, transparent 5px 13px)",
            }}
          />
          {[18, 38, 58, 78].map((top) => (
            <span
              key={top}
              className="animate-pulse-node absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet"
              style={{ top: `${top}%`, animationDelay: `${-top * 0.02}s` }}
            />
          ))}
        </div>

        {stackLayers.map((layer, i) => (
          <Row key={layer.name} layer={layer} index={i} />
        ))}
      </div>
    </section>
  );
}
