"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"

const HeroWave = dynamic(
  () => import("@/components/sections/hero-wave").then((m) => m.HeroWave),
  { ssr: false }
)

const ROTATING_WORDS = ["solutions", "workflows", "automations"]
const ROTATE_INTERVAL_MS = 2600

function RotatingWord() {
  const [index, setIndex] = React.useState(0)
  const [width, setWidth] = React.useState<number | null>(null)
  const measureRef = React.useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      ROTATE_INTERVAL_MS
    )
    return () => clearInterval(id)
  }, [])

  const word = ROTATING_WORDS[index]

  // Measure the upcoming word so the container width glides instead of jumping
  React.useLayoutEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth)
    }
  }, [word])

  return (
    <span className="relative inline-flex">
      <span
        ref={measureRef}
        aria-hidden
        className="invisible absolute font-serif whitespace-pre italic"
      >
        {word}
      </span>
      <motion.span
        className="inline-flex overflow-hidden text-brand"
        style={{ width: width ?? "auto" }}
        animate={width !== null ? { width } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            className="font-serif whitespace-pre italic"
            initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  )
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 19 },
  },
} as const

function Hero() {
  return (
    <section className="min-h-svh">
      <div className="relative flex min-h-[calc(100svh)] flex-col items-center justify-center overflow-hidden rounded-3xl px-6 text-center sm:min-h-[calc(100svh)]">
        <HeroWave />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex max-w-4xl flex-col items-center gap-8 pb-12"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-medium tracking-tight text-balance sm:text-7xl"
          >
            <span className="block">
              We Build <RotatingWord />
            </span>
            <span className="block">That Grow Businesses</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            We build websites, tools, and systems that help your business grow
            and run without constant manual effort. Whatever is slowing you
            down digitally — we identify it, build it.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <Button variant="brand" size="lg" className="group">
              Book a free call
              <ArrowRight
                data-icon="inline-end"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
            <Button variant="secondary" size="lg">
              Our projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { Hero }
