"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { ActivityCard } from "@/components/activity-card"
import { ActivityFilter } from "@/components/activity-filter"
import { Input } from "@/components/ui/input"
import { HeaderBocaStyle } from "@/components/header-boca-style"
import { PageHeader } from "@/components/page-header"
import { useSearchParams } from "next/navigation"

// Datos de actividades
const activitiesData = [
  {
    id: "basquet",
    title: "Básquet",
    description:
      "Formación y competición en básquet para todas las edades. Contamos con tres tiras masculinas (Amarilla, Azul, Flex) y una tira femenina, además de nuestra escuelita para los más pequeños.",
    imageSrc: "/images/activities/basquet.png",
    categories: ["Deportes de equipo", "Competitivo", "Infantil", "Juvenil", "Adultos"],
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
    tipo: "federada",
  },
  {
    id: "voley",
    title: "Vóley",
    description:
      "Aprende y compite en vóley con nuestros equipos de diferentes categorías. Desarrollo técnico, táctico y físico para jugadores de todos los niveles.",
    imageSrc: "/images/activities/voley.png",
    categories: ["Deportes de equipo", "Competitivo", "Juvenil", "Adultos"],
    events: [
      {
        title: "Liga Metropolitana - Pedro Echagüe vs. River Plate",
        date: "Domingo 31 de marzo, 16:00hs",
        location: "Gimnasio 1",
      },
    ],
    tipo: "federada",
  },
  {
    id: "baby-futbol",
    title: "Baby Fútbol",
    description:
      "Iniciación deportiva en fútbol para niños y niñas. Desarrollo de habilidades motrices, trabajo en equipo y valores deportivos en un ambiente divertido y seguro.",
    imageSrc: "/images/activities/baby-futbol.png",
    categories: ["Deportes de equipo", "Infantil"],
    events: [],
    tipo: "federada",
  },
  {
    id: "patin",
    title: "Patín Artístico",
    description:
      "Disciplina que combina elementos técnicos y artísticos sobre patines. Formación desde nivel inicial hasta competitivo con profesores especializados.",
    imageSrc: "/images/activities/patin.png",
    categories: ["Deportes individuales", "Competitivo", "Infantil", "Juvenil"],
    events: [
      {
        title: "Exhibición anual de patín",
        date: "Sábado 13 de abril, 17:00hs",
        location: "Gimnasio 3",
      },
      {
        title: "Torneo Metropolitano - Clasificatorio",
        date: "20 y 21 de abril",
        location: "Gimnasio 3",
      },
    ],
    tipo: "federada",
  },
  {
    id: "taekwondo",
    title: "Taekwondo",
    description:
      "Arte marcial coreano que desarrolla habilidades físicas y mentales. Clases para todas las edades y niveles, con participación en torneos y exámenes de cinturón.",
    imageSrc: "/images/activities/taekwondo.png",
    categories: ["Deportes individuales", "Competitivo", "Infantil", "Juvenil", "Adultos"],
    events: [
      {
        title: "Examen de cinturón",
        date: "Sábado 6 de abril, 10:00hs",
        location: "Gimnasio 2",
      },
    ],
    tipo: "federada",
  },
  {
    id: "iniciacion",
    title: "Iniciación Deportiva",
    description:
      "Programa multideportivo para niños de 3 a 6 años. Desarrollo de habilidades motrices básicas a través de juegos y actividades lúdicas.",
    imageSrc: "/images/activities/iniciacion.png",
    categories: ["Infantil", "Recreativo"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "gimnasia",
    title: "Gimnasia Artística",
    description:
      "Disciplina que desarrolla fuerza, flexibilidad, coordinación y equilibrio. Clases para diferentes niveles y edades con equipamiento especializado.",
    imageSrc: "/images/activities/gimnasia.png",
    categories: ["Deportes individuales", "Competitivo", "Infantil", "Juvenil"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "danza",
    title: "Danza",
    description:
      "Expresión artística a través del movimiento. Ofrecemos clases de diferentes estilos: clásica, contemporánea, jazz y urbana para todas las edades.",
    imageSrc: "/images/activities/danza.png",
    categories: ["Actividades culturales", "Infantil", "Juvenil", "Adultos"],
    events: [
      {
        title: "Muestra de fin de curso",
        date: "Sábado 27 de abril, 19:00hs",
        location: "Salón de Fiestas",
      },
    ],
    tipo: "cultural",
  },
  {
    id: "zumba",
    title: "Zumba",
    description:
      "Actividad física divertida que combina movimientos de baile con rutinas aeróbicas. Ideal para mantenerse en forma mientras se disfruta de la música.",
    imageSrc: "/images/activities/zumba.png",
    categories: ["Actividades físicas", "Adultos", "Recreativo"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "comedia",
    title: "Comedia Musical",
    description:
      "Disciplina artística que combina actuación, canto y baile. Desarrollo de habilidades expresivas y montaje de espectáculos.",
    imageSrc: "/images/activities/comedia.png",
    categories: ["Actividades culturales", "Infantil", "Juvenil", "Adultos"],
    events: [
      {
        title: "Audiciones para nuevo espectáculo",
        date: "Viernes 5 de abril, 18:00hs",
        location: "Salón de Fiestas",
      },
    ],
    tipo: "cultural",
  },
  {
    id: "fitness",
    title: "Gimnasio Fitness",
    description:
      "Espacio equipado con máquinas de musculación y cardio. Entrenamiento personalizado y seguimiento por profesionales.",
    imageSrc: "/images/activities/fitness.png",
    categories: ["Actividades físicas", "Adultos", "Recreativo"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "crossfit",
    title: "Crossfit",
    description:
      "Entrenamiento funcional de alta intensidad que combina ejercicios de diferentes disciplinas. Mejora la condición física general en sesiones grupales.",
    imageSrc: "/images/activities/crossfit.png",
    categories: ["Actividades físicas", "Adultos", "Competitivo"],
    events: [
      {
        title: "Competencia interna de Crossfit",
        date: "Domingo 14 de abril, 9:00hs",
        location: "Gimnasio de Fitness",
      },
    ],
    tipo: "recreativa",
  },
  {
    id: "gap",
    title: "GAP",
    description:
      "Entrenamiento específico para glúteos, abdomen y piernas. Tonificación y fortalecimiento de estas zonas a través de ejercicios localizados.",
    imageSrc: "/images/activities/gap.png",
    categories: ["Actividades físicas", "Adultos", "Recreativo"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "yoga",
    title: "Yoga",
    description:
      "Práctica que conecta cuerpo, mente y espíritu a través de posturas, respiración y meditación. Clases para todos los niveles.",
    imageSrc: "/images/activities/yoga.png",
    categories: ["Actividades físicas", "Adultos", "Recreativo", "Adultos mayores"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "shuilu",
    title: "ShuiLu",
    description:
      "Disciplina oriental que combina movimientos suaves y fluidos para mejorar la circulación energética. Ideal para todas las edades.",
    imageSrc: "/images/activities/shuilu.png",
    categories: ["Actividades físicas", "Adultos", "Adultos mayores", "Recreativo"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "taichi",
    title: "Tai Chi",
    description:
      "Arte marcial chino practicado como sistema de ejercicios para la salud. Movimientos lentos y fluidos que mejoran el equilibrio y reducen el estrés.",
    imageSrc: "/images/activities/taichi.png",
    categories: ["Actividades físicas", "Adultos", "Adultos mayores", "Recreativo"],
    events: [],
    tipo: "recreativa",
  },
  {
    id: "jubilados",
    title: "Centro de Jubilados",
    description:
      "Espacio de encuentro y actividades para adultos mayores. Talleres, eventos sociales y actividades recreativas adaptadas.",
    imageSrc: "/images/activities/jubilados.png",
    categories: ["Adultos mayores", "Recreativo", "Actividades culturales"],
    events: [
      {
        title: "Encuentro mensual de socios",
        date: "Martes 2 de abril, 16:00hs",
        location: "Salón de Fiestas",
      },
      {
        title: "Taller de memoria activa",
        date: "Jueves 4 de abril, 17:00hs",
        location: "Subsuelo - Sala de reuniones",
      },
    ],
    tipo: "cultural",
  },
  {
    id: "danza-clasica",
    title: "Danza Clásica",
    description:
      "Formación en ballet clásico con técnica tradicional. Desarrollo de postura, flexibilidad y expresión artística.",
    imageSrc: "/images/activities/danza.png",
    categories: ["Actividades culturales", "Infantil", "Juvenil"],
    events: [],
    tipo: "cultural",
  },
  {
    id: "folklore",
    title: "Folklore",
    description:
      "Danzas tradicionales argentinas para todas las edades. Aprendizaje de coreografías y participación en eventos culturales.",
    imageSrc: "/placeholder.svg?height=400&width=600",
    categories: ["Actividades culturales", "Infantil", "Juvenil", "Adultos"],
    events: [],
    tipo: "cultural",
  },
]

// Extraer todas las categorías únicas
const allCategories = Array.from(new Set(activitiesData.flatMap((activity) => activity.categories))).sort()

export default function ActividadesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredActivities, setFilteredActivities] = useState(activitiesData)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Obtener el parámetro de categoría de la URL
    const categoriaParam = searchParams.get("categoria")

    // Filtrar actividades según los parámetros de la URL y la búsqueda
    const filtered = activitiesData.filter((activity) => {
      // Filtrar por búsqueda
      const matchesSearch =
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtrar por categorías seleccionadas
      const matchesSelectedCategories =
        selectedCategories.length === 0 || activity.categories.some((category) => selectedCategories.includes(category))

      // Filtrar por tipo de actividad (recreativas o culturales)
      const matchesTipo =
        !categoriaParam ||
        (categoriaParam === "recreativas" && activity.tipo === "recreativa") ||
        (categoriaParam === "culturales" && activity.tipo === "cultural")

      return matchesSearch && matchesSelectedCategories && matchesTipo
    })

    setFilteredActivities(filtered)
  }, [searchQuery, selectedCategories, searchParams.get("categoria")])

  return (
    <div className="min-h-screen bg-background">
      <HeaderBocaStyle />

      {/* Nuevo header con componente reutilizable */}
      <PageHeader
        title="ACTIVIDADES"
        backgroundImage="/placeholder.svg?height=800&width=1600"
        hashtag="DEPORTEYCULTURA"
        backLink="/"
      />

      <main className="container py-12 px-4 md:px-6">
        {/* Buscador y filtros */}
        <div className="mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Buscar actividades..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ActivityFilter categories={allCategories} onFilterChange={setSelectedCategories} />
        </div>

        {/* Resultados */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                imageSrc={activity.imageSrc}
                categories={activity.categories}
                events={activity.events}
                link={`/actividades/${activity.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-club-blue mb-2">No se encontraron actividades</h3>
            <p className="text-club-dark/80">Intenta con otra búsqueda o elimina los filtros aplicados.</p>
          </div>
        )}
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
