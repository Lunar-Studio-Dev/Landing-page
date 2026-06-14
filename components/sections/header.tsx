"use client";

import * as React from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  // { label: "Work", href: "/#projects" },
  { label: "Reviews", href: "/#community" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
];

const SCROLL_THRESHOLD = 80;

/** Animated hamburger → X icon. */
function MenuIcon({ open }: { open: boolean }) {
  const line = "absolute left-0 h-0.5 w-5 rounded-full bg-current";
  return (
    <span className="relative block h-4 w-5">
      <motion.span
        className={cn(line, "top-0")}
        style={{ transformOrigin: "center" }}
        animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className={cn(line, "top-1/2 -translate-y-1/2")}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className={cn(line, "bottom-0")}
        style={{ transformOrigin: "center" }}
        animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.2 }}
      />
    </span>
  );
}

function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // the document scrolls (Lenis drives window scroll), so read window scrollY
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > SCROLL_THRESHOLD);
  });

  // lock scroll + escape-to-close while the menu is open
  React.useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      if (!reduceMotion) lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, reduceMotion]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4">
      <motion.div
        initial={reduceMotion ? false : { y: -16, opacity: 0, maxWidth: 1232 }}
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
          "relative flex w-full items-center justify-between gap-4 border px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-5",
          scrolled || open
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

        <Button asChild className="hidden shrink-0 md:inline-flex">
          <Link href="/contact-us">Contact us</Link>
        </Button>

        {/* mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 md:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </motion.div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <React.Fragment>
            <motion.div
              aria-hidden
              onClick={close}
              className="fixed inset-0 -z-10 bg-background/60 backdrop-blur-sm md:hidden"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            />
            <motion.div
              id="mobile-menu"
              className="absolute inset-x-3 top-full mt-2 origin-top overflow-hidden rounded-2xl border bg-background/95 shadow-lg shadow-black/20 backdrop-blur-md sm:inset-x-4 md:hidden"
              initial={
                reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, scale: 0.98 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 30 }
              }
            >
              <nav className="flex flex-col divide-y divide-border/50">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="px-5 py-3.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-border/50 p-3">
                <Button asChild variant="brand" className="w-full">
                  <Link href="/contact-us" onClick={close}>
                    Contact us
                  </Link>
                </Button>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
}

export { Header };
