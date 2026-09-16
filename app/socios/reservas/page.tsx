import type { Metadata } from "next"
import { ReservasPortal } from "./ReservasPortal"

export const metadata: Metadata = {
  title: "Reservas",
  description: "Consultá disponibilidad y reservá espacios del Club Pedro Echagüe.",
  robots: { index: false, follow: false },
}

export default function SociosReservasPage() {
  return <ReservasPortal />
}
