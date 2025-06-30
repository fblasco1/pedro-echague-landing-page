'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Actividad } from '@/app/types/Actividad'

import Link from "next/link"
import { Search } from "lucide-react"
import { ActivityCard } from "@/components/activity-card"
import { ActivityFilter } from "@/components/activity-filter"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"

interface Props {
  actividades: Actividad[]
}

export default function ActividadesClient({ actividades }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredActivities, setFilteredActivities] = useState(actividades)
  const searchParams = useSearchParams()

  // Extraer todas las categorías únicas (puede quedarse aquí o memoizar si quieres)
  const allCategories = Array.from(
    new Set(actividades.flatMap((activity) => activity.categories))
  ).sort()

  useEffect(() => {
    const categoriaParam = searchParams.get('categoria')

    const filtered = actividades.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSelectedCategories =
        selectedCategories.length === 0 ||
        activity.categories.some((category) => selectedCategories.includes(category))

      const matchesTipo =
        !categoriaParam ||
        (categoriaParam === 'recreativas' && activity.tipo === 'recreativa') ||
        (categoriaParam === 'culturales' && activity.tipo === 'cultural')

      return matchesSearch && matchesSelectedCategories && matchesTipo
    })

    setFilteredActivities(filtered)
  }, [searchQuery, selectedCategories, searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
                key={activity._id}
                title={activity.title}
                description={activity.description}
                imageSrc={activity.fotoPortada?.asset?.url || activity.imageSrc?.asset?.url || ''}
                logoSrc={activity.logo?.asset?.url}
                categories={activity.categories}
                events={activity.events}
                link={`/actividades/${activity._id}`}
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
