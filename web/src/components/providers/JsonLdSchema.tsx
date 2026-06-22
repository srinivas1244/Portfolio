import { profile } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perala-srinivasulu.vercel.app";

export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    jobTitle: profile.roles[0],
    description: "AI Engineer, Full-Stack Developer & Cloud Enthusiast",
    sameAs: [
      profile.socials.github,
      profile.socials.linkedin,
      profile.socials.email,
    ],
    location: {
      "@type": "Place",
      name: profile.location,
    },
    email: profile.email,
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Spring Boot",
      "Java",
      "Python",
      "Cloud",
      "AI",
      "Machine Learning",
      "Generative AI",
      "Gemini",
      "Claude",
    ],
    worksFor: {
      "@type": "EducationalOrganization",
      name: "KLH University",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
      suppressHydrationWarning
    />
  );
}
