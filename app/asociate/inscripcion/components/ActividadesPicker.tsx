"use client"

import { cn } from "@/lib/utils"

type Actividad = { value: string; label: string }

type Props = {
  actividades: Actividad[]
  selected: string[]
  sinActividad: boolean
  /** Si se setea, solo estas activities (value/label) son clickeables; el resto se oculta. */
  soloPermitidas?: string[] | null
  mensajeRestriccion?: string
  onToggle: (value: string) => void
  onSinActividad: (value: boolean) => void
  error?: string
}

function matchPermitida(act: Actividad, permitidas: string[]): boolean {
  const set = new Set(permitidas.map((p) => p.trim().toLowerCase()))
  return set.has(act.value.trim().toLowerCase()) || set.has(act.label.trim().toLowerCase())
}

export function ActividadesPicker({
  actividades,
  selected,
  sinActividad,
  soloPermitidas = null,
  mensajeRestriccion,
  onToggle,
  onSinActividad,
  error,
}: Props) {
  const lista =
    soloPermitidas && soloPermitidas.length > 0
      ? actividades.filter((a) => matchPermitida(a, soloPermitidas))
      : actividades

  return (
    <div className="space-y-3">
      <p className="font-raleway text-sm font-semibold text-club-blue uppercase tracking-wide">
        Actividades
      </p>
      {soloPermitidas && soloPermitidas.length > 0 && (
        <p className="text-sm font-roboto text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          {mensajeRestriccion ||
            "Categoría Adherente: solo Gimnasio Fitness, Funcional, Yoga y Crossfit."}
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {lista.map((act) => {
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
