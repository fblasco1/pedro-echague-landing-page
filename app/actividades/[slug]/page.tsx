import Image from "next/image"
import Link from "next/link"
import { Calendar, Users } from "lucide-react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getActividadBySlug } from '@/lib/sanity/actividades'

export default async function ActivityPage({ params }: { params: { slug: string } }) {
  const activity = await getActividadBySlug(params.slug)

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-club-blue mb-4">Actividad no encontrada</h1>
            <p className="text-club-dark/80 mb-6">La actividad que estás buscando no existe o ha sido eliminada.</p>
            <Link href="/actividades">
              <Button className="bg-club-blue text-white">Ver todas las actividades</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHeader
        title={activity.title?.toUpperCase()}
        backgroundImage={activity.fotoPortada?.asset?.url || activity.imageSrc?.asset?.url || ""}
        hashtag={
          activity.tipo === "federada"
            ? "DEPORTEFEDERADO"
            : activity.tipo === "recreativa"
              ? "RECREATIVAS"
              : "CULTURALES"
        }
        backLink="/actividades"
      />
      <main className="container py-12 px-4 md:px-6">
        {/* Categorías */}
        <div className="flex flex-wrap gap-2 mb-6">
          {activity.categories?.map((category: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-club-blue/10 text-club-blue border-club-blue/20">
              {category}
            </Badge>
          ))}
        </div>
        {/* Descripción */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Descripción</h2>
          <p className="text-club-dark/80 font-roboto mb-6">{activity.description}</p>
          <p className="text-club-dark/80 font-roboto">{activity.longDescription}</p>
        </div>
        {/* Horarios */}
        {activity.horarios && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Horarios</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-club-blue text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-raleway">Categoría</th>
                    <th className="py-3 px-4 text-left font-raleway">Tira</th>
                    <th className="py-3 px-4 text-left font-raleway">Días y Horarios</th>
                    <th className="py-3 px-4 text-left font-raleway">Arancel</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.horarios.map((item: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-3 px-4 font-roboto font-medium">{item.category}</td>
                      <td className="py-3 px-4 font-roboto">{item.tira}</td>
                      <td className="py-3 px-4 font-roboto">{item.days}</td>
                      <td className="py-3 px-4 font-roboto font-medium">{item.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Staff Técnico */}
        {activity.coaches && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">Staff Técnico</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activity.coaches.map((coach: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <div
                    className={`transform -rotate-2 ${
                      index % 2 === 0 ? "bg-club-blue text-white" : "bg-club-yellow text-club-blue"
                    } p-4 shadow-lg z-10 mb-[-30px] relative`}
                  >
                    <h3 className="text-xl font-bold mb-1 font-raleway">
                      {coach.firstName} {coach.lastName}
                    </h3>
                    {coach.roles?.map((role: any, roleIndex: number) => (
                      <div key={roleIndex} className="mb-2">
                        <p className={`text-sm font-medium ${index % 2 === 0 ? "text-white" : "text-club-blue"}`}>
                          {role.position}
                        </p>
                        <p className={`text-xs ${index % 2 === 0 ? "text-white/80" : "text-club-blue/80"}`}>
                          {role.teams}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={coach.image?.asset?.url || "/placeholder.svg?height=400&width=300"}
                      alt={`${coach.firstName} ${coach.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Próximos eventos */}
        {activity.events && activity.events.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Próximos eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activity.events.map((event: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-club-blue mb-2 font-raleway">{event.title}</h3>
                  <div className="flex items-center gap-2 text-club-dark/70 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-roboto">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-club-dark/70">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-roboto">{event.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Galería de imágenes */}
        {activity.gallery && activity.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Galería</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activity.gallery.map((image: any, index: number) => (
                <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={image.asset?.url || "/placeholder.svg"}
                    alt={`${activity.title} - Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">¿Te interesa esta actividad?</h2>
          <p className="text-club-dark/80 font-roboto mb-6 max-w-2xl mx-auto">
            Sumate a nuestra comunidad y disfrutá de todas las actividades que ofrece el Club Pedro Echagüe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-club-blue text-white hover:bg-club-blue/90">Consultar por esta actividad</Button>
            <Link href="/asociate">
              <Button variant="outline" className="border-club-blue text-club-blue hover:bg-club-blue/10">
                Asociate ahora
              </Button>
            </Link>
          </div>
        </div>
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
