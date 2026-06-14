"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";

const HeroWave = dynamic(
  () => import("@/components/sections/hero-wave").then((m) => m.HeroWave),
  { ssr: false },
);

const ROTATING_WORDS = ["solutions", "workflows", "automations"];
const ROTATE_INTERVAL_MS = 2600;

/**
 * Noto Serif italic glues f→l into a single ligature glyph even with
 * font-variant-ligatures:none, so we render the word in segments and
 * inject a hairline spacer between any "fl" pair.
 */
function renderWord(word: string) {
  const parts = word.split(/(fl)/g);
  return parts.map((part, i) => {
    if (part === "fl") {
      return (
        <React.Fragment key={i}>
          f<span className="inline-block w-[0.09em]" aria-hidden />l
        </React.Fragment>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function RotatingWord() {
  const [index, setIndex] = React.useState(0);
  const [width, setWidth] = React.useState<number | null>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      ROTATE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  const word = ROTATING_WORDS[index];

  // Measure the upcoming word so the container width glides instead of jumping
  React.useLayoutEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth);
    }
  }, [word]);

  return (
    <span className="relative inline-flex">
      <span
        ref={measureRef}
        aria-hidden
        className="invisible absolute font-serif whitespace-pre italic [font-variant-ligatures:none]"
      >
        {renderWord(word)}
      </span>
      <motion.span
        className="-mb-[0.2em] inline-flex overflow-hidden pb-[0.2em] text-foreground"
        style={{ width: width ?? "auto" }}
        animate={width !== null ? { width } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            className="font-serif whitespace-pre italic [font-variant-ligatures:none]"
            initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            {renderWord(word)}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}

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

function Hero() {
  return (
    <section className="min-h-svh">
      <div className="relative flex min-h-[calc(100svh+18vh)] flex-col items-center justify-center overflow-hidden rounded-t-3xl bg-black px-6 pb-[18vh] text-center sm:min-h-[calc(100svh+18vh)]">
        <HeroWave />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-6 opacity-[0.05] mix-blend-overlay bg-[url(/noise.svg)] bg-size-[240px_240px]"
        />
        {/* blend the bottom into the page background so the hero melts into
            the next section instead of ending on a hard edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-7 h-[42%] bg-gradient-to-b from-transparent to-background"
        />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex max-w-4xl flex-col items-center gap-8 pb-12"
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl font-medium tracking-tight text-balance sm:text-7xl"
          >
            <span className="block">
              We Build <RotatingWord />
            </span>
            <span className="block">That Grow Businesses</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base text-white/65 sm:text-lg"
          >
            We build websites, tools, and systems that help your business grow
            and run without constant manual effort. Whatever is slowing you down
            digitally - we identify it, build it.
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
              <Link href="/contact-us">
                Book a free call
                <ArrowRight
                  data-icon="inline-end"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Link href="/#services" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white sm:w-auto"
              >
                Our services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { Hero };
