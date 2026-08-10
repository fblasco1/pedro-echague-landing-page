"use client"

import { cn } from "@/lib/utils"

type Actividad = { value: string; label: string }

type Props = {
  actividades: Actividad[]
  selected: string[]
  sinActividad: boolean
  onToggle: (value: string) => void
  onSinActividad: (value: boolean) => void
  error?: string
}

export function ActividadesPicker({
  actividades,
  selected,
  sinActividad,
  onToggle,
  onSinActividad,
  error,
}: Props) {
  return (
    <div className="space-y-3">
      <p className="font-raleway text-sm font-semibold text-club-blue uppercase tracking-wide">
        Actividades
      </p>
      <p className="font-roboto text-sm text-gray-600">
        Elegí qué te gustaría practicar. Secretaría completará tira/equipo después.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {actividades.map((act) => {
          const active = !sinActividad && selected.includes(act.value)
          return (
            <button
              key={act.value}
              type="button"
              disabled={sinActividad}
              onClick={() => onToggle(act.value)}
              className={cn(
                "rounded-md border px-3 py-3 text-left font-raleway text-xs font-bold uppercase tracking-wide transition",
                active
                  ? "border-club-blue bg-club-blue text-white"
                  : "border-gray-200 bg-white text-club-blue hover:border-club-blue/50",
                sinActividad && "opacity-40 cursor-not-allowed"
              )}
            >
              {act.label}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => onSinActividad(!sinActividad)}
          className={cn(
            "rounded-md border px-3 py-3 text-left font-raleway text-xs font-bold uppercase tracking-wide transition col-span-2 sm:col-span-1",
            sinActividad
              ? "border-club-yellow bg-club-yellow text-club-blue"
              : "border-gray-200 bg-white text-gray-600 hover:border-club-yellow"
          )}
        >
          Socio sin actividad
        </button>
      </div>
      {error && <p className="text-xs text-red-600 font-roboto">{error}</p>}
    </div>
  )
}
