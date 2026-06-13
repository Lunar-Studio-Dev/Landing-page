"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

/*
 * Isometric projection for the INTERFACE plane. UI coords (u,v) ∈ [0,1]
 * (u: left→right, v: top→bottom of the dashboard) map onto the diamond:
 *   (0,0)=left vertex · (1,0)=top · (0,1)=bottom · (1,1)=right
 */
const OX = 60;
const OY = 100;
const UX = 160;
const VY = 66;
const px = (u: number, v: number) => OX + UX * (u + v);
const py = (u: number, v: number) => OY + VY * (v - u);
const quad = (u0: number, v0: number, u1: number, v1: number) =>
  `M${px(u0, v0)} ${py(u0, v0)}L${px(u1, v0)} ${py(u1, v0)}L${px(u1, v1)} ${py(u1, v1)}L${px(u0, v1)} ${py(u0, v1)}Z`;

const NAV_ICONS = [0.14, 0.3, 0.46, 0.62];
const CARDS: Array<[number, number]> = [
  [0.24, 0.45],
  [0.49, 0.7],
  [0.74, 0.95],
];

const CHART_BASE_V = 0.82;
const BARS = [
  { u: 0.32, h: 16, live: false },
  { u: 0.4, h: 26, live: false },
  { u: 0.48, h: 34, live: true },
  { u: 0.56, h: 22, live: false },
  { u: 0.64, h: 30, live: true },
  { u: 0.72, h: 18, live: false },
  { u: 0.8, h: 38, live: false },
];
const TREND =
  "M" +
  BARS.map((b) => `${px(b.u, CHART_BASE_V)} ${py(b.u, CHART_BASE_V) - b.h}`).join(
    "L",
  );

const LABELS = [
  { cy: 100, label: "INTERFACE", delay: 2.3 },
  { cy: 180, label: "LOGIC", delay: 2.4 },
  { cy: 260, label: "DATA", delay: 2.5 },
];

/**
 * Isometric software stack — data, logic, and a live dashboard interface that
 * assemble top-down on scroll-in: the planes settle foundation-first, then the
 * dashboard's pieces (sidebar, nav icons, settings, header, stat cards, chart)
 * rain in from above, the chart bars grow up, and the chart stays "live"
 * afterward (breathing bars + a pulsing status dot).
 */
export function FigLayers({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const live = animated && !reduceMotion;
  const drop = (delay: number, duration = 0.9) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE, delay };

  // every piece falls from above (y < 0) into its slot
  const fall = (y: number) => ({
    initial: { opacity: 0, y },
    animate: animated ? { opacity: 1, y: 0 } : { opacity: 0, y },
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
        {...fall(-44)}
        transition={drop(0.1)}
      />

      {/* LOGIC — translucent blue plane */}
      <motion.path
        d="M220 114L380 180L220 246L60 180Z"
        className="fill-brand/10 stroke-brand/30"
        strokeWidth="0.75"
        {...fall(-44)}
        transition={drop(0.35)}
      />

      {/* INTERFACE — the dashboard panel */}
      <motion.path
        d={quad(0, 0, 1, 1)}
        className="fill-foreground/[0.04] stroke-foreground/40"
        strokeWidth="0.75"
        {...fall(-44)}
        transition={drop(0.6)}
      />

      {/* sidebar */}
      <motion.path
        d={quad(0, 0, 0.18, 1)}
        className="fill-foreground/[0.06] stroke-foreground/15"
        strokeWidth="0.5"
        {...fall(-30)}
        transition={drop(0.8, 0.6)}
      />

      {/* nav icon buttons — fall in top → down */}
      {NAV_ICONS.map((c, i) => (
        <motion.path
          key={`nav-${c}`}
          d={quad(0.05, c - 0.045, 0.13, c + 0.045)}
          className={i === 0 ? "fill-brand/70" : "fill-foreground/20"}
          {...fall(-26)}
          transition={drop(0.95 + i * 0.1, 0.45)}
        />
      ))}

      {/* settings button — pinned to the sidebar bottom */}
      <motion.path
        d={quad(0.05, 0.855, 0.13, 0.945)}
        className="fill-foreground/20 stroke-foreground/25"
        strokeWidth="0.5"
        {...fall(-26)}
        transition={drop(1.35, 0.45)}
      />

      {/* header bar */}
      <motion.path
        d={quad(0.24, 0.06, 0.96, 0.12)}
        className="fill-foreground/10"
        {...fall(-30)}
        transition={drop(1.0, 0.6)}
      />

      {/* live status dot + pulsing halo */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: animated ? 1 : 0 }}
        transition={drop(1.1, 0.5)}
      >
        {live && (
          <motion.circle
            cx={px(0.9, 0.09)}
            cy={py(0.9, 0.09)}
            r="2.5"
            className="fill-brand/40"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.6,
            }}
          />
        )}
        <circle
          cx={px(0.9, 0.09)}
          cy={py(0.9, 0.09)}
          r="2.5"
          className="fill-brand"
        />
      </motion.g>

      {/* stat cards */}
      {CARDS.map(([u0, u1], i) => (
        <motion.path
          key={`card-${u0}`}
          d={quad(u0, 0.2, u1, 0.33)}
          className="fill-foreground/[0.08] stroke-foreground/20"
          strokeWidth="0.5"
          {...fall(-26)}
          transition={drop(1.15 + i * 0.1, 0.5)}
        />
      ))}

      {/* chart container */}
      <motion.path
        d={quad(0.22, 0.4, 0.96, 0.86)}
        className="fill-foreground/[0.05] stroke-foreground/15"
        strokeWidth="0.5"
        {...fall(-24)}
        transition={drop(1.2, 0.6)}
      />

      {/* chart bars — grow up; the "live" ones keep breathing */}
      {BARS.map((b, i) => {
        const bx = px(b.u, CHART_BASE_V);
        const by = py(b.u, CHART_BASE_V);
        const bar = (
          <rect
            x={bx - 3}
            y={by - b.h}
            width="6"
            height={b.h}
            rx="1.5"
            className={b.live ? "fill-brand" : "fill-foreground/25"}
          />
        );
        return (
          <motion.g
            key={`bar-${b.u}`}
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              animated
                ? { scaleY: 1, opacity: 1 }
                : { scaleY: 0, opacity: 0 }
            }
            transition={drop(1.55 + i * 0.07, 0.5)}
          >
            {b.live && live ? (
              <motion.g
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                animate={{ scaleY: [1, 0.82, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.1 + i * 0.2,
                }}
              >
                {bar}
              </motion.g>
            ) : (
              bar
            )}
          </motion.g>
        );
      })}

      {/* trend line draws across the bars */}
      <motion.path
        d={TREND}
        fill="none"
        className="stroke-brand"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          animated
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={drop(2.1, 0.8)}
      />

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
