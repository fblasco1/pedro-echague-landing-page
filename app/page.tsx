import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Heart, Users, Handshake, Home, Award, Flag, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Timeline } from "@/components/timeline"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { MapModal } from "@/components/map-modal"

// Datos de actividades destacadas
const featuredActivities = [
  {
    title: "Básquet",
    description:
      "Formación y competición en básquet para todas las edades. Contamos con tres tiras masculinas y una tira femenina.",
    imageSrc: "/images/activities/basquet.png",
    link: "/actividades/basquet",
  },
  {
    title: "Patín Artístico",
    description:
      "Disciplina que combina elementos técnicos y artísticos sobre patines. Formación desde nivel inicial hasta competitivo.",
    imageSrc: "/images/activities/patin.png",
    link: "/actividades/patin",
  },
  {
    title: "Gimnasio Fitness",
    description:
      "Espacio equipado con máquinas de musculación y cardio. Entrenamiento personalizado y seguimiento por profesionales.",
    imageSrc: "/images/activities/fitness.png",
    link: "/actividades/fitness",
  },
]

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

export default function ClubLandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header con estilo Boca */}
      <Header />

      {/* Hero con estilo Boca */}
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

            <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 sm:p-6 bg-white shadow-md">
                <div className="p-3 rounded-full bg-club-blue/10">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-club-blue" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-club-blue font-raleway">Gimnasios</h3>
                <p className="text-center text-club-dark/80 text-sm sm:text-base font-roboto">
                  Tres gimnasios equipados para diferentes actividades deportivas y eventos.
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Gimnasios"
                  className="mt-4 rounded-lg object-cover w-full"
                />
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 sm:p-6 bg-white shadow-md">
                <div className="p-3 rounded-full bg-club-blue/10">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-club-blue" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-club-blue font-raleway">Restaurante y Salón</h3>
                <p className="text-center text-club-dark/80 text-sm sm:text-base font-roboto">
                  Espacios gastronómicos y de eventos para disfrutar con amigos y familia.
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Restaurante y Salón"
                  className="mt-4 rounded-lg object-cover w-full"
                />
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 sm:p-6 bg-white shadow-md">
                <div className="p-3 rounded-full bg-club-blue/10">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-club-blue" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-club-blue font-raleway">Fitness y Subsuelo</h3>
                <p className="text-center text-club-dark/80 text-sm sm:text-base font-roboto">
                  Áreas especializadas para entrenamiento físico y actividades complementarias.
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Fitness y Subsuelo"
                  className="mt-4 rounded-lg object-cover w-full"
                />
              </div>
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
                  Eventos y actividades para socios de todas las edades e intereses.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:gap-8 mt-6 sm:mt-8 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
              {featuredActivities.map((activity, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg border bg-white shadow-md">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={activity.imageSrc || "/placeholder.svg"}
                      width={400}
                      height={300}
                      alt={activity.title}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <Calendar className="h-4 w-4 text-club-blue mb-2" />
                    <h3 className="text-lg sm:text-xl font-bold text-club-blue font-raleway">{activity.title}</h3>
                    <p className="text-club-dark/80 text-sm sm:text-base font-roboto">{activity.description}</p>
                    <Button
                      variant="link"
                      asChild
                      className="p-0 mt-3 sm:mt-4 text-club-blue hover:text-club-blue/80 font-roboto text-sm sm:text-base"
                    >
                      <Link href={activity.link}>Ver más información</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 sm:mt-8 md:mt-12">
              <Button
                asChild
                className="bg-club-yellow hover:bg-club-yellow/90 text-club-blue font-roboto border border-club-blue text-sm sm:text-base"
              >
                <Link href="/actividades">Ver Todas las Actividades</Link>
              </Button>
            </div>
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
