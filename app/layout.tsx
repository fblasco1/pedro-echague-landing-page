import type React from "react"
import "./globals.css"
import { Raleway, Roboto } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata = {
  title: "Club Pedro Echague",
  description: "Club deportivo y cultural Pedro Echague",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${raleway.variable} ${roboto.variable} font-raleway`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
