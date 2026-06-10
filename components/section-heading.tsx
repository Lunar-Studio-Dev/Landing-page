import { cn } from "@/lib/utils"

function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("flex max-w-xl flex-col gap-2", className)}>
      {/* Eyebrows stay grey monospace uppercase — never the brand color */}
      <p className="font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}

export { SectionHeading }
