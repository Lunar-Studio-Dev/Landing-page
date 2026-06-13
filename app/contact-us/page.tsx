import type { Metadata } from "next";

import Footer from "@/components/sections/footer";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Lunar Studio",
  description:
    "Tell us about your project — automation, custom software, or AI workflows. We reply within a business day.",
};

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
              within one business day. No commitment, no spam.
            </p>
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
