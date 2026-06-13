"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const TEXT_CLASS =
  "bg-clip-text text-center font-heading text-[clamp(5rem,18vw,15rem)] leading-[0.9] font-bold tracking-tight text-transparent";

const MASK =
  "radial-gradient(circle 240px at var(--x, 50%) var(--y, 50%), #000 0%, transparent 70%)";

/**
 * Resend-style brand watermark - a giant, near-invisible wordmark that a soft
 * spotlight reveals under the cursor. A dim base layer is always shown; a
 * brighter copy is masked to a disc that follows the pointer (eased for a
 * liquid trail) and fades out when the pointer leaves.
 */
export function FooterWatermark({ text = "LUNAR" }: { text?: string }) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const spotRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const host = hostRef.current;
    const spot = spotRef.current;
    if (!host || !spot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const write = (x: number, y: number) => {
      spot.style.setProperty("--x", `${x}px`);
      spot.style.setProperty("--y", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (reduce) write(target.x, target.y);
    };
    const onEnter = () => {
      spot.style.opacity = "1";
    };
    const onLeave = () => {
      spot.style.opacity = "0";
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);

    if (!reduce) {
      const loop = () => {
        pos.x += (target.x - pos.x) * 0.12;
        pos.y += (target.y - pos.y) * 0.12;
        write(pos.x, pos.y);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden className="relative mt-10 select-none">
      {/* dim base - barely visible */}
      <div
        className={cn(
          "bg-gradient-to-b from-foreground/[0.07] to-foreground/0",
          TEXT_CLASS,
        )}
      >
        {text}
      </div>
      {/* spotlight - brighter copy, masked to a disc that follows the cursor */}
      <div
        ref={spotRef}
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          "bg-gradient-to-b from-foreground/40 to-foreground/0",
          TEXT_CLASS,
        )}
        style={{ maskImage: MASK, WebkitMaskImage: MASK }}
      >
        {text}
      </div>
    </div>
  );
}
