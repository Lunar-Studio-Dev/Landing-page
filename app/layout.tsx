import { Geist_Mono, Inter, Noto_Serif } from "next/font/google"

import "lenis/dist/lenis.css"
import "./globals.css"
import { AppScrollbar } from "@/components/app-scrollbar"
import { Header } from "@/components/sections/header"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
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
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        notoSerif.variable,
      )}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <Header />
            {children}
            <AppScrollbar />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
