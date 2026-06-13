"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

const INPUTS = [
  { label: "Data sources", cy: 50 },
  { label: "Your tools", cy: 130 },
  { label: "Your teams", cy: 210 },
];

const OUTPUTS = [
  { label: "Decisions", cy: 80 },
  { label: "Actions", cy: 180 },
];

const LINES = [
  "M140 50C190 50 205 118 281 118",
  "M140 130L281 130",
  "M140 210C190 210 205 142 281 142",
  "M349 120C420 120 435 80 470 80",
  "M349 140C420 140 435 180 470 180",
];

const JUNCTIONS = [
  { cx: 281, cy: 118, delay: 1.0 },
  { cx: 281, cy: 130, delay: 1.1 },
  { cx: 281, cy: 142, delay: 1.2 },
  { cx: 349, cy: 120, delay: 1.3 },
  { cx: 349, cy: 140, delay: 1.4 },
];

// Three dots stream in - one from each input box to the AI node - where they
// are consumed; the forward dot then emerges from the node and continues to
// an outcome, alternating between the two each cycle.
const INPUT_ROUTES = [
  "M140 50C190 50 205 118 281 118",
  "M140 130L281 130",
  "M140 210C190 210 205 142 281 142",
];

const PULSE_ROUTES = [
  "M349 122C420 120 435 80 470 80",
  "M349 138C420 140 435 180 470 180",
];

function InputPulse({ route, delay }: { route: string; delay: number }) {
  return (
    <motion.circle
      r="3"
      className="fill-brand"
      style={{ offsetPath: `path("${route}")` }}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{
        offsetDistance: ["0%", "12%", "82%", "100%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.8,
        ease: "linear",
        times: [0, 0.12, 0.82, 1],
        repeat: Infinity,
        delay,
      }}
    />
  );
}

function ForwardPulse() {
  const [route, setRoute] = React.useState(0);
  return (
    <motion.circle
      key={route}
      r="3"
      className="fill-brand"
      style={{ offsetPath: `path("${PULSE_ROUTES[route]}")` }}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{
        offsetDistance: ["0%", "14%", "85%", "100%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.6,
        ease: "linear",
        times: [0, 0.14, 0.85, 1],
      }}
      onAnimationComplete={() => setRoute((r) => (r + 1) % PULSE_ROUTES.length)}
    />
  );
}

/**
 * End-to-end workflow as a named, layered process map: data sources, tools,
 * and teams funnel into one AI processing core which fans out to decisions
 * and actions - connections draw in, junction indicators pop, and a pulse
 * runs the full route.
 */
export function FigPipeline({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const t = (delay: number, duration = 0.7) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE, delay };

  return (
    <svg viewBox="0 0 620 260" fill="none" aria-hidden {...props}>
      {/* input cells - named */}
      {INPUTS.map(({ label, cy }, i) => (
        <motion.g
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={t(i * 0.1, 0.5)}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <rect
            x="20"
            y={cy - 17}
            width="120"
            height="34"
            rx="8"
            className="fill-background stroke-foreground/30"
            strokeWidth="0.75"
            strokeDasharray="3 1.5"
          />
          <text
            x="80"
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            letterSpacing="0.02em"
            className="fill-foreground/80 font-mono"
          >
            {label}
          </text>
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

      {/* the AI processing core */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }
        }
        transition={t(0.7, 0.5)}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect
          x="283"
          y="98"
          width="64"
          height="64"
          rx="10"
          className="fill-brand/10 stroke-brand/40"
          strokeWidth="1"
        />
        {/* bot - the AI glyph */}
        <g
          transform="translate(315 130) scale(1.7) translate(-12 -12)"
          className="stroke-brand"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </g>
      </motion.g>

      {/* outcome cells - named */}
      {OUTPUTS.map(({ label, cy }, i) => (
        <motion.g
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            animated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={t(1.1 + i * 0.15, 0.5)}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <rect
            x="470"
            y={cy - 17}
            width="110"
            height="34"
            rx="8"
            className="fill-background stroke-foreground/30"
            strokeWidth="0.75"
            strokeDasharray="3 1.5"
          />
          <text
            x="525"
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            letterSpacing="0.02em"
            className="fill-foreground/80 font-mono"
          >
            {label}
          </text>
        </motion.g>
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

      {/* outcome caption */}
      <motion.text
        x="525"
        y="232"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="0.06em"
        className="fill-muted-foreground font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: animated ? 1 : 0 }}
        transition={t(1.5, 0.6)}
      >
        One efficient, intelligent system
      </motion.text>

      {/* three dots stream in from the inputs; one forward dot leaves the node */}
      {animated && !reduceMotion && (
        <>
          {INPUT_ROUTES.map((route, i) => (
            <InputPulse key={route} route={route} delay={i * 0.4} />
          ))}
          <ForwardPulse />
        </>
      )}
    </svg>
  );
}
