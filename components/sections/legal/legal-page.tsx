import * as React from "react";
import Link from "next/link";

import Footer from "@/components/sections/footer";

export type LegalSection = {
  id: string;
  heading: string;
  body: React.ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
};

const PROSE =
  "text-sm leading-relaxed text-muted-foreground " +
  "[&_p]:mb-4 [&_p:last-child]:mb-0 " +
  "[&_strong]:font-medium [&_strong]:text-foreground " +
  "[&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 " +
  "[&_ul]:my-4 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 " +
  "[&_ol]:my-4 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5";

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <div>
      <article className="mx-auto max-w-6xl px-6 pt-28 pb-20 sm:pt-36">
        {/* header */}
        <header className="flex flex-col gap-4 border-b pb-10">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            <span aria-hidden className="size-1 rounded-full bg-brand" />
            {eyebrow}
          </div>
          <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="grid gap-12 pt-10 lg:grid-cols-12 lg:gap-16">
          {/* table of contents */}
          <nav
            aria-label="Table of contents"
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              On this page
            </p>
            <ol className="flex flex-col gap-2.5">
              {sections.map((section, i) => (
                <li key={section.id} className="flex gap-2.5 text-sm">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`#${section.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {section.heading}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          {/* content */}
          <div className="flex flex-col gap-12 lg:col-span-8">
            <div className={PROSE}>{intro}</div>

            {sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t pt-8"
              >
                <h2 className="mb-4 flex items-baseline gap-3 font-heading text-xl font-medium text-foreground">
                  <span className="font-mono text-sm text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className={PROSE}>{section.body}</div>
              </section>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
