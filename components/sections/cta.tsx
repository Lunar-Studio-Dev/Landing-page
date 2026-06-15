"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";

const HeroWave = dynamic(
  () => import("@/components/sections/hero-wave").then((m) => m.HeroWave),
  { ssr: false },
);

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 19 },
  },
} as const;

/**
 * Closing CTA - a black panel (bookending the hero) with the same WebGL
 * wave, here in interactive mode: it brightens on pointer enter, ripples
 * under the cursor, and settles back on leave. The top edge melts into
 * the page background via a gradient overlay (mirror of the hero's
 * bottom blend) so the section reads as rising out of the page.
 */
export default function Cta() {
  return (
    <section id="contact" aria-label="Contact" className="py-10">
      <div className="relative overflow-hidden bg-black px-6 pt-44 pb-28 text-center sm:pt-52 sm:pb-36">
        <HeroWave interactive idleIntensity={0.35} appearDelay={0.2} />
        {/* blend the top into the page background so the section melts in
            from above instead of starting on a hard edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-7 h-[42%] bg-linear-to-t from-transparent to-background"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-medium tracking-tight text-balance text-white sm:text-6xl"
          >
            Ready to <span className="font-serif italic">transform</span> your
            business?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-md text-base text-white/65 sm:text-lg"
          >
            It takes one call to improve your business.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button
              variant="brand"
              size="lg"
              asChild
              className="group w-full sm:w-auto"
            >
              <Link
                href="/contact-us"
                onClick={() =>
                  posthog.capture("cta_clicked", {
                    location: "cta_section",
                    label: "book_a_free_call",
                  })
                }
              >
                Book a free call
                <ArrowRight
                  data-icon="inline-end"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white sm:w-auto"
            >
              <Link href="/#services">See our work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
