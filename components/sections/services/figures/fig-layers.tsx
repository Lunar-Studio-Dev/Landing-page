"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

const LABELS = [
  { cy: 100, label: "INTERFACE", delay: 1.4 },
  { cy: 180, label: "LOGIC", delay: 1.5 },
  { cy: 260, label: "DATA", delay: 1.6 },
];

/**
 * Isometric software stack — interface, logic, and data planes that assemble
 * top-down on scroll-in: each element starts above its slot and descends into
 * place (foundation first), the interface's UI rows converge as they land,
 * and the layer labels resolve last.
 */
export function FigLayers({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const drop = (delay: number, duration = 0.9) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE, delay };

  // every piece falls from above (y < 0) into its slot
  const fall = (from: { y: number; x?: number }) => ({
    initial: { opacity: 0, ...from },
    animate: animated ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...from },
  });

  return (
    <svg viewBox="0 0 520 350" fill="none" aria-hidden {...props}>
      {/* DATA — the foundation, settles first */}
      <motion.path
        d="M220 194L380 260L220 326L60 260Z"
        fill="none"
        className="stroke-foreground/30"
        strokeWidth="0.75"
        strokeDasharray="4 3"
        {...fall({ y: -44 })}
        transition={drop(0.1)}
      />

      {/* LOGIC — translucent blue plane */}
      <motion.path
        d="M220 114L380 180L220 246L60 180Z"
        className="fill-brand/10 stroke-brand/30"
        strokeWidth="0.75"
        {...fall({ y: -44 })}
        transition={drop(0.35)}
      />

      {/* INTERFACE — the dark panel */}
      <motion.path
        d="M220 34L380 100L220 166L60 100Z"
        className="fill-foreground/[0.04] stroke-foreground/40"
        strokeWidth="0.75"
        {...fall({ y: -44 })}
        transition={drop(0.6)}
      />

      {/* INTERFACE contents — the rows converge into place as they land */}
      <motion.path
        d="M152 78l105 48l-12 6l-105 -48z"
        className="fill-foreground/10 stroke-foreground/25"
        strokeWidth="0.5"
        {...fall({ y: -40, x: -16 })}
        transition={drop(0.95, 0.7)}
      />
      <motion.path
        d="M142 94l105 48l-12 6l-105 -48z"
        className="fill-brand/20 stroke-brand/45"
        strokeWidth="0.5"
        {...fall({ y: -40, x: 16 })}
        transition={drop(1.05, 0.7)}
      />
      <motion.path
        d="M132 110l105 48l-12 6l-105 -48z"
        className="fill-foreground/8 stroke-foreground/25"
        strokeWidth="0.5"
        {...fall({ y: -40, x: -10 })}
        transition={drop(1.15, 0.7)}
      />

      {/* blue accent dot */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={drop(1.3, 0.5)}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle cx="352" cy="92" r="6" className="fill-brand/25" />
        <circle cx="352" cy="92" r="3" className="fill-brand" />
      </motion.g>

      {/* layer labels + leader lines */}
      {LABELS.map(({ cy, label, delay }) => (
        <motion.g
          key={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: animated ? 1 : 0 }}
          transition={drop(delay, 0.6)}
        >
          <line
            x1="384"
            y1={cy}
            x2="414"
            y2={cy}
            className="stroke-foreground/25"
            strokeWidth="0.75"
            strokeDasharray="2 2"
          />
          <text
            x="420"
            y={cy + 3}
            fontSize="9"
            letterSpacing="0.12em"
            className="fill-muted-foreground font-mono"
          >
            {label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
