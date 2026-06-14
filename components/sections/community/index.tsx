"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { TweetCard } from "./tweet";
import { TWEETS } from "./tweets-data";

const MOBILE_PREVIEW_COUNT = 8;

/**
 * Community Support - a masonry wall of real tweets. CSS multi-columns
 * give the variable-height flow (cards keep their natural height and
 * break-inside-avoid keeps each one intact); the bottom of the wall
 * dissolves into the page background.
 *
 * On mobile (single column), only the first 8 cards show until the user
 * taps "Load more"; sm+ always shows the full wall since the multi-column
 * layout already keeps it compact.
 */
export default function Community() {
  const [expanded, setExpanded] = React.useState(false);
  const collapsed = !expanded;

  return (
    <section
      id="community"
      aria-label="Community Support"
      className="relative py-10"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 pt-14 pb-16 text-center">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <span aria-hidden className="size-1 rounded-full bg-brand" />
          Community Support
        </div>
        <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Loved by the community.
        </h2>
        <p className="max-w-xl  leading-relaxed tracking-[0.01em] text-muted-foreground">
          Kind words from the people cheering us on.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {TWEETS.map((tweet, i) => (
            <TweetCard
              key={`${tweet.username}-${tweet.comment.slice(0, 24)}`}
              {...tweet}
              className={cn(
                collapsed && i >= MOBILE_PREVIEW_COUNT && "hidden sm:block",
              )}
            />
          ))}
        </div>

        {/* mobile-only fade + load more */}
        {collapsed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center sm:hidden">
            <div
              aria-hidden
              className="h-32 w-full bg-gradient-to-t from-background via-background/80 to-transparent"
            />
            <div className="pointer-events-auto flex w-full justify-center bg-background pb-2">
              <Button
                variant="outline"
                size="default"
                onClick={() => setExpanded(true)}
                className="group "
              >
                Load more
                <ChevronDown className="transition-transform group-hover:translate-y-0.5" />
              </Button>
            </div>
          </div>
        )}

        {/* sm+ ambient fade into the page background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-background to-transparent sm:block"
        />
      </div>
    </section>
  );
}
