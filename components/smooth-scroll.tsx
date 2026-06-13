"use client";

import * as React from "react";
import { ReactLenis, useLenis } from "lenis/react";

/** Stops Lenis (reverting to native scroll) when the user prefers reduced motion. */
function ReducedMotionGate() {
  const lenis = useLenis();

  React.useEffect(() => {
    if (!lenis) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (mq.matches ? lenis.stop() : lenis.start());
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [lenis]);

  return null;
}

/**
 * Global smooth scroll (Lenis) driving the document scroll, so every page
 * shares the same momentum feel. Hash links glide via the `anchors` option,
 * offset to clear the fixed header.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: { offset: -100 },
      }}
    >
      <ReducedMotionGate />
      {children}
    </ReactLenis>
  );
}
