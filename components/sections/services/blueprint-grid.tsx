"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/*
 * Raycast-style "blueprint grid" (engineering graph paper).
 *
 *  - One CSS grid with 1fr gutter columns so the hairlines run full bleed
 *    while content stays centered at --gw.
 *  - The hairlines are box-shadows, not borders: a 1px outer spread fills
 *    the 1px grid gap (uniform lines, no double borders) and an inset
 *    background-colored shadow keeps inner edges crisp.
 *  - Cells are placed per breakpoint through --ga / --ga-md / --ga-lg,
 *    consumed by a grid-area fallback chain, so one markup tree reflows
 *    across 1 / 2 / 3 content columns.
 *  - Auto-placed GridSpacers flow into the leftover cells (gutters and
 *    breathing rows) so the grid reads as paper extending past the content;
 *    the fade overlays dissolve the lines at all four edges.
 */

const CELL_AREA =
  "[grid-area:var(--ga,auto)] md:[grid-area:var(--ga-md,var(--ga,auto))] lg:[grid-area:var(--ga-lg,var(--ga-md,var(--ga,auto)))]";

const CELL_SHADOW =
  "shadow-[0_0_0_1px_var(--line),inset_0_0_0_1px_var(--color-background)]";

function BlueprintGrid({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "[--gw:min(calc(100%-3rem),66.5rem)]",
        "[--line:color-mix(in_oklab,var(--color-foreground)_13%,var(--color-background))]",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-2">
        <div className="absolute inset-y-0 left-0 w-[calc((100%-var(--gw))/2)] bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[calc((100%-var(--gw))/2)] bg-gradient-to-l from-background to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div
        className={cn(
          "grid gap-px [counter-reset:fig]",
          "[--cc:1] md:[--cc:2] lg:[--cc:3]",
          "grid-cols-[1fr_repeat(var(--cc),calc(var(--gw)/var(--cc)))_1fr]",
        )}
      >
        {children}
      </div>
    </div>
  );
}

type GridCellProps = React.ComponentProps<"div"> & {
  area?: string;
  areaMd?: string;
  areaLg?: string;
};

function GridCell({
  area,
  areaMd,
  areaLg,
  className,
  style,
  children,
  ...props
}: GridCellProps) {
  const areaVars = {
    "--ga": area,
    "--ga-md": areaMd,
    "--ga-lg": areaLg,
  } as React.CSSProperties;

  return (
    <div
      className={cn("relative flex min-h-12", CELL_AREA, CELL_SHADOW, className)}
      style={{ ...areaVars, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

/** Empty auto-placed cell that extends the graph paper into gutters and breathing rows. */
function GridSpacer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("flex min-h-12", CELL_AREA, CELL_SHADOW, className)}
      {...props}
    />
  );
}

type FigureCellProps = Omit<GridCellProps, "children"> & {
  /** Re-trigger the figure every time it scrolls in/out instead of once. */
  once?: boolean;
  children: (animated: boolean) => React.ReactNode;
};

/**
 * Dot-matrix cell with an auto-numbered FIG_N caption. Watches its own
 * viewport intersection (60% visible) and hands `animated` to the figure.
 */
function FigureCell({
  once = true,
  className,
  children,
  ...props
}: FigureCellProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, once });
  const reduceMotion = useReducedMotion();
  const animated = inView || Boolean(reduceMotion);

  return (
    <GridCell
      ref={ref}
      className={cn(
        "items-center justify-center p-8 sm:p-10",
        "bg-[radial-gradient(var(--dot)_0.5px,transparent_0)] bg-size-[17px_17px] bg-position-[-8.5px_-8.5px]",
        "[--dot:color-mix(in_oklab,var(--color-foreground)_22%,var(--color-background))]",
        className,
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 z-1 flex items-center bg-background px-1.5 py-1 font-mono text-[10px] font-light tracking-[0.5px] text-muted-foreground uppercase [counter-increment:fig] after:content-[counter(fig)]">
        FIG_
      </div>
      {children(animated)}
    </GridCell>
  );
}

type ServiceCardProps = GridCellProps & {
  eyebrow: string;
  title: string;
  body: string;
};

function ServiceCard({
  eyebrow,
  title,
  body,
  className,
  ...props
}: ServiceCardProps) {
  return (
    <GridCell
      className={cn(
        "group flex-col justify-between gap-6 p-6 transition-colors duration-150",
        "hover:bg-[color-mix(in_oklab,var(--color-foreground)_3%,var(--color-background))]",
        "min-h-[260px] lg:min-h-[300px]",
        className,
      )}
      {...props}
    >
      <ArrowUpRight className="size-4 self-end text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <span aria-hidden className="size-1 rounded-full bg-brand" />
          {eyebrow}
        </div>
        <h4 className="font-heading text-2xl font-medium text-foreground">
          {title}
        </h4>
        <p className="font-mono text-sm leading-relaxed tracking-[0.01em] text-muted-foreground">
          {body}
        </p>
      </div>
    </GridCell>
  );
}

function ArrowLink({
  className,
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "group/link inline-flex items-center gap-2 font-mono text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-foreground" />
    </a>
  );
}

export { ArrowLink, BlueprintGrid, FigureCell, GridCell, GridSpacer, ServiceCard };
