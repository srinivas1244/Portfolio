"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ExternalLink, Check, Star, GitBranch } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects, type Project } from "@/lib/data";
import type { GithubRepo } from "@/lib/github";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-project={project.slug}
      className="panel w-full shrink-0 lg:w-[min(86vw,940px)]"
    >
      <div className="grid overflow-hidden rounded-[28px] glass md:grid-cols-2">
        {/* Text */}
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="font-mono text-2xl text-fg/30">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-4 w-px bg-fg/15" />
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-violet" />
            <span>{project.year}</span>
            {project.flagship && (
              <span
                className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ background: `${project.accent}22`, color: project.accent }}
              >
                Flagship
              </span>
            )}
          </div>

          <h3 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm font-medium" style={{ color: project.accent }}>
            {project.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-5 space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-fg/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: project.accent }} />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-fg/10 bg-fg/[0.03] px-2.5 py-1 text-xs text-fg/75"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <Magnetic className="inline-block">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink"
              >
                <GithubIcon className="h-4 w-4" /> Source
              </a>
            </Magnetic>
            {project.live && (
              <Magnetic className="inline-block">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              </Magnetic>
            )}
          </div>
        </div>

        {/* Abstract preview */}
        <div className="relative min-h-[280px] overflow-hidden border-t border-line md:border-l md:border-t-0">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(120% 90% at 80% 10%, ${project.accent}40, transparent 55%), radial-gradient(90% 80% at 10% 100%, ${project.accent}22, transparent 60%)`,
            }}
          />
          <div className="relative flex h-full items-center justify-center p-8">
            <div className="w-full max-w-sm rotate-1 rounded-2xl border border-fg/10 bg-ink/70 p-4 shadow-2xl backdrop-blur-md">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              </div>
              <div className="mt-4 space-y-2.5">
                <div className="h-2 w-1/3 rounded-full" style={{ background: project.accent }} />
                <div className="h-2 w-full rounded-full bg-fg/10" />
                <div className="h-2 w-5/6 rounded-full bg-fg/10" />
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="h-12 rounded-lg border border-fg/10 bg-fg/[0.04]" />
                  ))}
                </div>
                <div className="flex items-end gap-1.5 pt-2">
                  {[40, 70, 35, 90, 55, 75].map((h, k) => (
                    <div
                      key={k}
                      className="flex-1 rounded-t"
                      style={{ height: h, background: `${project.accent}${k % 2 ? "66" : "aa"}` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects({ repos }: { repos: GithubRepo[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth + 96;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="projects" className="relative scroll-mt-20 py-20 md:py-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:pt-36">
        <SectionHeading
          eyebrow="Selected Work"
          title="My"
          highlight="Works."
          subtitle="A few builds where AI, full-stack engineering and clean product thinking come together."
        />
      </div>

      {/* Horizontal gallery (pinned on desktop, stacked on mobile) */}
      <div ref={pinRef} className="md:mt-12 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:px-12 lg:will-change-transform"
        >
          {/* intro card on desktop */}
          <div className="hidden shrink-0 lg:flex lg:w-[26vw] lg:flex-col lg:justify-center">
            <p className="font-mono text-sm text-muted">
              {String(projects.length).padStart(2, "0")} projects
            </p>
            <p className="mt-3 font-display text-2xl font-semibold text-fg/70">
              Scroll to explore the work →
            </p>
          </div>
          {projects.map((p, i) => (
            <ProjectPanel key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* Live GitHub strip */}
      {repos.length > 0 && (
        <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
          <Reveal className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-semibold text-muted">More on GitHub</h3>
            <a
              href="https://github.com/srinivas1244?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <Reveal
                key={repo.name}
                delay={(i % 3) * 0.06}
                as="div"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl glass p-5 transition-colors hover:bg-fg/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <GithubIcon className="h-5 w-5 text-muted" />
                    <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h4 className="mt-3 font-display text-lg font-semibold capitalize">
                    {repo.name.replace(/[-_]/g, " ")}
                  </h4>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted">
                    {repo.description ?? "Code, experiments and learning in progress."}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-violet" />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                    </span>
                    {repo.homepage && (
                      <span className="inline-flex items-center gap-1">
                        <GitBranch className="h-3.5 w-3.5" /> live
                      </span>
                    )}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
