"use client";

import { useEffect, useState } from "react";

/** Classic type / pause / delete loop through a list of phrases. */
export function Typewriter({
  phrases,
  className,
}: {
  phrases: readonly string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let delay = deleting ? 45 : 75;

    if (!deleting && text === current) {
      delay = 1600; // hold at full word
    } else if (deleting && text === "") {
      delay = 280;
    }

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, phrases]);

  return (
    <span className={className}>
      <span className="text-gradient">{text}</span>
      <span className="ml-0.5 inline-block w-[2px] -translate-y-0.5 animate-pulse bg-cyan align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}
