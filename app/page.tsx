import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Heart, Users, Handshake, Home, Award, Flag, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Timeline } from "@/components/timeline"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { MapModal } from "@/components/map-modal"
import { FederatedActivitiesGrid } from "@/components/federated-activities-grid"
import { getAllActividades } from '@/lib/sanity/actividades'

// Datos de valores del club
const valoresClub = [
  {
    nombre: "Amistad",
    descripcion: "Vínculo que une a quienes transitan el club y le da sentido de comunidad a cada encuentro.",
    icono: <Heart className="h-6 w-6 text-club-blue" />,
  },
  {
    nombre: "Solidaridad",
    descripcion: "Compromiso activo con los demás y con el crecimiento colectivo.",
    icono: <Handshake className="h-6 w-6 text-club-blue" />,
  },
  {
    nombre: "Familia",
    descripcion: "El club como espacio compartido donde se transmiten y construyen valores a través del tiempo.",
    icono: <Home className="h-6 w-6 text-club-blue" />,
  },
  {
    nombre: "Compromiso",
    descripcion: "Entrega genuina en cada acción, dentro y fuera de la cancha.",
    icono: <Award className="h-6 w-6 text-club-blue" />,
  },
  {
    nombre: "Identidad",
    descripcion: "Orgullo por la historia y el presente del club, con raíces profundas en el barrio.",
    icono: <Flag className="h-6 w-6 text-club-blue" />,
  },
  {
    nombre: "Trabajo en equipo",
    descripcion: "Entendemos que todo logro es el resultado del esfuerzo colectivo.",
    icono: <Users className="h-6 w-6 text-club-blue" />,
  },
  {
    nombre: "Formación humana",
    descripcion: "Más allá del resultado deportivo, buscamos personas íntegras, solidarias y responsables.",
    icono: <BookOpen className="h-6 w-6 text-club-blue" />,
  },
]

export default async function ClubLandingPage() {
  // Obtener todas las actividades federadas principales desde Sanity
  const actividades = await getAllActividades()
  // Filtrar solo las actividades federadas principales (puedes ajustar el filtro según tu lógica)
  const federadasPrincipales = actividades.filter(a => [
    'Básquet',
    'Baby Fútbol',
    'Vóley',
    'Taekwondo',
    'Gimnasio Fitness',
    'Patín Artístico',
    'Gimnasia Artística',
  ].includes(a.title))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />

      <main className="flex-1">
        {/* Quienes Somos Section - White Background */}
        <section id="quienes-somos" className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-club-blue font-raleway">
                  ¿Quiénes somos?
                </h2>
              </div>
            </div>

            <div className="grid gap-6 sm:gap-8 md:gap-12 mt-6 sm:mt-8 md:mt-12 md:grid-cols-2">
              <div className="bg-club-blue text-white p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-raleway">Misión</h3>
                <p className="text-base sm:text-lg font-roboto leading-relaxed">
                  Nuestra misión es acompañar a los miembros de nuestra comunidad del club en su formación deportiva y
                  cultural, fomentando valores importantes con un compromiso social. De esta manera, podemos contribuir
                  al desarrollo de nuestra sociedad juntos.
                </p>
              </div>

              <div className="bg-club-yellow text-club-dark p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-raleway">Visión</h3>
                <p className="text-base sm:text-lg font-roboto leading-relaxed">
                  Ser un club referente en la zona de excelencia en la formación deportiva y cultural que estimula
                  hábitos saludables y la Inclusión social.
                </p>
              </div>
            </div>

            {/* Sección de Valores */}
            <div className="mt-12 sm:mt-16">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-club-blue mb-6 sm:mb-8 text-center font-raleway">
                NUESTROS VALORES
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {valoresClub.map((valor, index) => (
                  <div
                    key={index}
                    className="bg-white border border-club-blue/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                  >
                    <div className="bg-club-yellow/10 p-3 rounded-full mb-4">{valor.icono}</div>
                    <h4 className="text-lg font-bold text-club-blue mb-2 font-raleway">{valor.nombre}</h4>
                    <p className="text-club-dark/80 font-roboto">{valor.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* History Section - Blue Background */}
        <section id="history" className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-club-blue text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white font-raleway">
                  HISTORIA
                </h2>
              </div>
            </div>
            <Timeline />
          </div>
        </section>

        {/* Infrastructure Section - White Background */}
        <section id="infrastructure" className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-club-blue font-raleway">
                  Infraestructura
                </h2>
                <p className="max-w-[900px] text-club-dark/80 text-base sm:text-lg md:text-xl font-roboto">
                  Instalaciones modernas diseñadas para mejorar tu experiencia en el club.
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 md:mt-12 max-w-4xl mx-auto">
              <YouTubeEmbed videoId="ggKOr5BFHOs" title="Club Pedro Echagüe - Instalaciones" />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 sm:mt-8 md:mt-12">
              <MapModal
                trigger={
                  <Button className="bg-club-blue hover:bg-club-blue/90 text-white font-roboto text-sm sm:text-base w-full sm:w-auto">
                    <MapPin className="mr-2 h-4 w-4" />
                    Ver Mapa de Ubicación
                  </Button>
                }
              />

              <Link href="/infraestructura" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-club-blue text-club-blue hover:bg-club-blue/10 font-roboto text-sm sm:text-base w-full"
                >
                  Ver Detalles de Instalaciones
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Activities Section - Blue Background */}
        <section id="activities" className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-club-blue text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white font-raleway">
                  Actividades
                </h2>
                <p className="max-w-[900px] text-white/80 text-base sm:text-lg md:text-xl font-roboto">
                  Conocé nuestras actividades federadas principales.
                </p>
              </div>
            </div>

            {/* Actividades federadas principales */}
            <FederatedActivitiesGrid
              activities={federadasPrincipales.map((actividad) => ({
                id: actividad._id,
                title: actividad.title,
                logoUrl: actividad.logo?.asset?.url || '/placeholder.svg',
                link: `/actividades/${actividad.slug.current}`,
              }))}
            />
          </div>
        </section>

        {/* CTA Section - White Background */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-club-blue font-raleway">
                  Sumate a Nuestra Comunidad
                </h2>
                <p className="mx-auto max-w-[700px] text-club-dark/80 text-base sm:text-lg md:text-xl font-roboto">
                  Formá parte de nuestra familia y disfrutá de beneficios y experiencias exclusivas.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-club-blue text-white hover:bg-club-blue/90 font-roboto text-sm sm:text-base"
                >
                  Solicitar Membresía
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-club-blue border-club-blue hover:bg-club-blue/10 font-roboto text-sm sm:text-base"
                >
                  Contactanos
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-xs sm:text-sm leading-loose text-white/70 md:text-left font-roboto">
            © {new Date().getFullYear()} Club Pedro Echagüe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs sm:text-sm text-white/70 hover:text-white font-roboto">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-xs sm:text-sm text-white/70 hover:text-white font-roboto">
              Términos de Servicio
            </Link>
            <Link href="#" className="text-xs sm:text-sm text-white/70 hover:text-white font-roboto">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
