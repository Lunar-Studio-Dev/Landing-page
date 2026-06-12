"use client";

import * as React from "react";

import {
  ArrowLink,
  BlueprintGrid,
  FigureCell,
  GridCell,
  GridSpacer,
  ServiceCard,
} from "./blueprint-grid";
import { FigAutomations } from "./figures/fig-automations";
import { FigBlocks } from "./figures/fig-blocks";
import { FigPipeline } from "./figures/fig-pipeline";
import { FigRoadmap } from "./figures/fig-roadmap";

const SERVICES = [
  {
    title: "Work Smarter, Not Harder",
    body: "Free your teams from repetitive work. We design and deploy intelligent automations that reduce manual effort, minimize errors, and let your people focus on what matters most.",
  },
  {
    title: "Your AI Roadmap, Built for Results",
    body: "Not sure where AI fits in your business? We help you figure that out. Our experts assess your operations, identify high-impact opportunities, and create a clear AI roadmap tailored to your organisation.",
  },
  {
    title: "Software That Grows With You",
    body: "We build enterprise-grade software designed around your specific needs — scalable, secure, and built to integrate seamlessly with your existing systems.",
  },
  {
    title: "Connect Everything. Miss Nothing.",
    body: "From data processing to decision-making, we engineer end-to-end AI workflows that connect your tools, teams, and processes into one intelligent, efficient system.",
  },
];

/*
 * A detached centered header introduces the section; the blueprint grid
 * below holds only the service rows. Grid placements (column 1 and the
 * last column are full-bleed gutters, content lives in columns 2..N+1).
 * The fig/card direction alternates row by row on lg:
 *
 *   lg (3 cols)                      md (2 cols)              base (1 col)
 *   r1  ── spacer row ──             ── spacer row ──         each cell its
 *   r2  FIG automations (x2) | card  FIG automations (x2)     own row, figure
 *   r3  card | FIG roadmap (x2)      card auto | card consult above its card
 *   r4  FIG blocks (x2) | card       FIG roadmap | FIG blocks
 *   r5  card | FIG pipeline (x2)     card sw | card wf
 *   r6  ── | CTA | ──                FIG pipeline (x2)
 *                                    CTA (x2)
 */
export default function Services() {
  return (
    <section id="services" aria-label="Services" className="relative py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 pt-14 pb-16 text-center">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <span aria-hidden className="size-1 rounded-full bg-brand" />
          Our services
        </div>
        <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          What we do.
        </h2>
        <p className="max-w-xl font-mono text-sm leading-relaxed tracking-[0.01em] text-muted-foreground">
          We find what slows your business down — then design the automations,
          software, and AI systems that fix it for good.
        </p>
      </div>

      <BlueprintGrid>
        {Array.from({ length: 5 }).map((_, i) => (
          <GridSpacer key={`lead-${i}`} />
        ))}

        <FigureCell
          area="2 / 2"
          areaMd="2 / 2 / span 1 / span 2"
          areaLg="2 / 2 / span 1 / span 2"
          className="min-h-[260px]"
        >
          {(animated) => (
            <FigAutomations
              animated={animated}
              className="h-auto w-full max-w-[520px]"
            />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[0]} area="3 / 2" areaMd="3 / 2" areaLg="2 / 4" />

        <FigureCell
          once={false}
          area="4 / 2"
          areaMd="4 / 2"
          areaLg="3 / 3 / span 1 / span 2"
          className="min-h-[280px]"
        >
          {(animated) => (
            <FigRoadmap animated={animated} className="h-auto w-full max-w-[280px]" />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[1]} area="5 / 2" areaMd="3 / 3" areaLg="3 / 2" />

        <FigureCell
          area="6 / 2"
          areaMd="4 / 3"
          areaLg="4 / 2 / span 1 / span 2"
          className="min-h-[260px]"
        >
          {(animated) => (
            <FigBlocks
              animated={animated}
              className="h-auto w-full max-w-[460px]"
            />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[2]} area="7 / 2" areaMd="5 / 2" areaLg="4 / 4" />

        <FigureCell
          area="8 / 2"
          areaMd="6 / 2 / span 1 / span 2"
          areaLg="5 / 3 / span 1 / span 2"
          className="min-h-[260px]"
        >
          {(animated) => (
            <FigPipeline
              animated={animated}
              className="h-auto w-full max-w-[520px]"
            />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[3]} area="9 / 2" areaMd="5 / 3" areaLg="5 / 2" />

        <GridCell
          area="10 / 2"
          areaMd="7 / 2 / span 1 / span 2"
          areaLg="6 / 3"
          className="items-center justify-center p-6"
        >
          <ArrowLink href="#contact">Book a free call</ArrowLink>
        </GridCell>

        {Array.from({ length: 20 }).map((_, i) => (
          <GridSpacer key={`trail-${i}`} />
        ))}
      </BlueprintGrid>
    </section>
  );
}
