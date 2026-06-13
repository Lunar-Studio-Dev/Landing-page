import * as React from "react";
import Link from "next/link";
import { Moon } from "lucide-react";

import { FooterWatermark } from "./footer-watermark";

type IconProps = React.ComponentProps<"svg">;

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const LINK_GROUPS = [
  {
    heading: "Services",
    links: [
      { label: "AI Automations", href: "/#services" },
      { label: "AI Consultation", href: "/#services" },
      { label: "Custom Software", href: "/#services" },
      { label: "AI Workflows", href: "/#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Team", href: "/#team" },
      { label: "Community", href: "/#community" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const SOCIALS = [
  { label: "X / Twitter", href: "https://twitter.com", Icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer aria-label="Footer" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12">
        {/* brand */}
        <div className="flex flex-col gap-4 md:col-span-4">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Lunar Studio logo" className="size-6" />
            <span className="font-heading text-base font-medium text-foreground">
              Lunar Studio
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            We design the systems that run your business — automation, software,
            and AI, built to last.
          </p>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-6">
          {LINK_GROUPS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <div className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {heading}
              </div>
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* socials */}
        <div className="flex items-start gap-3 md:col-span-2 md:justify-end">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t px-6" />

      {/* interactive brand watermark */}
      <FooterWatermark text="LUNAR" />

      <div className="flex flex-col items-center gap-3 px-6 pb-8">
        <p className="text-[11px] tracking-[0.06em] text-muted-foreground/70">
          © 2026 Lunar Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
