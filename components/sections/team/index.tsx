import * as React from "react";

import { TeamCard, type TeamMember } from "./team-card";

const TEAM: TeamMember[] = [
  {
    name: "Disha Kemble",
    role: "Ready to turn ideas into reality.",
    image: "/teams/disha.jpeg",
    socials: { x: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Sagar Kemble",
    role: "Ready to create and colaborate",
    image: "/teams/sagar.jpeg",
    socials: { x: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Barun Tiwary",
    role: "Turning ideas into impactful solutions.",
    image: "/teams/barun.jpeg",
    socials: { x: "#", linkedin: "#", github: "#" },
  },
];

export default function Team() {
  return (
    <section id="team" aria-label="Team" className="relative py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 pt-14 pb-16 text-center">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <span aria-hidden className="size-1 rounded-full bg-brand" />
          Our team
        </div>
        <h2 className="font-heading text-4xl font-medium tracking-tight text-balance text-foreground sm:text-5xl whitespace-nowrap">
          Built by Students of{" "}
          <a href="https://chaicode.com/" target="_blank">
            <span className="font-serif italic">Chai Code</span>.
          </a>
        </h2>
        <p className="max-w-xl leading-relaxed tracking-[0.01em] text-muted-foreground">
          Three minds, one mission - building solutions that help businesses
          grow.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
        {TEAM.map((member, i) => (
          <TeamCard key={member.name} {...member} index={i} />
        ))}
      </div>
    </section>
  );
}
