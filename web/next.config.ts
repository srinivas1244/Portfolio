import type { NextConfig } from "next";

// Base path for GitHub Pages project sites (srinivas1244.github.io/MY-portfolio).
// Set NEXT_PUBLIC_BASE_PATH=/MY-portfolio in the deploy workflow; empty locally so
// `npm run dev` / `npm run build` still serve from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` for GitHub Pages.
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,

  images: {
    // Static export can't run the image optimizer.
    unoptimized: true,
  },

  // three.js ships untranspiled ESM in places; keep Turbopack happy resolving it.
  transpilePackages: ["three"],
};

export default nextConfig;
