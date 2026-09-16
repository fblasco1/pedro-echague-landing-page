import type { Metadata } from "next"
import { InscripcionPortal } from "./InscripcionPortal"

export const metadata: Metadata = {
  title: "Actividades",
  description: "Elegí tus actividades del Club Pedro Echagüe con tu usuario de socio.",
  robots: { index: false, follow: false },
}

export default function SociosActividadesPage() {
  return <InscripcionPortal />
}
