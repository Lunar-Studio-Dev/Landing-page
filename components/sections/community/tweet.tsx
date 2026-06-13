"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type Tweet = {
  profile_image: string;
  username: string;
  comment: string;
  blue_tick: boolean;
  fullname: string;
};

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-label="Verified account"
      className={cn("size-4 shrink-0 fill-brand", className)}
    >
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
    </svg>
  );
}

type TweetCardProps = Tweet & {
  className?: string;
};

/**
 * Variable-height tweet card - the height follows the comment naturally,
 * so it slots into a masonry column flow. Fades up slightly when it
 * scrolls into view.
 */
export function TweetCard({
  profile_image,
  username,
  comment,
  blue_tick,
  fullname,
  className,
}: TweetCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
      className={cn(
        "mb-4 break-inside-avoid rounded-2xl border bg-card p-4 transition-colors duration-150",
        "hover:border-foreground/20",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={profile_image}
          alt={`${fullname}'s avatar`}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
          unoptimized
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="truncate text-sm font-semibold text-foreground">
              {fullname}
            </span>
            {blue_tick && <VerifiedBadge />}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            @{username}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-foreground/80">
        {comment}
      </p>
    </motion.div>
  );
}
