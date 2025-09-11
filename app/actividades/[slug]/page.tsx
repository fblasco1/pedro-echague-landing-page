import Image from "next/image"
import Link from "next/link"
import { Calendar, Users } from "lucide-react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getActividadBySlug, getAllActividades } from '@/lib/sanity/actividades'

export default async function ActivityPage({ params }: { params: { slug: string } }) {
  const activity = await getActividadBySlug(params.slug)
  const actividades = await getAllActividades()

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header actividades={actividades} />
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

  function renderHorariosTable(horarios: any[]) {
    if (!horarios || horarios.length === 0) return null

    // Detectar si hay tira y género
    const tieneTira = horarios.some((h) => h.tira)
    const tieneGenero = horarios.some((h) => h.genero)
    const tieneSocio = horarios.some((h) => h.arancelSocio || h.arancelNoSocio)
    const tieneArancelPorClases = horarios.some((h) => h.arancelPorClases)

    if (tieneTira || tieneGenero) {
      // Deportes con Tiras
      return (
        <table className="w-full">
          <thead className="bg-club-blue text-white">
            <tr>
              {tieneGenero && <th className="py-3 px-4 text-left font-raleway">Género</th>}
              <th className="py-3 px-4 text-left font-raleway">Categoría</th>
              <th className="py-3 px-4 text-left font-raleway">Tira</th>
              <th className="py-3 px-4 text-left font-raleway">Horarios</th>
              <th className="py-3 px-4 text-left font-raleway">Arancel</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                {tieneGenero && <td className="py-3 px-4 font-roboto">{item.genero || "-"}</td>}
                <td className="py-3 px-4 font-roboto font-medium">{item.category}</td>
                <td className="py-3 px-4 font-roboto">{item.tira || "-"}</td>
                <td className="py-3 px-4 font-roboto">{item.days}</td>
                <td className="py-3 px-4 font-roboto font-medium">{item.fee || item.arancel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else if (tieneSocio) {
      // Gimnasio Fitness y talleres con arancel socio/no socio
      return (
        <table className="w-full">
          <thead className="bg-club-blue text-white">
            <tr>
              <th className="py-3 px-4 text-left font-raleway">Categoría</th>
              <th className="py-3 px-4 text-left font-raleway">Horarios</th>
              <th className="py-3 px-4 text-left font-raleway">Arancel Socio</th>
              <th className="py-3 px-4 text-left font-raleway">Arancel No Socio</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4 font-roboto font-medium">{item.category}</td>
                <td className="py-3 px-4 font-roboto">{item.days}</td>
                <td className="py-3 px-4 font-roboto font-medium">{item.arancelSocio || "-"}</td>
                <td className="py-3 px-4 font-roboto font-medium">{item.arancelNoSocio || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else if (tieneArancelPorClases) {
      // Arancel variable por clases
      return (
        <table className="w-full">
          <thead className="bg-club-blue text-white">
            <tr>
              <th className="py-3 px-4 text-left font-raleway">Categoría</th>
              <th className="py-3 px-4 text-left font-raleway">Horarios</th>
              <th className="py-3 px-4 text-left font-raleway">Arancel</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4 font-roboto font-medium">{item.category}</td>
                <td className="py-3 px-4 font-roboto">{item.days}</td>
                <td className="py-3 px-4 font-roboto font-medium">{item.arancelPorClases || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else {
      // Actividades simples
      return (
        <table className="w-full">
          <thead className="bg-club-blue text-white">
            <tr>
              <th className="py-3 px-4 text-left font-raleway">Categoría</th>
              <th className="py-3 px-4 text-left font-raleway">Horarios</th>
              <th className="py-3 px-4 text-left font-raleway">Arancel</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4 font-roboto font-medium">{item.category}</td>
                <td className="py-3 px-4 font-roboto">{item.days}</td>
                <td className="py-3 px-4 font-roboto font-medium">{item.fee || item.arancel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header actividades={actividades} />
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
        {activity.horarios && activity.horarios.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Horarios</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {renderHorariosTable(activity.horarios)}
            </div>
          </div>
        )}
        {/* Staff Técnico */}
        {activity.coaches && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">Staff Técnico</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {activity.coaches.map((coach: any, index: number) => (
                <div key={index} className="flex flex-col h-full">
                  <div
                    className={`transform -rotate-2 ${
                      index % 2 === 0 ? "bg-club-blue text-white" : "bg-club-yellow text-club-blue"
                    } p-4 shadow-lg z-10 relative mb-4`}
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
                  {coach.image?.asset?.url && (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={coach.image.asset.url}
                        alt={`${coach.firstName} ${coach.lastName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
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
            <a
              href="https://wa.me/5491136391151"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-club-blue text-white hover:bg-club-blue/90 w-full sm:w-auto">Consultar por esta actividad</Button>
            </a>
            <Link href="/asociate">
              <Button variant="outline" className="border-club-blue text-club-blue hover:bg-club-blue/10 w-full sm:w-auto">
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
