import Community from "@/components/sections/community"
import Cta from "@/components/sections/cta"
import Faq from "@/components/sections/faq"
import Footer from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import Services from "@/components/sections/services"

export default function Landing() {
    return (
        <div>
            <Hero />
            <Services />
            <Community />
            <Faq />
            <Cta />
            <Footer />
        </div>
    )
}
