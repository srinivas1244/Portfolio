"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <Reveal>
        <span className="eyebrow inline-flex items-center gap-2">
          <span className="h-1 w-6 rounded-full bg-gradient-to-r from-violet to-cyan" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="mt-5 font-display text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.04]">
        <SplitText text={title} />
        {highlight && (
          <>
            {" "}
            <motion.span
              className="text-gradient"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {highlight}
            </motion.span>
          </>
        )}
      </h2>
      {subtitle && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
