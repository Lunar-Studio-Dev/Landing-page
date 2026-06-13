"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

const TASK_YS = [36, 84, 132];

const CONNECTORS = [
  "M190 52C240 52 252 120 282 120",
  "M190 100C230 100 244 120 282 120",
  "M190 148C240 148 252 120 282 120",
];

// per-task routes: the dot emerges from a task, through the engine, to output.
const ROUTES = CONNECTORS.map((c) => `${c}L420 120`);

/**
 * Repetitive tasks flow into an automation engine and come out as one output.
 * The pulse streams from each task box in turn; only the box it's currently
 * flowing from is checked off (the tick animates in), the others stay blank.
 */
export function FigAutomations({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const draw = (delay: number, duration = 0.8) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE, delay };

  return (
    <svg viewBox="0 0 560 240" fill="none" aria-hidden {...props}>
      {/* task rows */}
      {TASK_YS.map((y, i) => (
        <motion.g
          key={y}
          initial={{ opacity: 0 }}
          animate={{ opacity: animated ? 1 : 0 }}
          transition={draw(i * 0.1, 0.6)}
        >
          <rect
            x="40"
            y={y}
            width="150"
            height="32"
            rx="7"
            className="fill-background stroke-foreground/30"
            strokeWidth="0.75"
            strokeDasharray="3 1.5"
          />
          <rect
            x="52"
            y={y + 8}
            width="16"
            height="16"
            rx="4"
            className="stroke-foreground/30"
            strokeWidth="0.75"
          />
          {/* only the active task's checkbox is ticked */}
          <motion.path
            d={`M56 ${y + 16}l4 4 7-8`}
            className="stroke-brand"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: animated && active === i ? 1 : 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE }
            }
          />
          <line
            x1="78"
            y1={y + 13}
            x2="168"
            y2={y + 13}
            className="stroke-foreground/20"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="78"
            y1={y + 21}
            x2={138 - i * 12}
            y2={y + 21}
            className="stroke-foreground/15"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
      ))}

      {/* connectors merging into the engine */}
      {CONNECTORS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          className="stroke-foreground/25"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animated ? 1 : 0 }}
          transition={draw(0.2 + i * 0.1)}
        />
      ))}

      {/* engine node */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }
        }
        transition={draw(0.6, 0.5)}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <path
          d="M310 92L338 120L310 148L282 120Z"
          className="fill-brand/10 stroke-brand/40"
          strokeWidth="1"
        />
        <circle cx="310" cy="120" r="4" className="fill-brand" />
      </motion.g>

      {/* engine → output */}
      <motion.path
        d="M338 120L420 120"
        className="stroke-foreground/25"
        strokeWidth="0.75"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: animated ? 1 : 0 }}
        transition={draw(0.7)}
      />

      {/* output node */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={draw(0.9, 0.6)}
      >
        <rect
          x="420"
          y="96"
          width="104"
          height="48"
          rx="8"
          className="fill-background stroke-foreground/30"
          strokeWidth="0.75"
          strokeDasharray="3 1.5"
        />
        <circle cx="440" cy="120" r="2.5" className="fill-brand" />
        <text
          x="452"
          y="123"
          fontSize="9"
          letterSpacing="0.08em"
          className="fill-muted-foreground font-mono"
        >
          OUTPUT
        </text>
      </motion.g>

      {/* pulse — streams from each task box in turn */}
      {animated && !reduceMotion && (
        <motion.circle
          key={active}
          r="3"
          className="fill-brand"
          style={{ offsetPath: `path("${ROUTES[active]}")` }}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{
            offsetDistance: ["0%", "10%", "90%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.2,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
          onAnimationComplete={() => setActive((a) => (a + 1) % ROUTES.length)}
        />
      )}
    </svg>
  );
}
