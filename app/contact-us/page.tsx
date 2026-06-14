import * as React from "react";
import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";

import Footer from "@/components/sections/footer";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact - Lunar Studio",
  description:
    "Tell us about your project - automation, custom software, or AI workflows. We reply within a business day.",
};

const STEPS = [
  "We read your message and reply within one business day.",
  "A quick call to scope the work and align on goals.",
  "You get a clear proposal - timeline and pricing.",
];

const SUPPORT_EMAIL = "team@lunarstudio.dev";
const PHONE_DISPLAY = "+91 72509 03533";
const PHONE_HREF = "+917250903533";

type IconProps = React.ComponentProps<"svg">;

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

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/lunarstudio.hq",
    Icon: InstagramIcon,
  },
  { label: "Twitter", href: "https://x.com/lunarstudiohq", Icon: XIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lunarstudiohq/",
    Icon: LinkedinIcon,
  },
];

export default function ContactPage() {
  return (
    <div>
      <section
        aria-label="Contact"
        className="relative flex min-h-svh items-center"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pt-28 pb-20 sm:pt-36 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              <span aria-hidden className="size-1 rounded-full bg-brand" />
              Contact
            </div>
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Let&apos;s build something.
            </h1>
            <p className="max-w-sm leading-relaxed tracking-[0.01em] text-muted-foreground">
              Tell us a bit about your project and we&apos;ll get back to you
              within one business day.
            </p>

            {/* what happens next */}
            <div className="mt-6 flex flex-col gap-5">
              <div className="text-xs tracking-[0.14em] ">
                What happens next ?
              </div>
              <ol className="flex flex-col gap-5">
                {STEPS.map((step, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="font-mono text-xs text-brand/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* direct contact */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-muted-foreground/70 transition-colors group-hover:text-brand" />
                {SUPPORT_EMAIL}
              </a>
              <a
                href={`tel:${PHONE_HREF}`}
                className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="size-4 text-muted-foreground/70 transition-colors group-hover:text-brand" />
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* socials */}
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-5">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
