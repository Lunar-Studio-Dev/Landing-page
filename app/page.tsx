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
    absolute: "Lunar Studio - Ready to transform your business?",
  },
  description:
    "Lunar Studio build websites, tools, and systems that help your business grow and run without constant manual effort. Whatever is slowing you down digitally we identify it, build it.",
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
