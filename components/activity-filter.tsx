"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ActivityFilterProps {
  categories: string[]
  onFilterChange: (selectedCategories: string[]) => void
}

export function ActivityFilter({ categories, onFilterChange }: ActivityFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(newSelected)
    onFilterChange(newSelected)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    onFilterChange([])
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-club-blue">Filtrar por categoría</h3>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-sm text-club-blue hover:text-club-blue/80"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedCategories.includes(category)
                ? "bg-club-blue text-white"
                : "bg-transparent text-club-blue hover:bg-club-blue/10"
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  )
}
