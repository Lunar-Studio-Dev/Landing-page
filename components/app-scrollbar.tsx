"use client";

import * as React from "react";
import { useLenis } from "lenis/react";

import { cn } from "@/lib/utils";

const HIDE_DELAY = 900;
const MIN_THUMB = 32;

/**
 * Custom overlay scrollbar that rides the document scroll - identical in look
 * to the previous Radix scrollbar (thin, brand-blue rounded thumb, auto-hides
 * while idle). It reads `window` scroll (which Lenis drives) and scrubs through
 * Lenis when dragged.
 */
export function AppScrollbar() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);

  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragging = React.useRef(false);
  const topRef = React.useRef(0);
  const maxTopRef = React.useRef(0);
  const limitRef = React.useRef(0);

  const lenis = useLenis();

  const layout = React.useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    const total = document.documentElement.scrollHeight;
    const viewport = window.innerHeight;
    const limit = total - viewport;
    const overflow = limit > 1;
    setHasOverflow(overflow);
    if (!overflow) return;

    const trackH = track.clientHeight;
    const thumbH = Math.max((viewport / total) * trackH, MIN_THUMB);
    const maxTop = trackH - thumbH;
    const top = limit > 0 ? (window.scrollY / limit) * maxTop : 0;

    limitRef.current = limit;
    maxTopRef.current = maxTop;
    topRef.current = top;

    thumb.style.height = `${thumbH}px`;
    thumb.style.transform = `translateY(${top}px)`;
  }, []);

  const reveal = React.useCallback(() => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!dragging.current) setVisible(false);
    }, HIDE_DELAY);
  }, []);

  React.useEffect(() => {
    layout();
    const onScroll = () => {
      layout();
      reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    const ro = new ResizeObserver(layout);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      ro.disconnect();
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [layout, reveal]);

  const scrollTo = React.useCallback(
    (target: number, immediate: boolean) => {
      if (lenis) lenis.scrollTo(target, { immediate });
      else window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    },
    [lenis],
  );

  const onThumbPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
    setVisible(true);
    const startY = e.clientY;
    const startTop = topRef.current;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const maxTop = maxTopRef.current;
      if (maxTop <= 0) return;
      const top = Math.min(Math.max(startTop + (ev.clientY - startY), 0), maxTop);
      scrollTo((top / maxTop) * limitRef.current, true);
    };
    const onUp = () => {
      dragging.current = false;
      reveal();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onTrackPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const rect = track.getBoundingClientRect();
    const maxTop = maxTopRef.current;
    if (maxTop <= 0) return;
    const top = Math.min(
      Math.max(e.clientY - rect.top - thumb.clientHeight / 2, 0),
      maxTop,
    );
    scrollTo((top / maxTop) * limitRef.current, false);
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onTrackPointerDown}
      aria-hidden
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-2.5 touch-none p-0.5 select-none transition-opacity duration-300",
        visible && hasOverflow
          ? "opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <div
        ref={thumbRef}
        onPointerDown={onThumbPointerDown}
        className="w-full rounded-full bg-muted-foreground/40 transition-colors hover:bg-muted-foreground/70 active:bg-muted-foreground/70"
      />
    </div>
  );
}
