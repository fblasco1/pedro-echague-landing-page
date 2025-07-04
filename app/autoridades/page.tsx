import Link from "next/link"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { getAllActividades } from "@/lib/sanity/actividades"

// Datos de la comisión directiva
const comisionDirectiva = [
  {
    nombre: "Raul Antoliche",
    cargo: "Presidente",
    tipo: "principal",
  },
  {
    nombre: "Jorge Zambrini",
    cargo: "Vicepresidente",
    tipo: "principal",
  },
  {
    nombre: "Juan Scheines",
    cargo: "Secretario",
    tipo: "principal",
  },
  {
    nombre: "Nora Ganem",
    cargo: "Prosecretaria",
    tipo: "principal",
  },
  {
    nombre: "Oscar Ebert",
    cargo: "Tesorero",
    tipo: "principal",
  },
  {
    nombre: "Carolina Antoliche",
    cargo: "Protesorera",
    tipo: "principal",
  },
  {
    nombre: "Gustavo Gonzalez",
    cargo: "Secretario de Actas",
    tipo: "principal",
  },
]

const vocalesTitulares = [
  { nombre: "Esteban Antoliche", cargo: "Vocal Titular" },
  { nombre: "Francisco Blasco", cargo: "Vocal Titular" },
  { nombre: "Ruben Galera", cargo: "Vocal Titular" },
  { nombre: "Daniel Marmo", cargo: "Vocal Titular" },
  { nombre: "Luis Oriolo", cargo: "Vocal Titular" },
]

const vocalesSuplentes = [
  { nombre: "Emiliano Antoliche", cargo: "Vocal Suplente" },
  { nombre: "Sergio Ledesma", cargo: "Vocal Suplente" },
  { nombre: "Antonio Parisi", cargo: "Vocal Suplente" },
  { nombre: "Federico Senno", cargo: "Vocal Suplente" },
]

const revisoresCuenta = [
  { nombre: "Adolfo Minardi", cargo: "Revisor de Cuenta" },
  { nombre: "Marcelo Goñi", cargo: "Revisor de Cuenta" },
]

export default async function AutoridadesPage() {
  const actividades = await getAllActividades()
  return (
    <div className="min-h-screen bg-background">
      <Header actividades={actividades} />

      {/* Nuevo header con componente reutilizable */}
      <PageHeader
        title="AUTORIDADES"
        backgroundImage=""
        hashtag="COMISIONDIRECTIVA"
        backLink="/"
      />

      <main className="container py-12 px-4 md:px-6">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-yellow mb-8 font-raleway">Comisión Directiva</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comisionDirectiva.map((miembro, index) => (
              <div
                key={index}
                className={`transform -rotate-2 ${
                  index === 0
                    ? "bg-club-blue text-white"
                    : index === 1
                      ? "bg-club-yellow text-club-blue"
                      : "bg-gray-100"
                } p-6 shadow-lg`}
              >
                <h3 className={`text-2xl font-bold mb-1 font-raleway ${index > 1 ? "text-club-blue" : ""}`}>
                  {miembro.nombre}
                </h3>
                <p
                  className={`text-sm font-medium ${
                    index === 0 ? "text-white" : index === 1 ? "text-club-blue" : "text-club-yellow"
                  }`}
                >
                  {miembro.cargo.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-yellow mb-8 font-raleway">Vocales Titulares</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocalesTitulares.map((miembro, index) => (
              <div key={index} className="transform -rotate-2 bg-gray-100 p-6 shadow-md">
                <h3 className="text-2xl font-bold text-club-blue mb-1 font-raleway">{miembro.nombre}</h3>
                <p className="text-sm font-medium text-club-yellow">{miembro.cargo.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-yellow mb-8 font-raleway">Vocales Suplentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocalesSuplentes.map((miembro, index) => (
              <div key={index} className="transform -rotate-2 bg-gray-100 p-6 shadow-md">
                <h3 className="text-2xl font-bold text-club-blue mb-1 font-raleway">{miembro.nombre}</h3>
                <p className="text-sm font-medium text-club-yellow">{miembro.cargo.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-blue mb-8 font-raleway">Revisores de Cuenta</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {revisoresCuenta.map((miembro, index) => (
              <div key={index} className="transform -rotate-2 bg-gray-100 p-6 shadow-md">
                <h3 className="text-2xl font-bold text-club-blue mb-1 font-raleway">{miembro.nombre}</h3>
                <p className="text-sm font-medium text-club-yellow">{miembro.cargo.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-club-blue/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Sobre nuestra Comisión Directiva</h2>
          <p className="text-club-dark/80 mb-4 font-roboto">
            La Comisión Directiva del Club Pedro Echagüe está formada por socios comprometidos con el crecimiento y
            desarrollo de nuestra institución. Cada miembro aporta su experiencia y dedicación para mantener vivo el
            espíritu del club.
          </p>
          <p className="text-club-dark/80 font-roboto">
            Las autoridades permanecen en sus cargos por un período de cuatro años, trabajando ad honorem por el
            bienestar de toda la comunidad del club.
          </p>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-white/70 md:text-left font-roboto">
            © {new Date().getFullYear()} Club Pedro Echagüe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-white/70 hover:text-white font-roboto">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-sm text-white/70 hover:text-white font-roboto">
              Términos de Servicio
            </Link>
            <Link href="#" className="text-sm text-white/70 hover:text-white font-roboto">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
