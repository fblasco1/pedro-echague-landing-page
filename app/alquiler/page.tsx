import type { Metadata } from "next"
import { Suspense } from "react"
import { AlquilerExterno } from "./AlquilerExterno"

export const metadata: Metadata = {
  title: "Reserva de espacios | Club Pedro Echagüe",
  description:
    "Reservá un espacio del Club Pedro Echagüe online: elegí fecha, horario y adjuntá el comprobante de transferencia.",
  robots: { index: true, follow: true },
}

export default function AlquilerPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <p className="font-raleway text-xs font-bold uppercase tracking-widest text-club-blue mb-2">
            Espacios
          </p>
          <h1 className="font-raleway text-3xl sm:text-4xl font-bold text-club-blue mb-3">
            Reserva de espacios
          </h1>
          <p className="font-roboto text-gray-600 max-w-xl mx-auto">
            Elegí fecha y horario, completá tus datos y guardá el enlace de seguimiento
            para adjuntar el comprobante. No hace falta ser socio.
          </p>
        </header>
        <Suspense
          fallback={<div className="h-40 rounded-xl bg-white/80 animate-pulse" />}
        >
          <AlquilerExterno />
        </Suspense>
      </div>
    </main>
  )
}
