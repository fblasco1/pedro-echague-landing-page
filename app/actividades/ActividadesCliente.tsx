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
import { getActivityImageUrl, getActivityLogoUrl } from "@/lib/utils-activities"

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
      <Header actividades={actividades} />

      <PageHeader
        title="ACTIVIDADES"
        backgroundImage=""
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
                imageSrc={getActivityImageUrl(activity)}
                logoSrc={getActivityLogoUrl(activity)}
                categories={activity.categories}
                events={activity.events}
                link={`/actividades/${activity.slug.current}`}
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
