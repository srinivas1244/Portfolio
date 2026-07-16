/**
 * Single source of truth for all portfolio content.
 * Curated from Perala Srinivasulu's real GitHub + LinkedIn presence.
 */

export const profile = {
  name: "Perala Srinivasulu",
  shortName: "Srinivasulu",
  initials: "PS",
  roles: ["AI Engineer", "Full-Stack Developer", "Cloud Enthusiast"],
  // Typewriter rotates through these after the static "I build".
  typewriter: [
    "AI-powered platforms.",
    "full-stack web apps.",
    "cloud-native systems.",
    "tools that solve real problems.",
  ],
  tagline: "B.Tech CSE @ KLH University · Hyderabad, India",
  intro:
    "I design and ship intelligent products end-to-end — from React interfaces to Spring Boot APIs and AI services powered by Gemini and Claude. I care about clean architecture, performance that holds up, and experiences people actually enjoy.",
  location: "Hyderabad, India",
  email: "srinivasuluperala2006@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/srinivas1244",
    linkedin: "https://www.linkedin.com/in/perala-srinivasulu-068184315/",
    email: "mailto:srinivasuluperala2006@gmail.com",
  },
  stats: [
    { value: 6, suffix: "+", label: "Projects shipped" },
    { value: 4, suffix: "+", label: "AI / full-stack apps" },
    { value: 12, suffix: "+", label: "Technologies" },
    { value: 4, suffix: "", label: "GitHub achievements" },
  ],
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

/* ──────────────────────────────  ABOUT / JOURNEY  ────────────────────────── */

export const journeyArc = [
  {
    phase: "01",
    title: "Student",
    copy: "Started with curiosity and a terminal — data structures, algorithms, and the joy of making a machine do something useful.",
  },
  {
    phase: "02",
    title: "Developer",
    copy: "Grew into full-stack engineering: React on the front, Spring Boot and Node on the back, real databases, real auth, real deployments.",
  },
  {
    phase: "03",
    title: "AI Builder",
    copy: "Now I wire intelligence into products — Gemini and Claude, OCR, retrieval and agents — turning models into features that help people.",
  },
  {
    phase: "04",
    title: "Future Engineer",
    copy: "Heading toward cloud-native, AI-first systems that scale. Always iterating, always shipping, always learning the next thing.",
  },
] as const;

export const aboutHighlights = [
  {
    icon: "Brain",
    title: "AI Engineering",
    copy: "Integrating LLMs (Gemini, Claude), OCR and analytics into real applications.",
  },
  {
    icon: "Layers",
    title: "Full-Stack Craft",
    copy: "React + Spring Boot/Node, REST APIs, JWT auth, PostgreSQL — built to last.",
  },
  {
    icon: "Cloud",
    title: "Cloud-Native",
    copy: "Shipping on Vercel & Supabase with an eye on scalability and DX.",
  },
  {
    icon: "Zap",
    title: "Performance",
    copy: "Accessible, fast, 60fps interfaces that feel effortless on any device.",
  },
] as const;

/* ─────────────────────────────────  SKILLS  ──────────────────────────────── */

export type SkillCategory = {
  num: string;
  title: string;
  icon: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    num: "01",
    title: "Frontend",
    icon: "MonitorSmartphone",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    num: "02",
    title: "Backend",
    icon: "Server",
    skills: ["Spring Boot", "Java", "Node.js", "REST APIs", "JWT Auth", "Hibernate / JPA", "Maven"],
  },
  {
    num: "03",
    title: "AI / ML",
    icon: "Sparkles",
    skills: ["Google Gemini", "Anthropic Claude API", "Prompt Engineering", "OCR", "AI Agents", "RAG"],
  },
  {
    num: "04",
    title: "Cloud / DevOps",
    icon: "Cloud",
    skills: ["Vercel", "Supabase", "Git & GitHub", "CI/CD", "Vite"],
  },
  {
    num: "05",
    title: "Databases",
    icon: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  },
  {
    num: "06",
    title: "Languages",
    icon: "Code2",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
  },
];

// Nodes for the interactive 3D tech galaxy. `ring` groups them into orbits.
export type TechNode = { label: string; color: string; ring: 0 | 1 | 2 };

export const techGalaxy: TechNode[] = [
  { label: "React", color: "#61dafb", ring: 0 },
  { label: "Next.js", color: "#ffffff", ring: 0 },
  { label: "TypeScript", color: "#3178c6", ring: 0 },
  { label: "Spring Boot", color: "#6db33f", ring: 1 },
  { label: "Java", color: "#f89820", ring: 1 },
  { label: "Node.js", color: "#83cd29", ring: 1 },
  { label: "Python", color: "#ffd43b", ring: 1 },
  { label: "Gemini", color: "#8e7bff", ring: 2 },
  { label: "Claude", color: "#d97757", ring: 2 },
  { label: "PostgreSQL", color: "#4169e1", ring: 2 },
  { label: "Supabase", color: "#3ecf8e", ring: 2 },
  { label: "Tailwind", color: "#38bdf8", ring: 0 },
  { label: "Vercel", color: "#e5e7eb", ring: 1 },
  { label: "MongoDB", color: "#47a248", ring: 2 },
];

// Layers for the isometric "stack" visualisation (top = what users see).
export type StackLayer = {
  name: string;
  caption: string;
  techs: string[];
  from: string;
  to: string;
};

export const stackLayers: StackLayer[] = [
  {
    name: "Frontend",
    caption: "What users see & feel",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    from: "#ffb86b",
    to: "#ff5ca8",
  },
  {
    name: "Backend & APIs",
    caption: "Business logic & data flow",
    techs: ["Spring Boot", "Java", "Node.js", "REST", "JWT"],
    from: "#ff5ca8",
    to: "#7c5cff",
  },
  {
    name: "AI / ML",
    caption: "The intelligence layer",
    techs: ["Gemini", "Claude", "OCR", "AI Agents", "RAG"],
    from: "#7c5cff",
    to: "#22d3ee",
  },
  {
    name: "Cloud & Data",
    caption: "Where everything runs",
    techs: ["Vercel", "Supabase", "PostgreSQL", "MongoDB"],
    from: "#22d3ee",
    to: "#3ecf8e",
  },
  {
    name: "Foundations",
    caption: "Languages & fundamentals",
    techs: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
    from: "#8b93ff",
    to: "#4169e1",
  },
];

/* ────────────────────────────────  PROJECTS  ─────────────────────────────── */

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  accent: string; // hex used for ambient glow
  image?: string; // optional local screenshot (e.g. /projects/foo.png); falls back to the GitHub OG card
  github: string;
  live?: string;
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    slug: "student-gap-analyzer",
    title: "Student Gap Analyzer",
    category: "AI · Full-Stack",
    year: "2026",
    tagline: "AI-powered academic performance analysis",
    description:
      "An intelligent analytics platform that detects learning gaps, monitors semester performance, and generates personalized, AI-driven recommendations for academic improvement.",
    features: [
      "Semester-wise & subject-level performance analytics",
      "Google Gemini insights + performance forecasting",
      "OCR marksheet uploads with auto-generated profiles",
      "JWT-secured auth and a responsive dark-mode UI",
    ],
    tech: ["React", "Spring Boot", "Java 25", "PostgreSQL", "Google Gemini", "JWT", "Hibernate"],
    accent: "#8e7bff",
    github: "https://github.com/srinivas1244/Student-Gap-Analyzer",
    flagship: true,
  },
  {
    slug: "event-management-system",
    title: "Event Management System",
    category: "Full-Stack · Cloud",
    year: "2026",
    tagline: "Campus events, registration & analytics",
    description:
      "A full-stack campus event platform with role-based access, event registration, attendance tracking, auto-issued certificates, and a live analytics dashboard.",
    features: [
      "Role-based access control (admin / organizer / student)",
      "Event registration & real-time attendance tracking",
      "Automated certificate generation",
      "Analytics dashboard for organizers",
    ],
    tech: ["TypeScript", "Spring Boot", "React", "PostgreSQL", "JWT"],
    accent: "#22d3ee",
    github: "https://github.com/srinivas1244/Event-management-system",
    live: "https://event-management-system-fedf.vercel.app",
    flagship: true,
  },
  {
    slug: "skillgap-analysis",
    title: "SkillGap Analysis",
    category: "AI · Cloud",
    year: "2026",
    tagline: "Close the gap to your target role",
    description:
      "An AI skill-analytics platform that maps your current skills against a target role, tracks skill decay, and recommends personalized learning paths to stay competitive.",
    features: [
      "Skill analytics dashboard & readiness scoring",
      "Gap analysis vs. target-role requirements",
      "Claude-powered course recommendations",
      "Decay tracking, streaks & progress monitoring",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Supabase", "Claude API", "Framer Motion"],
    accent: "#d97757",
    github: "https://github.com/srinivas1244/SkillGap-Analysis",
    live: "https://skill-gap-analysis-xi.vercel.app",
    flagship: true,
  },
  {
    slug: "ai-repo-agent",
    title: "AI Repo Agent",
    category: "AI · Tooling",
    year: "2026",
    tagline: "An agent that understands your code",
    description:
      "An experimental AI agent that explores and reasons over GitHub repositories — answering questions about a codebase and surfacing structure on demand.",
    features: [
      "Conversational interface over a repository",
      "LLM-driven code understanding",
      "Lightweight, browser-based experience",
    ],
    tech: ["JavaScript", "HTML", "LLM APIs"],
    accent: "#7c5cff",
    github: "https://github.com/srinivas1244/ai-repo-agent",
  },
];

/* ──────────────────────────  EXPERIENCE / JOURNEY  ───────────────────────── */

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  kind: "education" | "build" | "achievement";
  copy: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2024 — 2028",
    title: "B.Tech, Computer Science & Engineering",
    org: "KLH University, Hyderabad",
    kind: "education",
    copy: "Building strong foundations in algorithms, data structures, software engineering and web technologies — active in coding contests and project hackathons.",
  },
  {
    period: "2026",
    title: "Shipped 3 AI & Full-Stack Platforms",
    org: "Independent builds",
    kind: "build",
    copy: "Designed and deployed Student Gap Analyzer, Event Management System and SkillGap Analysis — integrating Gemini & Claude, PostgreSQL, JWT auth and cloud deploys.",
  },
  {
    period: "2026",
    title: "GitHub Achievements",
    org: "github.com/srinivas1244",
    kind: "achievement",
    copy: "Earned Pull Shark (×2), YOLO and Quickdraw — a track record of consistent shipping and merged work.",
  },
  {
    period: "2022 — 2024",
    title: "Intermediate (MPC)",
    org: "Page Junior College, Hyderabad",
    kind: "education",
    copy: "Maths, Physics & Chemistry with intensive problem-solving — sharpened analytical thinking and first serious programming exposure.",
  },
  {
    period: "2019 — 2021",
    title: "Secondary School",
    org: "Sri Chaitanya School",
    kind: "education",
    copy: "Foundation years emphasizing STEM habits and early analytical thinking that fed into engineering prep.",
  },
];

/* ─────────────────────────────  CERTIFICATIONS  ──────────────────────────── */
// NOTE: Replace these with your real certificates (title, issuer, link, image).
export type Certification = {
  title: string;
  issuer: string;
  year: string;
  blurb: string;
  skills: string[];
  url?: string;
};

export const certifications: Certification[] = [
  {
    title: "Full-Stack Web Development",
    issuer: "Self-paced track",
    year: "2025",
    blurb: "End-to-end development with React, REST APIs and modern JavaScript tooling.",
    skills: ["React", "Node.js", "REST"],
  },
  {
    title: "Java & Spring Boot",
    issuer: "Self-paced track",
    year: "2025",
    blurb: "Backend engineering with Spring Boot, JPA/Hibernate and secure JWT auth.",
    skills: ["Java", "Spring Boot", "JWT"],
  },
  {
    title: "Generative AI Foundations",
    issuer: "Self-paced track",
    year: "2026",
    blurb: "Working with LLM APIs, prompt engineering and AI-feature integration.",
    skills: ["Gemini", "Claude", "Prompting"],
  },
  {
    title: "Cloud & Databases",
    issuer: "Self-paced track",
    year: "2026",
    blurb: "PostgreSQL, Supabase and deploying cloud-native apps on Vercel.",
    skills: ["PostgreSQL", "Supabase", "Vercel"],
  },
];
