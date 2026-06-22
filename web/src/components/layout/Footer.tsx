"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";

const socials = [
  { icon: GithubIcon, href: profile.socials.github, label: "GitHub" },
  { icon: LinkedinIcon, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: profile.socials.email, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <a href="#home" className="font-display text-3xl font-bold tracking-tight">
              {profile.initials}
              <span className="text-violet">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {profile.name} — building intelligent products from {profile.location}.
            </p>
          </div>

          <div className="flex items-center gap-3">
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
            <Magnetic className="inline-block">
              <a
                href="#home"
                aria-label="Back to top"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-fg text-ink"
              >
                <ArrowUp className="h-5 w-5" />
              </a>
            </Magnetic>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
