import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autoridades | Club Pedro Echague",
  description: "Conoce a las autoridades y comisión directiva del Club Pedro Echague",
}

export default function AutoridadesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
