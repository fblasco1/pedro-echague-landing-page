import Image from "next/image"
import Link from "next/link"
import { Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageGallery } from "@/components/image-gallery"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { getAllActividades } from "@/lib/sanity/actividades"
import { getAllInstalaciones } from "@/lib/sanity/infraestructura"

export default async function InfraestructuraPage() {
  const actividades = await getAllActividades()
  const instalaciones = await getAllInstalaciones()
  return (
    <div className="min-h-screen bg-background">
      <Header actividades={actividades} />

      {/* Nuevo header con componente reutilizable */}
      <PageHeader
        title="INFRAESTRUCTURA"
        backgroundImage=""
        hashtag="NUESTRASINSTALACIONES"
        backLink="/"
      />

      <main className="container py-12 px-4 md:px-6">
        <p className="max-w-[900px] text-club-dark/80 md:text-xl/relaxed mb-12 font-roboto">
          Conocé en detalle cada uno de los espacios que conforman nuestro club, diseñados para brindarte la mejor
          experiencia deportiva y social.
        </p>

        <Tabs defaultValue={instalaciones[0]?._id} className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto bg-club-gray mb-8 p-2 gap-2">
            {instalaciones.map((item) => (
              <TabsTrigger
                key={item._id}
                value={item._id}
                className="data-[state=active]:bg-club-blue data-[state=active]:text-white"
              >
                {item.nombre}
              </TabsTrigger>
            ))}
          </TabsList>

          {instalaciones.map((item) => (
            <TabsContent key={item._id} value={item._id} className="mt-6">
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
                    src={item.imagenes[0]?.src || "/placeholder.svg"}
                    alt={item.imagenes[0]?.alt || "Imagen de instalación"}
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
