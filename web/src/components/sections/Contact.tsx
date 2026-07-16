"use client";

import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: profile.socials.email },
  { icon: LinkedinIcon, label: "LinkedIn", value: "perala-srinivasulu", href: profile.socials.linkedin },
  { icon: GithubIcon, label: "GitHub", value: "srinivas1244", href: profile.socials.github },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <SectionHeading
        align="center"
        eyebrow="Get in touch"
        title="Contact"
        highlight="Me"
        subtitle="Open to internships, collaborations and interesting problems. I usually reply within a day."
      />

      {/* Aligned channel grid */}
      <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {channels.map(({ icon: Ico, label, value, href }, i) => {
          const inner = (
            <div className="group flex h-full items-center gap-4 rounded-2xl glass p-5 transition-colors hover:bg-fg/[0.06]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20">
                <Ico className="h-5 w-5 text-fg" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 text-left">
                <div className="text-xs text-muted">{label}</div>
                <div className="truncate text-sm font-medium text-fg">{value}</div>
              </div>
              {href && (
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </div>
          );
          return (
            <Reveal key={label} delay={i * 0.06} className="h-full">
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
