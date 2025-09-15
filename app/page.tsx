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
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inicio",
  description: "Club Pedro Echagüe: Más de 90 años de historia deportiva y cultural. Descubrí nuestras actividades federadas, recreativas y culturales. Formá parte de nuestra gran familia.",
  keywords: [
    "club pedro echagüe",
    "inicio",
    "deportes",
    "básquet",
    "fútbol",
    "gimnasio",
    "actividades deportivas",
    "historia del club",
    "valores del club",
    "comunidad deportiva",
    "actividades recreativas",
    "actividades culturales"
  ],
  openGraph: {
    title: "Club Pedro Echagüe | Inicio",
    description: "Más de 90 años de historia deportiva y cultural. Descubrí nuestras actividades y formá parte de nuestra gran familia.",
    type: "website",
    url: "https://www.icdpedroechague.com.ar",
    images: [
      {
        url: "/images/portada.jpg",
        width: 1200,
        height: 630,
        alt: "Club Pedro Echagüe - Página de inicio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Pedro Echagüe | Inicio",
    description: "Más de 90 años de historia deportiva y cultural. Formá parte de nuestra gran familia.",
    images: ["/images/portada.jpg"],
  },
  alternates: {
    canonical: "https://www.icdpedroechague.com.ar",
  },
}

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
      <Header actividades={actividades} />
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
      </main>

      {/* Footer */}
<footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-white/70 md:text-left font-roboto">
            © 2024 Club Pedro Echagüe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/icdpedroechague/" className="text-white/70 hover:text-white" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
            </Link>
            <Link href="https://www.facebook.com/icdpedroechague" className="text-white/70 hover:text-white" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z"></path></svg>
            </Link>
            <Link href="https://wa.me/5491136391151" className="text-white/70 hover:text-white" aria-label="Whatsapp">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.67.96.98-3.58-.24-.38A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.03 2.82 1.18 3.02c.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"></path></svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
