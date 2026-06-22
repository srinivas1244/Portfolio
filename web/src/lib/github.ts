/**
 * Live GitHub data for the "More on GitHub" strip (hybrid projects strategy).
 * Curated flagship projects live in `data.ts`; this fetches the rest at build
 * time with ISR revalidation, and degrades gracefully if the API is unreachable.
 */

export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  updated_at: string;
};

export const GITHUB_USER = "srinivas1244";

// Repos already showcased as curated flagships — excluded from the live strip.
const CURATED = new Set([
  "student-gap-analyzer",
  "event-management-system",
  "skillgap-analysis",
  "ai-repo-agent",
  "portfolio",
  "my-portfolio",
]);

/** Fetch public repos, newest first, excluding forks and curated flagships. */
export async function getGithubRepos(limit = 6): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // Revalidate once a day so the strip stays fresh without hammering the API.
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GithubRepo[];
    return repos
      .filter((r) => !r.fork && !CURATED.has(r.name.toLowerCase()))
      .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
      .slice(0, limit);
  } catch {
    return [];
  }
}
