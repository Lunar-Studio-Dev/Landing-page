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
import { FigStack } from "./figures/fig-stack";

const SERVICES = [
  {
    eyebrow: "AI Automations",
    title: "Work Smarter, Not Harder",
    body: "Free your teams from repetitive work. We design and deploy intelligent automations that reduce manual effort, minimize errors, and let your people focus on what matters most.",
  },
  {
    eyebrow: "AI Consultation",
    title: "Your AI Roadmap, Built for Results",
    body: "Not sure where AI fits in your business? We help you figure that out. Our experts assess your operations, identify high-impact opportunities, and create a clear AI roadmap tailored to your organisation.",
  },
  {
    eyebrow: "Custom Software Solutions",
    title: "Software That Grows With You",
    body: "We build enterprise-grade software designed around your specific needs — scalable, secure, and built to integrate seamlessly with your existing systems.",
  },
  {
    eyebrow: "AI Workflows",
    title: "Connect Everything. Miss Nothing.",
    body: "From data processing to decision-making, we engineer end-to-end AI workflows that connect your tools, teams, and processes into one intelligent, efficient system.",
  },
];

/*
 * Grid placements (column 1 and the last column are full-bleed gutters,
 * content lives in columns 2..N+1). The fig/card direction alternates
 * row by row on lg:
 *
 *   lg (3 cols)                      md (2 cols)            base (1 col)
 *   r2  title | FIG stack (2x2)      title | FIG stack      each cell its
 *   r3  intro |                      intro |                own row, figure
 *   r4  ── breathing row ──          ── breathing row ──    above its card
 *   r5  FIG automations (x2) | card  FIG automations (x2)
 *   r6  card | FIG roadmap (x2)      card auto | card consult
 *   r7  FIG blocks (x2) | card       FIG roadmap | FIG blocks
 *   r8  card | FIG pipeline (x2)     card sw | card wf
 *   r9  ── | CTA | ──                FIG pipeline (x2)
 *                                    CTA (x2)
 */
export default function Services() {
  return (
    <section id="services" aria-label="Services" className="relative py-10">
      <BlueprintGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <GridSpacer key={`lead-${i}`} />
        ))}

        <GridCell
          area="2 / 2"
          className="flex-col justify-end p-6 lg:min-h-44"
        >
          <h3 className="font-heading text-4xl font-medium tracking-tight text-foreground lg:text-5xl">
            What we do.
          </h3>
        </GridCell>

        <GridCell area="3 / 2" className="flex-col justify-between gap-8 p-6">
          <p className="font-mono text-sm leading-relaxed tracking-[0.01em] text-muted-foreground">
            We find what slows your business down — then design the
            automations, software, and AI systems that fix it for good.
          </p>
          <ArrowLink href="#contact">Book a free call</ArrowLink>
        </GridCell>

        <FigureCell
          area="4 / 2"
          areaMd="2 / 3 / span 2 / span 1"
          areaLg="2 / 3 / span 2 / span 2"
          className="min-h-[320px]"
        >
          {(animated) => (
            <FigStack animated={animated} className="h-auto w-full max-w-[460px]" />
          )}
        </FigureCell>

        <FigureCell
          area="5 / 2"
          areaMd="5 / 2 / span 1 / span 2"
          areaLg="5 / 2 / span 1 / span 2"
          className="min-h-[260px]"
        >
          {(animated) => (
            <FigAutomations
              animated={animated}
              className="h-auto w-full max-w-[520px]"
            />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[0]} area="6 / 2" areaMd="6 / 2" areaLg="5 / 4" />

        <FigureCell
          once={false}
          area="7 / 2"
          areaMd="7 / 2"
          areaLg="6 / 3 / span 1 / span 2"
          className="min-h-[280px]"
        >
          {(animated) => (
            <FigRoadmap animated={animated} className="h-auto w-full max-w-[280px]" />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[1]} area="8 / 2" areaMd="6 / 3" areaLg="6 / 2" />

        <FigureCell
          area="9 / 2"
          areaMd="7 / 3"
          areaLg="7 / 2 / span 1 / span 2"
          className="min-h-[260px]"
        >
          {(animated) => (
            <FigBlocks
              animated={animated}
              className="h-auto w-full max-w-[460px]"
            />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[2]} area="10 / 2" areaMd="8 / 2" areaLg="7 / 4" />

        <FigureCell
          area="11 / 2"
          areaMd="9 / 2 / span 1 / span 2"
          areaLg="8 / 3 / span 1 / span 2"
          className="min-h-[260px]"
        >
          {(animated) => (
            <FigPipeline
              animated={animated}
              className="h-auto w-full max-w-[520px]"
            />
          )}
        </FigureCell>
        <ServiceCard {...SERVICES[3]} area="12 / 2" areaMd="8 / 3" areaLg="8 / 2" />

        <GridCell
          area="13 / 2"
          areaMd="10 / 2 / span 1 / span 2"
          areaLg="9 / 3"
          className="items-center justify-center p-6"
        >
          <ArrowLink href="#contact">Book a free call</ArrowLink>
        </GridCell>

        {Array.from({ length: 24 }).map((_, i) => (
          <GridSpacer key={`trail-${i}`} />
        ))}
      </BlueprintGrid>
    </section>
  );
}
