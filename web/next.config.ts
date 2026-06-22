import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // GitHub avatars / OpenGraph images for the live repo strip.
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  
  // three.js ships untranspiled ESM in places; keep Turbopack happy resolving it.
  transpilePackages: ["three"],
};

export default nextConfig;
