"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { useAppScrollViewport } from "@/components/app-scroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  // { label: "About us", href: "#about" },
  // { label: "Work", href: "/#projects" },
  { label: "Team", href: "/#team" },
  { label: "Reviews", href: "/#community" },
  { label: "FAQ", href: "/#faq" },
];

const SCROLL_THRESHOLD = 80;

function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const viewportRef = useAppScrollViewport();
  // the app scrolls inside the ScrollArea viewport, not the window
  const { scrollY } = useScroll({ container: viewportRef ?? undefined });
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > SCROLL_THRESHOLD);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4">
      <motion.div
        initial={reduceMotion ? false : { y: -16, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: scrolled ? 760 : 1232,
          height: scrolled ? 52 : 64,
          marginTop: scrolled ? 12 : 0,
          borderRadius: scrolled ? 999 : 16,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 30 }
        }
        className={cn(
          "flex w-full items-center justify-between gap-4 border px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-5",
          scrolled
            ? "border-border bg-background/70 shadow-lg shadow-black/20 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Lunar Studio logo"
            className="h-[26px] w-auto"
          />
          <span className="font-medium whitespace-nowrap">Lunar Studio</span>
        </Link>

        <nav className="hidden items-center md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild className="shrink-0">
          <Link href="/contact-us">Contact us</Link>
        </Button>
      </motion.div>
    </header>
  );
}

export { Header };
