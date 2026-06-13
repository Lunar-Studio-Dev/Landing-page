"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

/** Isometric diamond plane centered at x=240 with the given center y. */
function plane(cy: number) {
  return `M240 ${cy - 80}L416 ${cy}L240 ${cy + 80}L64 ${cy}Z`;
}

const LABELS = [
  { y: 120, label: "INTERFACE", delay: 0.5 },
  { y: 190, label: "LOGIC", delay: 0.65 },
  { y: 260, label: "DATA", delay: 0.8 },
];

/**
 * Exploding isometric stack: the three planes start collapsed into the
 * middle and glide apart when scrolled into view, then the layer labels
 * fade in staggered.
 */
export function FigLayers({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const slide = (duration: number) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE };

  return (
    <svg viewBox="0 0 520 380" fill="none" aria-hidden {...props}>
      {/* bottom plane — data layer */}
      <motion.g
        initial={{ y: -37 }}
        animate={{ y: animated ? 0 : -37 }}
        transition={slide(1.5)}
      >
        <path
          d={plane(260)}
          className="fill-background stroke-foreground/30"
          strokeWidth="0.75"
          strokeDasharray="3 1.5"
        />
      </motion.g>

      {/* middle plane — the brand-tinted focus layer */}
      <motion.g
        initial={{ y: 12, x: 2 }}
        animate={animated ? { y: 0, x: 0 } : { y: 12, x: 2 }}
        transition={slide(1)}
      >
        <path
          d={plane(190)}
          className="fill-brand/10 stroke-brand/35"
          strokeWidth="0.75"
        />
      </motion.g>

      {/* top plane — interface layer with list rows */}
      <motion.g
        initial={{ y: 55 }}
        animate={{ y: animated ? 0 : 55 }}
        transition={slide(1.5)}
      >
        <path
          d={plane(120)}
          className="fill-background stroke-foreground/40"
          strokeWidth="0.75"
        />
        {/* search bar */}
        <path
          d="M212 70l72 33-15 7-72-33z"
          className="fill-foreground/5 stroke-foreground/30"
          strokeWidth="0.75"
        />
        {/* list rows — first row selected */}
        <path
          d="M180 95l110 50-13 6-110-50z"
          className="fill-brand/15 stroke-brand/40"
          strokeWidth="0.75"
        />
        <path
          d="M158 105l110 50-13 6-110-50z"
          className="fill-foreground/5 stroke-foreground/25"
          strokeWidth="0.75"
        />
        <path
          d="M136 115l110 50-13 6-110-50z"
          className="fill-foreground/5 stroke-foreground/25"
          strokeWidth="0.75"
        />
      </motion.g>

      {/* layer labels with dashed leader lines */}
      {LABELS.map(({ y, label, delay }) => (
        <motion.g
          key={label}
          initial={{ opacity: 0, y: 14 }}
          animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 1.2, ease: EASE, delay }
          }
        >
          <line
            x1="422"
            y1={y}
            x2="438"
            y2={y}
            className="stroke-foreground/25"
            strokeWidth="0.75"
            strokeDasharray="2 2"
          />
          <text
            x="444"
            y={y + 3}
            fontSize="9"
            letterSpacing="0.08em"
            className="fill-muted-foreground font-mono"
          >
            {label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}