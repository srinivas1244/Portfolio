"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "sending";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: profile.socials.email },
  { icon: LinkedinIcon, label: "LinkedIn", value: "perala-srinivasulu", href: profile.socials.linkedin },
  { icon: GithubIcon, label: "GitHub", value: "srinivas1244", href: profile.socials.github },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast.error("Failed to send message", {
        description: message,
        action: {
          label: "Email me directly",
          onClick: () => window.open(profile.socials.email),
        },
      });
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Left */}
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact"
            highlight="Me"
            subtitle="Open to internships, collaborations and interesting problems. I usually reply within a day."
          />

          <div className="mt-10 space-y-3">
            {channels.map(({ icon: Ico, label, value, href }, i) => {
              const inner = (
                <div className="group flex items-center gap-4 rounded-2xl glass p-4 transition-colors hover:bg-fg/[0.06]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20">
                    <Ico className="h-5 w-5 text-fg" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted">{label}</div>
                    <div className="truncate text-sm font-medium text-fg">{value}</div>
                  </div>
                  {href && (
                    <ArrowUpRight className="ml-auto h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </div>
              );
              return (
                <Reveal key={label} delay={i * 0.06}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right — form */}
        <Reveal delay={0.1} className="relative">
          <div className="relative overflow-hidden rounded-[28px] glass p-7 sm:p-9">
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              {/* honeypot */}
              <input
                type="text"
                name="company"
                title="Leave this field empty"
                value={form.company}
                onChange={update("company")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />
              <Field label="Your name">
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Jane Doe"
                  className="form-input"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="jane@company.com"
                  className="form-input"
                />
              </Field>
              <Field label="Message">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell me about the role, project or idea…"
                  className="form-input resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:shadow-[0_18px_50px_-12px_rgba(255,255,255,0.4)] disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}
