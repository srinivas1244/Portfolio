import { techGalaxy } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";

const techs = techGalaxy.map((t) => t.label);

/** A scrolling band of technologies — adds motion and rhythm between sections. */
export function TechMarquee() {
  return (
    <section aria-hidden className="relative border-y border-line py-6 sm:py-8">
      <Marquee items={techs} />
    </section>
  );
}
