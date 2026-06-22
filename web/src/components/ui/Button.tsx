"use client";

import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-ink hover:shadow-[0_18px_50px_-12px_rgba(255,255,255,0.35)]",
  ghost:
    "glass text-fg hover:bg-fg/[0.07]",
  outline:
    "border border-fg/15 text-fg hover:border-fg/40 hover:bg-fg/[0.04]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  download,
  magnetic = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean;
  magnetic?: boolean;
}) {
  const content = (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 active:scale-[0.98]",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );

  return magnetic ? <Magnetic className="inline-block">{content}</Magnetic> : content;
}
