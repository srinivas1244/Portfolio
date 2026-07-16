"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Star, GitBranch } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects, type Project } from "@/lib/data";
import type { GithubRepo } from "@/lib/github";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Custom, description-driven preview mockups (one UI per project) ── */

function Bars({ accent, values }: { accent: string; values: number[] }) {
  return (
    <div className="flex h-16 items-end gap-1.5">
      {values.map((h, k) => (
        <div
          key={k}
          className="flex-1 rounded-t"
          style={{ height: `${h}%`, background: `${accent}${k % 2 ? "77" : "bb"}` }}
        />
      ))}
    </div>
  );
}

/** Renders a small app-UI illustration that reflects what each project does. */
function ProjectMock({ project }: { project: Project }) {
  const a = project.accent;

  switch (project.slug) {
    // AI academic analytics → dashboard with CGPA + subject chart
    case "student-gap-analyzer":
      return (
        <div className="space-y-2.5 text-left">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-20 rounded bg-fg/25" />
            <span className="rounded px-2 py-0.5 text-[10px] font-bold" style={{ background: `${a}22`, color: a }}>
              CGPA 8.4
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Sem 1", "Sem 2", "Sem 3"].map((s) => (
              <div key={s} className="rounded-lg border border-fg/10 bg-fg/[0.03] p-2">
                <div className="text-[9px] text-muted">{s}</div>
                <div className="mt-1.5 h-1.5 rounded-full" style={{ width: "72%", background: a }} />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-fg/10 bg-fg/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="h-1.5 w-16 rounded bg-fg/15" />
              <div className="h-1.5 w-8 rounded" style={{ background: `${a}88` }} />
            </div>
            <Bars accent={a} values={[55, 80, 42, 95, 60, 76]} />
          </div>
        </div>
      );

    // Campus events → event list with dates & attendance
    case "event-management-system":
      return (
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-24 rounded bg-fg/25" />
            <span className="rounded px-2 py-0.5 text-[10px] font-bold" style={{ background: `${a}22`, color: a }}>
              4 upcoming
            </span>
          </div>
          {["MON", "WED", "FRI"].map((d, idx) => (
            <div key={d} className="flex items-center gap-2.5 rounded-lg border border-fg/10 bg-fg/[0.03] p-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded text-[8px] font-bold"
                style={{ background: `${a}22`, color: a }}
              >
                {d}
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded bg-fg/20" />
                <div className="h-1 w-1/2 rounded bg-fg/10" />
              </div>
              <div className="h-1.5 w-10 rounded-full" style={{ background: a, opacity: 0.4 + idx * 0.25 }} />
            </div>
          ))}
        </div>
      );

    // Skill analytics → readiness ring + skill bars
    case "skillgap-analysis":
      return (
        <div className="flex items-center gap-4 text-left">
          <div
            className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(${a} 78%, rgba(150,150,180,0.14) 0)` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink">
              <span className="text-sm font-bold" style={{ color: a }}>
                78%
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-2.5">
            {["React", "Node", "Cloud"].map((s, i) => (
              <div key={s}>
                <div className="mb-1 h-1.5 w-12 rounded bg-fg/15" />
                <div className="h-1.5 w-full rounded-full bg-fg/10">
                  <div className="h-full rounded-full" style={{ width: `${58 + i * 13}%`, background: a }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    // AI agent → chat-with-your-repo interface
    case "ai-repo-agent":
      return (
        <div className="space-y-2 text-left">
          <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-fg/10 p-2">
            <div className="h-1.5 w-full rounded bg-fg/25" />
          </div>
          <div
            className="max-w-[85%] space-y-1.5 rounded-2xl rounded-tl-sm p-2.5"
            style={{ background: `${a}18`, border: `1px solid ${a}33` }}
          >
            <div className="h-1.5 w-full rounded" style={{ background: `${a}aa` }} />
            <div className="h-1.5 w-4/5 rounded bg-fg/20" />
            <div className="h-1.5 w-2/3 rounded bg-fg/15" />
          </div>
          <div className="mt-1 flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-2">
            <div className="h-1.5 flex-1 rounded bg-fg/10" />
            <span className="h-5 w-5 shrink-0 rounded-full" style={{ background: a }} />
          </div>
        </div>
      );

    // Fallback → generic dashboard
    default:
      return (
        <div className="space-y-2.5 text-left">
          <div className="h-2.5 w-24 rounded bg-fg/25" />
          <div className="rounded-lg border border-fg/10 bg-fg/[0.03] p-3">
            <Bars accent={a} values={[50, 75, 45, 90, 65]} />
          </div>
        </div>
      );
  }
}

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
          </div>
        </div>

        {/* Preview mock — a UI illustration tailored to what the project does */}
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border-t border-line p-6 sm:p-8 md:border-l md:border-t-0">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(120% 90% at 80% 10%, ${project.accent}40, transparent 55%), radial-gradient(90% 80% at 10% 100%, ${project.accent}22, transparent 60%)`,
            }}
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-fg/10 bg-ink/70 shadow-2xl backdrop-blur-md">
            {/* faux browser bar */}
            <div className="flex items-center gap-1.5 border-b border-fg/10 bg-ink/60 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="ml-2 truncate font-mono text-[10px] text-muted">{project.slug}</span>
            </div>
            <div className="p-4">
              <ProjectMock project={project} />
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
