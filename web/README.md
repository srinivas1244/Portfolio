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

## ◆ Deploy to Netlify

The repo ships a root **`netlify.toml`** that points Netlify at the `web/` subfolder
and enables the official Next.js runtime — so the full app (incl. the live GitHub
strip with ISR) runs without any static-export limitations.

1. Push this repo to GitHub.
2. On [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml` automatically — **no manual build settings needed**
   (base `web`, build `npm run build`, Next.js plugin, Node 22).
4. Add the env vars above under **Site settings → Environment variables** (set
   `NEXT_PUBLIC_SITE_URL` to your Netlify URL, and `NEXT_PUBLIC_FORMSPREE_ID` to receive messages).
5. Deploy. 🎉

> **Contact form:** uses [Formspree](https://formspree.io) when `NEXT_PUBLIC_FORMSPREE_ID`
> is set (messages go to your inbox), otherwise it opens the visitor's email client.
> No backend required, so it also works if you ever switch to a static host.

### Prefer GitHub Pages?
GitHub Pages is static-only. You'd add `output: "export"` + `basePath: "/MY-portfolio"`
to `next.config.ts`, set `images.unoptimized: true`, and deploy `web/out` via GitHub
Actions. The Formspree/mailto contact form already works without a server. Ask and this
can be wired up.

---

Built with Next.js · Three.js · GSAP · Framer Motion.
