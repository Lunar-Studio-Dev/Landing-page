import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { AppScrollArea, AppScrollProvider } from "@/components/app-scroll"
import { Header } from "@/components/sections/header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="h-svh overflow-hidden">
        <ThemeProvider>
          <AppScrollProvider>
            <Header />
            <AppScrollArea>{children}</AppScrollArea>
          </AppScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
