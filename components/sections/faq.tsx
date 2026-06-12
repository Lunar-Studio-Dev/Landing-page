"use client";

import * as React from "react";
import { Accordion } from "radix-ui";

import { ArrowLink } from "@/components/sections/services/blueprint-grid";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What does Lunar Studio actually build?",
    answer:
      "Websites, internal tools, automations, and AI systems. If a process slows your business down — manual reporting, repetitive admin, disconnected tools — we design and build the system that removes it.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Most automation projects ship in two to four weeks. Larger custom software builds are delivered in milestones, so you see working pieces early instead of waiting months for a big reveal.",
  },
  {
    question: "Do you work with non-technical teams?",
    answer:
      "Yes — most of our clients don't have an engineering team. We handle the technical side end to end and hand over systems your team can actually operate, with documentation and training included.",
  },
  {
    question: "What does a project cost?",
    answer:
      "It depends on scope. After a free call we send a fixed-price proposal — no hourly billing, no surprise invoices. If we don't think automation will pay for itself, we'll tell you that too.",
  },
  {
    question: "Who owns the code and the systems?",
    answer:
      "You do. Everything we build — code, accounts, infrastructure — is owned by you from day one. No lock-in: any developer can pick up where we left off.",
  },
];

function PlusMinusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-90"
    >
      <line
        x1="2.5"
        y1="8"
        x2="13.5"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="2.5"
        x2="8"
        y2="13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="origin-center transition-transform duration-300 group-data-[state=open]:scale-y-0"
      />
    </svg>
  );
}

export default function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:col-span-5">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            <span aria-hidden className="size-1 rounded-full bg-brand" />
            FAQ
          </div>
          <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Questions answered.
          </h2>
          <p className="max-w-sm font-mono text-sm leading-relaxed tracking-[0.01em] text-muted-foreground">
            Still curious about something we didn&apos;t cover?
          </p>
          <ArrowLink href="#contact">Book a free call</ArrowLink>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          defaultValue="faq-0"
          className="divide-y divide-border overflow-hidden rounded-2xl border bg-card lg:col-span-7"
        >
          {FAQS.map(({ question, answer }, i) => (
            <Accordion.Item key={question} value={`faq-${i}`}>
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    "group flex w-full items-center gap-4 p-5 text-left transition-colors duration-150",
                    "hover:bg-[color-mix(in_oklab,var(--color-foreground)_3%,var(--color-card))]",
                  )}
                >
                  <span className="w-6 shrink-0 font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground sm:text-base">
                    {question}
                  </span>
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-all duration-300",
                      "group-data-[state=open]:border-transparent group-data-[state=open]:bg-brand group-data-[state=open]:text-brand-foreground group-data-[state=open]:shadow-[0_0_16px_var(--brand-glow)]",
                    )}
                  >
                    <PlusMinusIcon />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-5 pt-0 pb-5 pl-15 text-sm leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
