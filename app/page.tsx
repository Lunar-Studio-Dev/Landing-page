import type { Metadata } from "next"

import { JsonLd } from "@/components/json-ld"
import Community from "@/components/sections/community"
import Cta from "@/components/sections/cta"
import Faq from "@/components/sections/faq"
import Footer from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import Services from "@/components/sections/services"
import Team from "@/components/sections/team"
import {
  faqPageSchema,
  professionalServiceSchema,
} from "@/lib/structured-data"

export const metadata: Metadata = {
  title: {
    absolute: "Custom Software Development & AI Automation Agency — Lunar Studio",
  },
  description:
    "Lunar Studio builds custom software, CRM systems, and end-to-end AI workflows. We automate repetitive work and ship enterprise-grade software that grows with your business.",
  alternates: { canonical: "/" },
}

export default function Landing() {
    return (
        <div>
            <JsonLd data={[professionalServiceSchema(), faqPageSchema()]} />
            <Hero />
            <Services />
            <Community />
            <Team />
            <Faq />
            <Cta />
            <Footer />
        </div>
    )
}
