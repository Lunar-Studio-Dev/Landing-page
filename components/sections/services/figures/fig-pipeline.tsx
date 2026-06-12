"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

const TOOLS = [
  { x: 48, y: 40 },
  { x: 48, y: 104 },
  { x: 48, y: 168 },
];

const OUTPUTS = [
  { x: 456, y: 56 },
  { x: 456, y: 152 },
];

const LINES = [
  "M80 56C160 56 200 100 252 108",
  "M80 120L252 120",
  "M80 184C160 184 200 140 252 132",
  "M308 108C360 100 400 72 456 72",
  "M308 132C360 140 400 168 456 168",
];

const JUNCTIONS = [
  { cx: 252, cy: 108, delay: 1.0 },
  { cx: 252, cy: 120, delay: 1.1 },
  { cx: 252, cy: 132, delay: 1.2 },
  { cx: 308, cy: 108, delay: 1.3 },
  { cx: 308, cy: 132, delay: 1.4 },
];

const PULSE_PATH = "M80 120L300 120C360 112 400 72 452 72";

/**
 * End-to-end workflow: disconnected tools wire themselves into one AI core
 * which fans out to the teams that need it — connections draw in, junction
 * indicators pop, and a pulse runs the full route.
 */
export function FigPipeline({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const t = (delay: number, duration = 0.7) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE, delay };

  return (
    <svg viewBox="0 0 560 240" fill="none" aria-hidden {...props}>
      {/* tool nodes */}
      {TOOLS.map(({ x, y }, i) => (
        <motion.g
          key={`tool-${y}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={t(i * 0.1, 0.5)}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <rect
            x={x}
            y={y}
            width="32"
            height="32"
            rx="8"
            className="fill-background stroke-foreground/30"
            strokeWidth="0.75"
            strokeDasharray="3 1.5"
          />
          <line
            x1={x + 10}
            y1={y + 13}
            x2={x + 22}
            y2={y + 13}
            className="stroke-foreground/25"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1={x + 10}
            y1={y + 19}
            x2={x + 17}
            y2={y + 19}
            className="stroke-foreground/20"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.g>
      ))}

      {/* connections */}
      {LINES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          className="stroke-foreground/25"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animated ? 1 : 0 }}
          transition={t(0.3 + i * 0.15, 0.8)}
        />
      ))}

      {/* the AI core */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }
        }
        transition={t(0.7, 0.5)}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect
          x="252"
          y="92"
          width="56"
          height="56"
          rx="10"
          className="fill-brand/10 stroke-brand/40"
          strokeWidth="1"
        />
        {[
          [272, 112],
          [288, 112],
          [272, 128],
          [288, 128],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="1.5"
            className="fill-brand/60"
          />
        ))}
      </motion.g>

      {/* destination nodes */}
      {OUTPUTS.map(({ x, y }, i) => (
        <motion.rect
          key={`out-${y}`}
          x={x}
          y={y}
          width="32"
          height="32"
          rx="8"
          className="fill-background stroke-foreground/30"
          strokeWidth="0.75"
          strokeDasharray="3 1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={t(1.1 + i * 0.15, 0.5)}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}

      {/* junction indicators */}
      {JUNCTIONS.map(({ cx, cy, delay }) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="2.5"
          className="fill-brand"
          initial={{ scale: 0 }}
          animate={{ scale: animated ? 1 : 0 }}
          transition={t(delay, 0.4)}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}

      {/* labels */}
      {(
        [
          { x: 48, y: 216, label: "TOOLS", anchor: "start" },
          { x: 280, y: 166, label: "AI CORE", anchor: "middle" },
          { x: 488, y: 204, label: "TEAMS", anchor: "end" },
        ] as const
      ).map(({ x, y, label, anchor }) => (
        <motion.text
          key={label}
          x={x}
          y={y}
          fontSize="9"
          letterSpacing="0.08em"
          textAnchor={anchor}
          className="fill-muted-foreground font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: animated ? 1 : 0 }}
          transition={t(1.5, 0.6)}
        >
          {label}
        </motion.text>
      ))}

      {/* pulse across the full route */}
      {animated && !reduceMotion && (
        <circle r="3" className="fill-brand">
          <animateMotion dur="3s" repeatCount="indefinite" path={PULSE_PATH} />
        </circle>
      )}
    </svg>
  );
}
