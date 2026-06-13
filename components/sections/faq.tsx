"use client";

import * as React from "react";
import { Accordion } from "radix-ui";

import { ArrowLink } from "@/components/sections/services/blueprint-grid";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Will your solutions work with the systems we already use?",
    answer:
      "Yes. We design everything to integrate with your existing tools, platforms, and data sources — whether that's your CRM, ERP, internal databases, or third-party APIs. You won't need to rip and replace what's already working.",
  },
  {
    question: "We're new to AI — where should we even start?",
    answer:
      "That's exactly what our AI Consultation is for. We begin with a deep dive into your current operations, identify where AI can create the most impact, and build a practical roadmap — no jargon, no guesswork, just a clear plan tailored to your business.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We've worked across a range of industries, including finance, healthcare, retail, and logistics. While the tools and use cases vary, our approach stays the same — understand your specific challenges first, then build solutions that fit.",
  },
  {
    question: "Do we need an in-house AI or tech team to work with you?",
    answer:
      "Not at all. We handle the technical heavy lifting from start to finish. Whether you have an internal tech team we collaborate with, or none at all, we adapt our process to fit smoothly into how your organisation operates.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "We don't just hand it off and disappear. We offer ongoing support, monitoring, and optimisation to make sure your systems continue performing well and evolving alongside your business needs.",
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
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:col-span-5">
          <div className="flex items-center gap-2  text-[11px] tracking-[0.14em] text-brand pl-1 uppercase">
            Frequently asked
          </div>
          <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Questions answered.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed tracking-[0.01em] text-muted-foreground">
            Still curious about something we didn&apos;t cover?
          </p>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          defaultValue="faq-0"
          className="divide-y divide-border/40 overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--color-foreground)_3%,var(--color-background))] lg:col-span-7"
        >
          {FAQS.map(({ question, answer }, i) => (
            <Accordion.Item key={question} value={`faq-${i}`}>
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    "group flex w-full items-center gap-4 p-5 text-left transition-colors duration-150",
                    "hover:bg-[color-mix(in_oklab,var(--color-foreground)_5%,var(--color-background))]",
                  )}
                >
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
                <p className="px-5 pt-0 pb-5 text-sm leading-relaxed text-muted-foreground">
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
