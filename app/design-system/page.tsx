import { ArrowRight, Check, Sparkles } from "lucide-react"

import { ColorPalette } from "@/components/color-palette"
import { Hero } from "@/components/showcase-hero"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <div className="min-h-svh">
      <Hero />

      <main className="mx-auto flex max-w-5xl flex-col gap-24 px-6 py-24">
        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Foundations"
            title="Color tokens"
            description="A cool-tinted monochrome ramp does all the work. Blue is the only hue, reserved for moments that deserve it."
          />
          <ColorPalette />
        </section>

        <Separator />

        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Components"
            title="Buttons"
            description="The default CTA is monochrome — it wins by contrast, not hue. The brand variant is for the one action per screen that matters most."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button>Download for Mac</Button>
            <Button variant="brand">
              Join Now
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="secondary">Learn More</Button>
            <Button variant="outline">Browse the store</Button>
            <Button variant="ghost">Documentation</Button>
            <Button variant="link">Inline link</Button>
            <Button variant="destructive">Delete account</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" variant="brand">
              Large
            </Button>
            <Button size="default" variant="secondary">
              Default
            </Button>
            <Button size="sm" variant="secondary">
              Small
            </Button>
            <Button size="xs" variant="secondary">
              Extra small
            </Button>
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Components"
            title="Badges"
            description="Brand badges use the 15% alpha tint — color at text size, never a loud fill."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Badge>New</Badge>
            <Badge variant="secondary">Productivity</Badge>
            <Badge variant="outline">Engineering</Badge>
            <Badge variant="brand">
              <Sparkles />
              Featured
            </Badge>
            <Badge variant="destructive">Deprecated</Badge>
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Components"
            title="Cards"
            description="Surfaces step up the neutral ramp. Accents appear as highlighted words, tinted badges, and translucent glows."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Window Management</CardTitle>
                <CardDescription>
                  Move and resize windows without touching the mouse.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Check className="size-4 text-brand" /> Snap to halves and
                  quarters
                </p>
                <p className="flex items-center gap-2">
                  <Check className="size-4 text-brand" /> Custom layouts
                </p>
                <p className="flex items-center gap-2">
                  <Check className="size-4 text-brand" /> Multi-display aware
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  Learn more
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aanya Rao</CardTitle>
                <CardDescription>Product Designer, Bengaluru</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                “This community changed how I work. The{" "}
                <span className="text-brand">weekly critiques</span> and{" "}
                <span className="text-brand">mentor sessions</span> pushed my
                craft further in three months than the last three years.”
              </CardContent>
            </Card>

            <Card className="relative shadow-[0_0_48px_var(--brand-glow)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pro Membership</CardTitle>
                  <Badge variant="brand">Popular</Badge>
                </div>
                <CardDescription>
                  Everything in Free, plus the full library.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-medium tracking-tight">
                  ₹499
                  <span className="text-sm text-muted-foreground"> /month</span>
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="brand" className="w-full">
                  Get started
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Components"
            title="Forms"
            description="Inputs stay neutral at rest. The blue focus ring is one of the few places the brand color lives."
          />
          <div className="flex max-w-md flex-col gap-4">
            <div className="flex gap-2">
              <Input type="email" placeholder="you@example.com" />
              <Button variant="brand">Subscribe</Button>
            </div>
            <Input placeholder="Click me to see the brand focus ring" />
            <Input
              aria-invalid
              defaultValue="not-an-email"
              placeholder="Invalid state"
            />
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Accent discipline"
            title="Where the blue lives"
            description="Inline links, selection, small indicators, focus rings, and glows — roughly 2% of the pixels on any screen."
          />
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="leading-relaxed text-muted-foreground">
                Body copy stays grey, but{" "}
                <a
                  href="#"
                  className="text-brand underline-offset-4 hover:underline"
                >
                  inline links are blue
                </a>{" "}
                so they read as interactive. Try selecting this paragraph —
                text selection is the brand color too.
              </p>
              <p className="text-sm text-muted-foreground">
                Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command menu, or{" "}
                <Kbd>D</Kbd> to toggle the theme.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between font-mono text-xs text-muted-foreground">
                  <span>Onboarding progress</span>
                  <span>64%</span>
                </div>
                <Progress value={64} />
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-brand" />
                <span className="size-2 rounded-full bg-secondary" />
                <span className="size-2 rounded-full bg-secondary" />
                <span className="size-2 rounded-full bg-secondary" />
                <span className="font-mono text-xs text-muted-foreground">
                  active step indicator
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand">
                  <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                  Live
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  status pill on brand-muted
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
          <p className="font-mono text-xs text-muted-foreground uppercase">
            Lunar design system
          </p>
          <p className="text-xs text-muted-foreground">
            Press <Kbd>D</Kbd> to compare light and dark
          </p>
        </div>
      </footer>
    </div>
  )
}
