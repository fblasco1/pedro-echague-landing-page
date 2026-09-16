import type { Metadata } from "next"
import { PortalInicio } from "./PortalInicio"

export const metadata: Metadata = {
  title: "Inicio",
  description: "Portal del socio — Club Pedro Echagüe",
  robots: { index: false, follow: false },
}

export default function SociosIndexPage() {
  return <PortalInicio />
}
