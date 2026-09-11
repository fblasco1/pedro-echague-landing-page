"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PortalCard, StatusBadge } from "@/components/portal/PortalShell"

type PerfilResumen = {
  nombre?: string | null
  apellido?: string | null
  numero_socio?: number | null
  categoria?: string | null
  dni?: string | null
  estado?: string | null
  tiene_foto?: boolean
}

type Contexto = { estado: string; elegible: boolean }

function loginRedirect() {
  return `/socios/login?from=${encodeURIComponent("/socios")}`
}

function badgeTone(estado?: string | null): "green" | "amber" | "slate" {
  if (estado === "Activo" || estado === "Vitalicio") return "green"
  if (estado?.includes("Pendiente")) return "amber"
  return "slate"
}

const ACCESOS = [
  {
    href: "/socios/perfil",
    title: "Mis datos",
    desc: "Gestioná tus datos personales y foto de perfil.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="24" cy="16" r="8" />
        <path d="M8 40c2.5-8 10-12 16-12s13.5 4 16 12" />
      </svg>
    ),
  },
  {
    href: "/socios/actividades",
    title: "Actividades",
    desc: "Inscribite y consultá tus actividades del club.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="8" y="12" width="32" height="24" rx="3" />
        <path d="M8 20h32M16 12v8M32 12v8" />
      </svg>
    ),
  },
  {
    href: "#",
    title: "Deudas",
    desc: "Tus saldos pendientes con el club.",
    soon: true,
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="10" y="14" width="28" height="20" rx="3" />
        <path d="M10 22h28M18 30h6" />
      </svg>
    ),
  },
  {
    href: "#",
    title: "Reservas",
    desc: "Reservá espacios del club cuando esté disponible.",
    soon: true,
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="10" y="10" width="28" height="28" rx="3" />
        <path d="M10 18h28M18 10v8M30 10v8M18 26h12M18 32h8" />
      </svg>
    ),
  },
] as const

export function PortalInicio() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [perfil, setPerfil] = useState<PerfilResumen | null>(null)
  const [contexto, setContexto] = useState<Contexto | null>(null)
  const [fotoBroken, setFotoBroken] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [perfilRes, ctxRes] = await Promise.all([
        fetch("/api/socios/perfil"),
        fetch("/api/socios/contexto"),
      ])
      if (perfilRes.status === 401 || ctxRes.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (!perfilRes.ok) {
        setError("No se pudo cargar el portal.")
        setLoading(false)
        return
      }
      const p = (await perfilRes.json()) as PerfilResumen
      const c = ctxRes.ok ? ((await ctxRes.json()) as Contexto) : null
      if (cancelled) return
      setPerfil(p)
      setContexto(c)
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

  if (loading) {
    return <div className="h-64 rounded-xl bg-white/70 animate-pulse" />
  }

  if (error || !perfil) {
    return (
      <div className="space-y-3">
        <p className="text-red-600">{error || "Error"}</p>
        <Link href="/socios/login" className="text-club-blue font-medium hover:underline">
          Ir al login
        </Link>
      </div>
    )
  }

  const nombre = (perfil.nombre || "").toUpperCase()
  const apellido = (perfil.apellido || "").toUpperCase()
  const nombreCompleto = [perfil.nombre, perfil.apellido].filter(Boolean).join(" ")
  const estado = contexto?.estado || perfil.estado || "—"
  const nro = perfil.numero_socio != null ? String(perfil.numero_socio).padStart(5, "0") : "—"

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-raleway text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
          ¡Hola, {nombre || "SOCIO"}!
        </h1>
        <p className="mt-1 text-slate-500">
          Socio #{nro}
          {perfil.categoria ? ` — Categoría ${perfil.categoria}` : ""}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PortalCard title="Estado">
          <p className="text-2xl font-semibold text-slate-800">{estado}</p>
          <Link href="/socios/perfil" className="mt-3 inline-block text-sm text-club-blue hover:underline">
            Ver mis datos →
          </Link>
        </PortalCard>
        <PortalCard title="Saldo">
          <p className="text-2xl font-semibold text-slate-400">Próximamente</p>
          <p className="mt-3 text-sm text-slate-400">Deudas y pagos online</p>
        </PortalCard>
        <PortalCard title="Actividades">
          <p className="text-2xl font-semibold text-slate-800">
            {contexto?.elegible ? "Inscribite" : "Consultá"}
          </p>
          <Link href="/socios/actividades" className="mt-3 inline-block text-sm text-club-blue hover:underline">
            Ir a actividades →
          </Link>
        </PortalCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PortalCard title="Carnet digital" className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 mx-auto sm:mx-0">
              <div className="h-36 w-36 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                {perfil.tiene_foto && !fotoBroken ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/api/socios/foto"
                    alt={`Foto de ${nombreCompleto}`}
                    className="h-full w-full object-cover"
                    onError={() => setFotoBroken(true)}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-slate-400 p-2 text-center">
                    Sin foto 4×4
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 flex-1 text-sm">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Socio N°</p>
                <p className="font-semibold text-slate-800">{nro}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Documento</p>
                <p className="font-semibold text-slate-800">DNI {perfil.dni || "—"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-slate-400 text-xs uppercase tracking-wide">Nombre</p>
                <p className="font-semibold text-slate-800">
                  {[nombre, apellido].filter(Boolean).join(" ") || "—"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide">Categoría</p>
                <p className="font-semibold text-slate-800">{perfil.categoria || "—"}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1.5">Estado societario</p>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={badgeTone(estado)}>{estado}</StatusBadge>
                </div>
              </div>
            </div>
          </div>
        </PortalCard>

        <PortalCard title="Ayuda">
          <div className="flex flex-col gap-3 h-full">
            <a
              href="https://wa.me/5491136391151"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white font-semibold py-3 px-4 hover:bg-[#1ebe57] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.853L.057 23.45a.5.5 0 0 0 .612.61l5.72-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.08-1.39l-.364-.216-3.39.89.906-3.308-.237-.38A9.95 9.95 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp del club
            </a>
            <Link
              href="/asociate"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 text-slate-700 font-medium py-3 px-4 hover:bg-slate-50 transition-colors"
            >
              Cómo asociarse
            </Link>
            <p className="mt-auto text-xs text-slate-400 pt-2">
              Atención: Lun a Vie 9:00 a 18:00 horas
            </p>
          </div>
        </PortalCard>
      </div>

      <section>
        <h2 className="font-raleway text-lg font-bold text-slate-800 mb-4">Accesos</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ACCESOS.map((item) => {
            const inner = (
              <div className="bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-5 h-full flex flex-col items-center text-center gap-2 hover:border-club-blue/30 transition-colors">
                {item.icon}
                <p className="font-raleway font-bold text-slate-800 text-sm">{item.title}</p>
                <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                {"soon" in item && item.soon ? (
                  <span className="text-[10px] uppercase tracking-wide text-amber-600 font-semibold mt-1">
                    Próximamente
                  </span>
                ) : null}
              </div>
            )
            if ("soon" in item && item.soon) {
              return (
                <div key={item.title} className="opacity-70 cursor-default">
                  {inner}
                </div>
              )
            }
            return (
              <Link key={item.title} href={item.href} className="block">
                {inner}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
