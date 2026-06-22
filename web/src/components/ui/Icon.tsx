"use client";

import {
  Brain,
  Layers,
  Cloud,
  Zap,
  MonitorSmartphone,
  Server,
  Sparkles,
  Database,
  Code2,
  type LucideIcon,
} from "lucide-react";

// Maps the string icon names used in data.ts to real components.
const map: Record<string, LucideIcon> = {
  Brain,
  Layers,
  Cloud,
  Zap,
  MonitorSmartphone,
  Server,
  Sparkles,
  Database,
  Code2,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden strokeWidth={1.5} />;
}
