"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

const MILESTONES = [
  { x: 48, y: 276, label: "AUDIT", lx: 48, ly: 300, delay: 0.4 },
  { x: 164, y: 188, label: "ROADMAP", lx: 188, ly: 206, delay: 0.7 },
  { x: 192, y: 96, label: "BUILD", lx: 216, ly: 114, delay: 1.0 },
];

/**
 * The AI roadmap: a meandering route draws itself in, milestone stops pop
 * up one by one, and the destination lights up in brand blue. Replays each
 * time it scrolls into view (the FigureCell passes `once: false`).
 */
export function FigRoadmap({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const pop = (delay: number, duration = 0.5) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE, delay };

  return (
    <svg viewBox="0 0 320 320" fill="none" aria-hidden {...props}>
      {/* the route */}
      <motion.path
        d="M48 276C140 276 108 216 164 188C220 160 132 124 192 96C236 75 252 68 278 50"
        className="stroke-foreground/30"
        strokeWidth="0.75"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: animated ? 1 : 0 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 1.4, ease: EASE }
        }
      />

      {/* intermediate milestones */}
      {MILESTONES.map(({ x, y, label, lx, ly, delay }) => (
        <g key={label}>
          <motion.circle
            cx={x}
            cy={y}
            r="6"
            className="fill-background stroke-foreground/40"
            strokeWidth="0.75"
            initial={{ scale: 0 }}
            animate={{ scale: animated ? 1 : 0 }}
            transition={pop(delay)}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <motion.text
            x={lx}
            y={ly}
            fontSize="9"
            letterSpacing="0.08em"
            className="fill-muted-foreground font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: animated ? 1 : 0 }}
            transition={pop(delay + 0.1, 0.6)}
          >
            {label}
          </motion.text>
        </g>
      ))}

      {/* destination — the only brand moment */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: animated ? 1 : 0 }}
        transition={pop(1.3)}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle
          cx="278"
          cy="50"
          r="12"
          className="stroke-brand/40"
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        <circle cx="278" cy="50" r="7" className="fill-brand/15 stroke-brand" strokeWidth="0.75" />
        <circle cx="278" cy="50" r="3" className="fill-brand" />
      </motion.g>
      <motion.text
        x="240"
        y="26"
        fontSize="9"
        letterSpacing="0.08em"
        className="fill-muted-foreground font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: animated ? 1 : 0 }}
        transition={pop(1.4, 0.6)}
      >
        SCALE
      </motion.text>
    </svg>
  );
}
