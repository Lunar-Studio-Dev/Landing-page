import { Star } from "lucide-react";

import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const COMMUNITY = ["AR", "PK", "SJ", "MN", "DV"];

function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 pt-28 pb-40 text-center">
        <div className="flex items-center gap-3">
          <AvatarGroup>
            {COMMUNITY.map((initials) => (
              <Avatar key={initials} initials={initials} />
            ))}
          </AvatarGroup>
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex text-foreground">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Home of 10,000+ Designers
            </p>
          </div>
        </div>

        <h1 className="text-5xl font-medium tracking-tight text-balance sm:text-7xl">
          Join the <em className="font-serif italic">fastest</em> growing design
          community?
        </h1>

        <p className="max-w-md text-base text-muted-foreground sm:text-lg">
          We are on a mission to bring a revolution to make India the design
          hub, and we need your support!
        </p>

        <div className="flex items-center gap-3">
          <Button variant="brand" size="lg">
            Join Now
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Bottom brand glow - large accent areas stay translucent, never opaque fills */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
      >
        <div className="absolute bottom-[-55%] left-1/2 h-full w-3/4 -translate-x-1/2 rounded-[100%] bg-brand opacity-25 blur-3xl" />
        <div className="absolute bottom-[-65%] left-1/2 h-3/4 w-2/5 -translate-x-1/2 rounded-[100%] bg-brand opacity-50 blur-2xl" />
        <div className="absolute bottom-[-70%] left-1/2 h-1/2 w-1/5 -translate-x-1/2 rounded-[100%] bg-foreground opacity-40 blur-2xl" />
      </div>
    </section>
  );
}

export { Hero };
