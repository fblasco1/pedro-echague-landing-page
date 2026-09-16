"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { PortalCard } from "@/components/portal/PortalShell"

type GrupoCatalogo = { value: string; label: string }

type ActividadCatalogo = {
  value: string
  label: string
  tipo_inscripcion_portal: "plana" | "deporte" | "variante_grupo" | string
  grupos?: GrupoCatalogo[]
}

type Contexto = { estado: string; elegible: boolean }

type Inscripcion = {
  name: string
  actividad: string
  grupo_actividad?: string | null
  estado: string
}

type Seleccion = { actividad: string; grupo_actividad?: string }

function loginRedirect() {
  return `/socios/login?from=${encodeURIComponent("/socios/actividades")}`
}

export function InscripcionPortal() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [contexto, setContexto] = useState<Contexto | null>(null)
  const [catalogo, setCatalogo] = useState<ActividadCatalogo[]>([])
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([])
  const [selecciones, setSelecciones] = useState<Seleccion[]>([])
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [okMsg, setOkMsg] = useState("")

  useEffect(() => {
    let cancelled = false
    async function load() {
      const ctxRes = await fetch("/api/socios/contexto")
      if (ctxRes.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (ctxRes.status === 403) {
        setError("No tenés acceso al portal de socio.")
        setLoading(false)
        return
      }
      if (!ctxRes.ok) {
        setError("No se pudo cargar tu perfil.")
        setLoading(false)
        return
      }
      const ctx = (await ctxRes.json()) as Contexto
      if (cancelled) return
      setContexto(ctx)

      const [catRes, listRes] = await Promise.all([
        fetch("/api/socios/catalogo"),
        fetch("/api/socios/inscripciones"),
      ])
      if (catRes.status === 401 || listRes.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (catRes.ok) {
        setCatalogo((await catRes.json()) as ActividadCatalogo[])
      }
      if (listRes.ok) {
        setInscripciones((await listRes.json()) as Inscripcion[])
      }
      setLoading(false)
    }
    load().catch(() => {
      if (!cancelled) {
        setError("No se pudo cargar el portal.")
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [router])

  const selectedKeys = useMemo(
    () =>
      new Set(
        selecciones.map((s) =>
          s.grupo_actividad ? `${s.actividad}::${s.grupo_actividad}` : s.actividad
        )
      ),
    [selecciones]
  )

  function togglePlana(actividad: string) {
    setSelecciones((prev) => {
      const exists = prev.some((s) => s.actividad === actividad && !s.grupo_actividad)
      if (exists) return prev.filter((s) => !(s.actividad === actividad && !s.grupo_actividad))
      return [...prev.filter((s) => s.actividad !== actividad), { actividad }]
    })
  }

  function toggleVariante(actividad: string, grupo: string) {
    setSelecciones((prev) => {
      const keyMatch = (s: Seleccion) =>
        s.actividad === actividad && s.grupo_actividad === grupo
      if (prev.some(keyMatch)) return prev.filter((s) => !keyMatch(s))
      return [...prev.filter((s) => s.actividad !== actividad), { actividad, grupo_actividad: grupo }]
    })
  }

  async function confirmar() {
    setError("")
    setOkMsg("")
    setSaving(true)
    try {
      const res = await fetch("/api/socios/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selecciones }),
      })
      const data = (await res.json()) as {
        error?: string
        status?: string
        actividad_resumen?: string
      }
      if (res.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (!res.ok) {
        setError(data.error || "No se pudo confirmar la inscripción.")
        return
      }
      setOkMsg(data.actividad_resumen || "Inscripción confirmada.")
      const listRes = await fetch("/api/socios/inscripciones")
      if (listRes.ok) setInscripciones((await listRes.json()) as Inscripcion[])
      const ctxRes = await fetch("/api/socios/contexto")
      if (ctxRes.ok) setContexto((await ctxRes.json()) as Contexto)
    } catch {
      setError("No se pudo confirmar la inscripción.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="h-64 rounded-xl bg-white/70 animate-pulse" />
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="font-raleway text-3xl font-bold text-slate-800">Actividades</h1>
        {contexto?.estado && (
          <p className="text-slate-500 mt-1">Estado: {contexto.estado}</p>
        )}
      </header>

      {inscripciones.length > 0 && (
        <PortalCard title="Tus inscripciones">
          <ul className="text-sm text-slate-700 space-y-1.5">
            {inscripciones.map((row) => (
              <li key={row.name}>
                {row.actividad}
                {row.grupo_actividad ? ` — ${row.grupo_actividad}` : ""}
              </li>
            ))}
          </ul>
        </PortalCard>
      )}

      {contexto?.elegible ? (
        <PortalCard title="Elegí tus actividades">
          <p className="text-sm text-slate-500 mb-4">
            En deportes federados solo elegís la actividad. La tira y el equipo los carga
            Secretaría.
          </p>
          <div className="space-y-4">
            {catalogo.map((act) => {
              const esVariante = act.tipo_inscripcion_portal === "variante_grupo"
              if (esVariante) {
                return (
                  <div key={act.value} className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {act.label}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(act.grupos || []).map((grupo) => {
                        const active = selectedKeys.has(`${act.value}::${grupo.value}`)
                        return (
                          <button
                            key={grupo.value}
                            type="button"
                            onClick={() => toggleVariante(act.value, grupo.value)}
                            className={cn(
                              "rounded-lg border px-3 py-3 text-left text-xs font-raleway font-bold uppercase tracking-wide transition",
                              active
                                ? "border-club-blue bg-club-blue text-white"
                                : "border-slate-200 bg-white text-club-blue hover:border-club-blue/40"
                            )}
                          >
                            {grupo.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              const active = selectedKeys.has(act.value)
              return (
                <button
                  key={act.value}
                  type="button"
                  onClick={() => togglePlana(act.value)}
                  className={cn(
                    "w-full rounded-lg border px-3 py-3 text-left text-xs font-raleway font-bold uppercase tracking-wide transition",
                    active
                      ? "border-club-blue bg-club-blue text-white"
                      : "border-slate-200 bg-white text-club-blue hover:border-club-blue/40"
                  )}
                >
                  {act.label}
                </button>
              )
            })}
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {okMsg && <p className="mt-4 text-sm text-emerald-600 font-medium">{okMsg}</p>}
          <button
            type="button"
            disabled={saving || selecciones.length === 0}
            onClick={confirmar}
            className="mt-5 w-full sm:w-auto rounded-lg bg-club-blue text-white px-8 py-3 font-raleway font-bold hover:bg-club-blue/90 disabled:opacity-50"
          >
            {saving ? "Confirmando..." : "Confirmar inscripción"}
          </button>
        </PortalCard>
      ) : (
        <PortalCard>
          <p className="text-slate-600">
            {error ||
              "Cuando Secretaría te deje pendiente de inscripción vas a poder elegir actividades acá."}
          </p>
        </PortalCard>
      )}
    </div>
  )
}
