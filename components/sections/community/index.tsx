"use client";

import * as React from "react";

import { TweetCard } from "./tweet";
import { TWEETS } from "./tweets-data";

/**
 * Community Support — a masonry wall of real tweets. CSS multi-columns
 * give the variable-height flow (cards keep their natural height and
 * break-inside-avoid keeps each one intact); the bottom of the wall
 * dissolves into the page background.
 */
export default function Community() {
  return (
    <section id="community" aria-label="Community Support" className="relative py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 pt-14 pb-16 text-center">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          <span aria-hidden className="size-1 rounded-full bg-brand" />
          Community Support
        </div>
        <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Loved by the community.
        </h2>
        <p className="max-w-xl font-mono text-sm leading-relaxed tracking-[0.01em] text-muted-foreground">
          Here&apos;s what people have to say about working with us.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {TWEETS.map((tweet) => (
            <TweetCard key={`${tweet.username}-${tweet.comment.slice(0, 24)}`} {...tweet} />
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        />
      </div>
    </section>
  );
}
