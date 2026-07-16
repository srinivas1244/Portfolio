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

Copy `web/.env.example` → `web/.env.local` for local dev, and set the same vars in
Netlify (**Site settings → Environment variables**). All are optional:

```bash
# Canonical site URL — metadata, OG, sitemap, JSON-LD
NEXT_PUBLIC_SITE_URL=https://perala-srinivasulu.netlify.app

# Formspree form ID — delivers contact-form messages to your inbox.
# Create a free form at https://formspree.io and paste the ID (the part after /f/).
# If empty, the form falls back to opening the visitor's email client.
NEXT_PUBLIC_FORMSPREE_ID=xpzgabcd
```

## ✏️ Make it yours

Almost all content lives in **`src/lib/data.ts`** — profile, roles, skills, the tech galaxy, projects, timeline and certifications.

- **Photo:** replace `public/profile.jpg`.
- **Resume:** replace `public/resume.pdf` (currently a placeholder).
- **Certifications:** the entries in `data.ts` are placeholders — swap in your real titles, issuers and `url`s.
- **Curated projects:** edit the `projects` array; the live GitHub strip auto‑excludes anything already curated (see `CURATED` in `src/lib/github.ts`).

## ◆ Deploy to GitHub Pages (configured)

The app is set up as a **static export** (`output: "export"` in `next.config.ts`) and
ships a GitHub Actions workflow at **`.github/workflows/deploy.yml`** that builds `web/`
and publishes `web/out` to Pages on every push to `main`.

**One-time setup:**
1. Push this repo to GitHub (branch `main`).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Done — the workflow builds & deploys automatically. Site goes live at
   **`https://srinivas1244.github.io/MY-portfolio`**.

The workflow sets `NEXT_PUBLIC_BASE_PATH=/MY-portfolio` (so assets resolve under the
subpath) and `NEXT_PUBLIC_SITE_URL`. Locally, `npm run dev` / `npm run build` run with
no base path so everything serves from the root as usual.

- **Custom domain / `username.github.io` repo?** Remove `NEXT_PUBLIC_BASE_PATH` from the
  workflow (no subpath needed) and set `NEXT_PUBLIC_SITE_URL` to your domain.
- **Contact:** the form was replaced by direct contact cards, so **no backend is needed** —
  perfect for static hosting.
- The **live GitHub repo strip** is fetched at build time, so it refreshes on each deploy.

### Alternative: Netlify
A root `netlify.toml` is also present. To use Netlify instead, remove `output: "export"`
from `next.config.ts` (Netlify runs the full Next.js app), import the repo at
[app.netlify.com](https://app.netlify.com), and it deploys with no other changes.

---

Built with Next.js · Three.js · GSAP · Framer Motion.
