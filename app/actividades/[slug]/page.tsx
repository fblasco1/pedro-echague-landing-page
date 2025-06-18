import Image from "next/image"
import Link from "next/link"
import { Calendar, Users } from "lucide-react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Datos de actividades con estructura actualizada para incluir aranceles y tiras
const activitiesData = {
  basquet: {
    id: "basquet",
    title: "Básquet",
    description:
      "Formación y competición en básquet para todas las edades. Contamos con tres tiras masculinas (Amarilla, Azul, Flex) y una tira femenina, además de nuestra escuelita para los más pequeños.",
    longDescription:
      "El básquet en Pedro Echagüe tiene una larga tradición que se remonta a los inicios del club. Actualmente, contamos con equipos en todas las categorías, desde escuelita hasta primera división, tanto en masculino como en femenino. Nuestros equipos participan en los torneos de la Federación de Básquet de la Ciudad de Buenos Aires (FEBAMBA) y han logrado importantes títulos a lo largo de la historia.",
    imageSrc: "/images/activities/basquet-portada.png",
    categories: ["Deportes de equipo", "Competitivo", "Infantil", "Juvenil", "Adultos"],
    schedule: [
      {
        category: "Escuelita (5-8 años)",
        tira: "Mixta",
        days: "Lunes y Miércoles 18:00 - 19:00",
        fee: "$16500",
      },
      {
        category: "Pre-Mini (9-10 años)",
        tira: "Amarilla",
        days: "Martes y Jueves 18:00 - 19:30",
        fee: "$17500",
      },
      {
        category: "Pre-Mini (9-10 años)",
        tira: "Azul",
        days: "Lunes y Miércoles 18:00 - 19:30",
        fee: "$17500",
      },
      {
        category: "Mini (11-12 años)",
        tira: "Amarilla",
        days: "Lunes y Miércoles 19:00 - 20:30",
        fee: "$17500",
      },
      {
        category: "Mini (11-12 años)",
        tira: "Azul",
        days: "Martes y Jueves 19:00 - 20:30",
        fee: "$17500",
      },
      {
        category: "U13 (13 años)",
        tira: "Amarilla",
        days: "Martes y Jueves 19:30 - 21:00",
        fee: "$17500",
      },
      {
        category: "U15 (14-15 años)",
        tira: "Amarilla",
        days: "Lunes y Miércoles 20:30 - 22:00",
        fee: "$17500",
      },
      {
        category: "U17 (16-17 años)",
        tira: "Amarilla",
        days: "Martes y Jueves 21:00 - 22:30",
        fee: "$17500",
      },
      {
        category: "Primera Masculino",
        tira: "A",
        days: "Miércoles 21:00 - 22:30, Viernes 20:30 - 22:00",
        fee: "Consultar",
      },
      {
        category: "Primera Femenino",
        tira: "Única",
        days: "Martes 20:00 - 21:30, Jueves 19:00 - 20:30",
        fee: "$16500",
      },
    ],
    coaches: [
      {
        firstName: "Juan",
        lastName: "PÉREZ",
        roles: [
          { position: "Entrenador", teams: "U15, U17 Amarilla" },
          { position: "Asistente", teams: "Primera 'A'" },
        ],
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        firstName: "María",
        lastName: "GONZÁLEZ",
        roles: [{ position: "Entrenadora", teams: "U13, Mini Femenino" }],
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        firstName: "Carlos",
        lastName: "RODRÍGUEZ",
        roles: [
          { position: "Asistente", teams: "U15, U17 Amarilla" },
          { position: "Entrenador", teams: "Escuelita" },
        ],
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        firstName: "Laura",
        lastName: "FERNÁNDEZ",
        roles: [{ position: "Preparadora Física", teams: "Todas las categorías" }],
        image: "/placeholder.svg?height=400&width=300",
      },
    ],
    events: [
      {
        title: "Torneo Metropolitano - Pedro Echagüe vs. Ferro",
        date: "Sábado 30 de marzo, 20:00hs",
        location: "Gimnasio 1",
      },
      {
        title: "Entrenamiento abierto - Tira Amarilla",
        date: "Miércoles 27 de marzo, 18:00hs",
        location: "Gimnasio 2",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tipo: "federada",
  },
  voley: {
    id: "voley",
    title: "Voley",
    description:
      "Formación y competición en básquet para todas las edades. Contamos con tres tiras masculinas (Amarilla, Azul, Flex) y una tira femenina, además de nuestra escuelita para los más pequeños.",
    longDescription:
      "El básquet en Pedro Echagüe tiene una larga tradición que se remonta a los inicios del club. Actualmente, contamos con equipos en todas las categorías, desde escuelita hasta primera división, tanto en masculino como en femenino. Nuestros equipos participan en los torneos de la Federación de Básquet de la Ciudad de Buenos Aires (FEBAMBA) y han logrado importantes títulos a lo largo de la historia.",
    imageSrc: "/images/activities/voley-portada.png",
    categories: ["Deportes de equipo", "Competitivo", "Infantil", "Juvenil", "Adultos"],
    schedule: [
      {
        category: "Escuelita (5-8 años)",
        tira: "Mixta",
        days: "Lunes y Miércoles 18:00 - 19:00",
        fee: "$16500",
      },
      {
        category: "Pre-Mini (9-10 años)",
        tira: "Amarilla",
        days: "Martes y Jueves 18:00 - 19:30",
        fee: "$17500",
      },
      {
        category: "Pre-Mini (9-10 años)",
        tira: "Azul",
        days: "Lunes y Miércoles 18:00 - 19:30",
        fee: "$17500",
      },
      {
        category: "Mini (11-12 años)",
        tira: "Amarilla",
        days: "Lunes y Miércoles 19:00 - 20:30",
        fee: "$17500",
      },
      {
        category: "Mini (11-12 años)",
        tira: "Azul",
        days: "Martes y Jueves 19:00 - 20:30",
        fee: "$17500",
      },
      {
        category: "U13 (13 años)",
        tira: "Amarilla",
        days: "Martes y Jueves 19:30 - 21:00",
        fee: "$17500",
      },
      {
        category: "U15 (14-15 años)",
        tira: "Amarilla",
        days: "Lunes y Miércoles 20:30 - 22:00",
        fee: "$17500",
      },
      {
        category: "U17 (16-17 años)",
        tira: "Amarilla",
        days: "Martes y Jueves 21:00 - 22:30",
        fee: "$17500",
      },
      {
        category: "Primera Masculino",
        tira: "A",
        days: "Miércoles 21:00 - 22:30, Viernes 20:30 - 22:00",
        fee: "Consultar",
      },
      {
        category: "Primera Femenino",
        tira: "Única",
        days: "Martes 20:00 - 21:30, Jueves 19:00 - 20:30",
        fee: "$16500",
      },
    ],
    coaches: [
      {
        firstName: "Juan",
        lastName: "PÉREZ",
        roles: [
          { position: "Entrenador", teams: "U15, U17 Amarilla" },
          { position: "Asistente", teams: "Primera 'A'" },
        ],
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        firstName: "María",
        lastName: "GONZÁLEZ",
        roles: [{ position: "Entrenadora", teams: "U13, Mini Femenino" }],
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        firstName: "Carlos",
        lastName: "RODRÍGUEZ",
        roles: [
          { position: "Asistente", teams: "U15, U17 Amarilla" },
          { position: "Entrenador", teams: "Escuelita" },
        ],
        image: "/placeholder.svg?height=400&width=300",
      },
      {
        firstName: "Laura",
        lastName: "FERNÁNDEZ",
        roles: [{ position: "Preparadora Física", teams: "Todas las categorías" }],
        image: "/placeholder.svg?height=400&width=300",
      },
    ],
    events: [
      {
        title: "Torneo Metropolitano - Pedro Echagüe vs. Ferro",
        date: "Sábado 30 de marzo, 20:00hs",
        location: "Gimnasio 1",
      },
      {
        title: "Entrenamiento abierto - Tira Amarilla",
        date: "Miércoles 27 de marzo, 18:00hs",
        location: "Gimnasio 2",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tipo: "federada",
  },
}

export default function ActivityPage({ params }: { params: { slug: string } }) {
  const activity = activitiesData[params.slug as keyof typeof activitiesData]

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

      {/* Header específico para la actividad */}
      <PageHeader
        title={activity.title.toUpperCase()}
        backgroundImage={activity.imageSrc || "/placeholder.svg?height=800&width=1600"}
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
          {activity.categories.map((category, index) => (
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

        {/* Horarios - Estructura modificada con columna de tira y arancel */}
        {activity.schedule && (
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
                  {activity.schedule.map((item, index) => (
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

        {/* Staff Técnico - Con tarjetas por encima de las fotos y colores alternados */}
        {activity.coaches && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">Staff Técnico</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activity.coaches.map((coach, index) => (
                <div key={index} className="flex flex-col">
                  {/* Tarjeta con información por encima de la foto */}
                  <div
                    className={`transform -rotate-2 ${
                      index % 2 === 0 ? "bg-club-blue text-white" : "bg-club-yellow text-club-blue"
                    } p-4 shadow-lg z-10 mb-[-30px] relative`}
                  >
                    <h3 className="text-xl font-bold mb-1 font-raleway">
                      {coach.firstName} {coach.lastName}
                    </h3>

                    {coach.roles.map((role, roleIndex) => (
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

                  {/* Imagen del entrenador */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={coach.image || "/placeholder.svg?height=400&width=300"}
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
              {activity.events.map((event, index) => (
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
              {activity.gallery.map((image, index) => (
                <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
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
