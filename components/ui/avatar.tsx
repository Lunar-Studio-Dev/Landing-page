import * as React from "react"

import { cn } from "@/lib/utils"

function Avatar({
  initials,
  className,
  ...props
}: React.ComponentProps<"span"> & { initials: string }) {
  return (
    <span
      data-slot="avatar"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-medium text-secondary-foreground select-none",
        className
      )}
      {...props}
    >
      {initials}
    </span>
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-3", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarGroup }
