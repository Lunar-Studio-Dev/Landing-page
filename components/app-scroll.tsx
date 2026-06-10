"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"

const AppScrollContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

/**
 * The app scrolls inside a ScrollArea viewport instead of the window, so
 * scroll-linked behaviors (e.g. the header morph) must read this viewport.
 */
function useAppScrollViewport() {
  return React.useContext(AppScrollContext)
}

function AppScrollProvider({ children }: { children: React.ReactNode }) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <AppScrollContext.Provider value={viewportRef}>
      {children}
    </AppScrollContext.Provider>
  )
}

function AppScrollArea({ children }: { children: React.ReactNode }) {
  const viewportRef = useAppScrollViewport()

  return (
    <ScrollArea
      className="h-svh"
      viewportRef={viewportRef}
      viewportClassName="scroll-pt-24 scroll-smooth"
    >
      {children}
    </ScrollArea>
  )
}

export { AppScrollProvider, AppScrollArea, useAppScrollViewport }
