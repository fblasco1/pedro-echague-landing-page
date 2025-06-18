import Image from "next/image"
import Link from "next/link"
import { Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageGallery } from "@/components/image-gallery"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"

// Datos de ejemplo para las instalaciones
const infraestructuraData = [
  {
    id: "gimnasio-1",
    nombre: "Gimnasio 1",
    descripcion:
      "Nuestro gimnasio principal cuenta con una cancha reglamentaria de básquet y capacidad para eventos deportivos de gran escala. Equipado con gradas para espectadores, marcador electrónico y sistema de sonido profesional.",
    aforo: 500,
    imagenes: [
      { src: "/images/gimnasio-1.png", alt: "Gimnasio 1 - Vista general" },
      { src: "/images/gimnasio-1-tribunas.png", alt: "Gimnasio 1 - Gradas" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Gimnasio 1 - Vestuarios" },
    ],
  },
  {
    id: "gimnasio-2",
    nombre: "Gimnasio 2",
    descripcion:
      "Espacio multifuncional para prácticas deportivas, entrenamientos y clases grupales. Cuenta con piso flotante de madera, espejos en una de sus paredes y equipamiento versátil para diferentes disciplinas.",
    aforo: 200,
    imagenes: [
      { src: "/placeholder.svg?height=400&width=600", alt: "Gimnasio 2 - Vista general" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Gimnasio 2 - Área de entrenamiento" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Gimnasio 2 - Equipamiento" },
    ],
  },
  {
    id: "gimnasio-3",
    nombre: "Gimnasio 3",
    descripcion:
      "Nuestra cancha principal, estadio con capacidad para 1000 espectadores. La casa de nuestros guerreros.",
    aforo: 1000,
    imagenes: [
      { src: "/images/gimnasio-3.png", alt: "Gimnasio 3 - Vista general" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Gimnasio 3 - Cancha" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Gimnasio 3 - Área técnica" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Gimnasio 3 - Iluminación" },
    ],
  },
  {
    id: "restaurante",
    nombre: 'Restaurante "La Casona"',
    descripcion:
      "Espacio gastronómico tradicional del club donde los socios pueden disfrutar de comidas caseras, eventos especiales y reuniones sociales. Ofrece un menú variado con opciones para toda la familia en un ambiente acogedor.",
    imagenes: [
      { src: "/placeholder.svg?height=400&width=600", alt: "Restaurante - Salón principal" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Restaurante - Barra" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Restaurante - Terraza" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Restaurante - Cocina" },
    ],
  },
  {
    id: "fitness",
    nombre: "Gimnasio de Fitness",
    descripcion:
      "Área especializada para entrenamiento físico con equipamiento moderno de musculación, cardio y entrenamiento funcional. Cuenta con instructores calificados y programas personalizados para socios de todas las edades.",
    aforo: 80,
    imagenes: [
      { src: "/placeholder.svg?height=400&width=600", alt: "Fitness - Área de musculación" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Fitness - Zona cardio" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Fitness - Área funcional" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Fitness - Vestuarios" },
    ],
  },
  {
    id: "salon",
    nombre: "Salón de Fiestas",
    descripcion:
      "Amplio espacio para eventos sociales, celebraciones y reuniones. Equipado con sistema de sonido, iluminación ambiental y capacidad para servicio de catering. Ideal para fiestas, cumpleaños y eventos corporativos.",
    aforo: 250,
    imagenes: [
      { src: "/placeholder.svg?height=400&width=600", alt: "Salón - Vista general" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Salón - Decoración" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Salón - Escenario" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Salón - Área de servicio" },
    ],
  },
  {
    id: "subsuelo",
    nombre: "SUBSUELO",
    descripcion:
      "Espacio multifuncional ubicado en el nivel inferior del club. Alberga salas de reuniones, áreas de almacenamiento y espacios técnicos. También cuenta con salas para actividades específicas como ajedrez, ping pong y juegos de mesa.",
    imagenes: [
      { src: "/placeholder.svg?height=400&width=600", alt: "Subsuelo - Pasillo principal" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Subsuelo - Sala de reuniones" },
      { src: "/placeholder.svg?height=400&width=600", alt: "Subsuelo - Área de juegos" },
    ],
  },
]

export default function InfraestructuraPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Nuevo header con componente reutilizable */}
      <PageHeader
        title="INFRAESTRUCTURA"
        backgroundImage="/placeholder.svg?height=800&width=1600"
        hashtag="NUESTRASINSTALACIONES"
        backLink="/"
      />

      <main className="container py-12 px-4 md:px-6">
        <p className="max-w-[900px] text-club-dark/80 md:text-xl/relaxed mb-12 font-roboto">
          Conocé en detalle cada uno de los espacios que conforman nuestro club, diseñados para brindarte la mejor
          experiencia deportiva y social.
        </p>

        <Tabs defaultValue="gimnasio-1" className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto bg-club-gray mb-8 p-2 gap-2">
            {infraestructuraData.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="data-[state=active]:bg-club-blue data-[state=active]:text-white"
              >
                {item.nombre}
              </TabsTrigger>
            ))}
          </TabsList>

          {infraestructuraData.map((item) => (
            <TabsContent key={item.id} value={item.id} className="mt-6">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">{item.nombre}</h2>
                  <p className="text-club-dark/80 mb-6 font-roboto">{item.descripcion}</p>

                  {item.aforo && (
                    <div className="flex items-center gap-2 text-club-blue">
                      <Users className="h-5 w-5" />
                      <span className="font-medium font-roboto">Capacidad: {item.aforo} personas</span>
                    </div>
                  )}
                </div>

                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={item.imagenes[0].src || "/placeholder.svg"}
                    alt={item.imagenes[0].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold text-club-blue mb-6 font-raleway">Galería de Imágenes</h3>
                <ImageGallery images={item.imagenes} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white">
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
