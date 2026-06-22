# Perala Srinivasulu — Portfolio

A premium, immersive personal portfolio for **Perala Srinivasulu** — AI Engineer, Full‑Stack Developer & Cloud Enthusiast. Dark, cinematic, glassmorphic, with real‑time 3D, smooth scrolling, scroll‑linked storytelling and micro‑interactions throughout.

> Built as a fresh **Next.js 16** app in this `web/` subfolder. The original static HTML site remains untouched at the repo root.

---

## ✨ Highlights

- **3D hero scene** — morphing AI "core" + floating geometry + sparkles, mouse‑reactive camera (React Three Fiber + Drei).
- **Interactive skills galaxy** — orbiting tech nodes in WebGL with hover labels.
- **GSAP horizontal project gallery** — pinned, scrub‑scrolled flagship panels.
- **Hybrid projects** — curated, richly‑detailed flagships **+** a live GitHub strip fetched at build time (ISR).
- **Lenis smooth scrolling** synced to GSAP ScrollTrigger.
- **Custom glow cursor**, magnetic buttons, text‑reveal & stagger animations, animated counters.
- **Scroll‑linked timeline**, certificate modal cards, animated contact form with success state.
- **Accessible & fast** — reduced‑motion + mobile fallbacks for all heavy effects, full SEO metadata, sitemap & robots.

## 🧱 Tech stack

| Area | Tools |
|------|-------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, custom design tokens, glassmorphism |
| Animation | Framer Motion, GSAP + ScrollTrigger, Lenis |
| 3D | Three.js, React Three Fiber, Drei |
| Icons | lucide-react + custom brand SVGs |

## 📁 Structure

```
web/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          # fonts, SEO metadata, global chrome
│  │  ├─ page.tsx            # server component — fetches repos, composes sections
│  │  ├─ globals.css         # design tokens + utilities (Tailwind v4)
│  │  ├─ sitemap.ts / robots.ts
│  │  └─ api/contact/route.ts
│  ├─ components/
│  │  ├─ providers/SmoothScroll.tsx
│  │  ├─ layout/   (Navbar, Footer)
│  │  ├─ sections/ (Hero, About, Skills, Projects, Experience, Certifications, Contact)
│  │  ├─ three/    (HeroScene, GalaxyScene + ssr:false wrappers)
│  │  └─ ui/       (Magnetic, Reveal, SplitText, Typewriter, Counter, Cursor, …)
│  ├─ hooks/useMedia.ts
│  └─ lib/   (data.ts — all content · github.ts — live repos · utils.ts)
└─ public/  (profile.jpg, resume.pdf)
```

## 🚀 Getting started

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

Requires Node 20.9+.

## ⚙️ Environment variables

Create `web/.env.local` (all optional):

```bash
# Canonical site URL (used for metadata, OG, sitemap)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: forward contact-form messages to a webhook (Discord/Slack/Make/Zapier).
# Without it, the form still succeeds gracefully.
CONTACT_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/yyy
```

## ✏️ Make it yours

Almost all content lives in **`src/lib/data.ts`** — profile, roles, skills, the tech galaxy, projects, timeline and certifications.

- **Photo:** replace `public/profile.jpg`.
- **Resume:** replace `public/resume.pdf` (currently a placeholder).
- **Certifications:** the entries in `data.ts` are placeholders — swap in your real titles, issuers and `url`s.
- **Curated projects:** edit the `projects` array; the live GitHub strip auto‑excludes anything already curated (see `CURATED` in `src/lib/github.ts`).

## ▲ Deploy to Vercel

1. Push this repo to GitHub (already done).
2. On [vercel.com/new](https://vercel.com/new), import the repo.
3. **Set the Root Directory to `web`** (Project Settings → General).
4. (Optional) add the env vars above.
5. Deploy. Vercel auto‑detects Next.js — no extra config needed.

The home page is statically prerendered with daily ISR for the live GitHub strip; `/api/contact` runs as a serverless function.

---

Built with Next.js · Three.js · GSAP · Framer Motion.
