import { getGithubRepos } from "@/lib/github";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default async function Home() {
  // Hybrid projects: curated flagships live in data.ts; this is the live strip.
  const repos = await getGithubRepos(6);

  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Projects repos={repos} />
      <Experience />
      <Contact />
    </>
  );
}
