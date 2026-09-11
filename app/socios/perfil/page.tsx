import type { Metadata } from "next"
import { PerfilSocioView } from "./PerfilSocioView"

export const metadata: Metadata = {
  title: "Mis datos",
  description: "Datos personales y foto de perfil del socio del Club Pedro Echagüe.",
  robots: { index: false, follow: false },
}

export default function SociosPerfilPage() {
  return <PerfilSocioView />
}
