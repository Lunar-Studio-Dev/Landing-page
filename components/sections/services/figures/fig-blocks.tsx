"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

type FigProps = React.ComponentProps<"svg"> & { animated: boolean };

const BLOCK_W = 48;
const BLOCK_H = 28;
const GAP = 6;

/** Pyramid rows, bottom-up: [count, y, baseDelay] */
const ROWS: Array<[number, number, number]> = [
  [4, 200, 0.1],
  [3, 168, 0.55],
  [2, 136, 0.9],
];

function rowBlocks([count, y, baseDelay]: [number, number, number]) {
  const width = count * BLOCK_W + (count - 1) * GAP;
  const startX = 220 - width / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: startX + i * (BLOCK_W + GAP),
    y,
    delay: baseDelay + i * 0.1,
  }));
}

/**
 * Software that grows: modular blocks drop in and stack up row by row,
 * the brand-blue module tops the stack, and a measuring bracket extends
 * alongside as it rises.
 */
export function FigBlocks({ animated, ...props }: FigProps) {
  const reduceMotion = useReducedMotion();
  const t = (delay: number, duration = 0.6) =>
    reduceMotion ? { duration: 0 } : { duration, ease: EASE, delay };

  return (
    <svg viewBox="0 0 480 260" fill="none" aria-hidden {...props}>
      {/* ground line */}
      <motion.line
        x1="100"
        y1="232"
        x2="340"
        y2="232"
        className="stroke-foreground/30"
        strokeWidth="0.75"
        strokeDasharray="3 1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: animated ? 1 : 0 }}
        transition={t(0, 0.8)}
      />

      {/* module rows, bottom-up */}
      {ROWS.map((row) =>
        rowBlocks(row).map(({ x, y, delay }) => (
          <motion.rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={BLOCK_W}
            height={BLOCK_H}
            rx="4"
            className="fill-foreground/5 stroke-foreground/30"
            strokeWidth="0.75"
            strokeDasharray="3 1.5"
            initial={{ opacity: 0, y: -18 }}
            animate={animated ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
            transition={t(delay)}
          />
        )),
      )}

      {/* the growth module — the only brand moment */}
      <motion.g
        initial={{ opacity: 0, y: -18, scale: 0.9 }}
        animate={
          animated
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -18, scale: 0.9 }
        }
        transition={t(1.2)}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect
          x="196"
          y="104"
          width={BLOCK_W}
          height={BLOCK_H}
          rx="4"
          className="fill-brand/15 stroke-brand/50"
          strokeWidth="0.75"
        />
        <circle cx="220" cy="118" r="2.5" className="fill-brand" />
      </motion.g>

      {/* measuring bracket alongside the stack */}
      <motion.path
        d="M344 232L354 232L354 104L344 104"
        className="stroke-foreground/25"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: animated ? 1 : 0 }}
        transition={t(1.3, 0.8)}
      />
      <motion.text
        x="364"
        y="171"
        fontSize="9"
        letterSpacing="0.08em"
        className="fill-muted-foreground font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: animated ? 1 : 0 }}
        transition={t(1.5, 0.6)}
      >
        SCALE
      </motion.text>
    </svg>
  );
}
