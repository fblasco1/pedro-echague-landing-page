import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Socios | Club Pedro Echagüe",
  description: "Información para socios del Club Pedro Echagüe",
}

export default function SociosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
