import type React from "react"
import type { Metadata } from "next"
import { SociosAppChrome } from "@/components/portal/SociosAppChrome"

export const metadata: Metadata = {
  title: "Portal del socio",
  description: "Portal autenticado de socios del Club Pedro Echagüe",
}

export default function SociosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SociosAppChrome>{children}</SociosAppChrome>
}
