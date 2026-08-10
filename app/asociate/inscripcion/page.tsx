import { Metadata } from "next"
import { InscripcionWizard } from "./InscripcionWizard"

export const metadata: Metadata = {
  title: "Inscripción de socio | Club Pedro Echagüe",
  description:
    "Completá tus datos y los de tu familia para solicitar el alta como socio del Club Pedro Echagüe.",
  alternates: {
    canonical: "https://www.icdpedroechague.com.ar/asociate/inscripcion",
  },
  robots: { index: true, follow: true },
}

export default function InscripcionPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <p className="font-raleway text-xs font-bold uppercase tracking-widest text-club-blue mb-2">
            Membresía
          </p>
          <h1 className="font-raleway text-3xl sm:text-4xl font-bold text-club-blue mb-3">
            Sumate al Club Pedro Echagüe
          </h1>
          <p className="font-roboto text-gray-600 max-w-xl mx-auto">
            Completá tus datos y unite a una comunidad llena de actividades, eventos y
            momentos para compartir.
          </p>
        </header>
        <InscripcionWizard />
      </div>
    </main>
  )
}
