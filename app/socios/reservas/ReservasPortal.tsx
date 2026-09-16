"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { PortalCard } from "@/components/portal/PortalShell"
import type {
  DisponibilidadReservas,
  EspacioResumen,
  ReservaPropia,
  ReservaSlot,
  SolicitarReservaResultado,
} from "@/lib/frappe/reservas"

const TIPOS_ESPACIO = [
  { value: "", label: "Todos" },
  { value: "Cancha", label: "Canchas" },
  { value: "Gimnasio", label: "Gimnasio" },
  { value: "Salon", label: "Salón" },
  { value: "Otro", label: "Otros" },
] as const

function loginRedirect() {
  return `/socios/login?from=${encodeURIComponent("/socios/reservas")}`
}

function todayISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function formatHora(value: string): string {
  const parts = value.split(":")
  if (parts.length >= 2) return `${parts[0].padStart(2, "0")}:${parts[1]}`
  return value
}

function formatMoney(value?: number | null): string | null {
  if (value == null || Number.isNaN(value)) return null
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}

function espacioImgSrc(espacio: EspacioResumen): string {
  const raw = (espacio.imagen || "").trim()
  if (!raw) return "/images/salon.png"
  if (raw.startsWith("http") || raw.startsWith("/images") || raw.startsWith("/placeholder")) {
    return raw
  }
  // Attach Frappe: no hay proxy público aún → placeholder visual
  if (raw.startsWith("/files") || raw.startsWith("/private")) {
    return "/images/salon.png"
  }
  return raw.startsWith("/") ? raw : `/${raw}`
}

type Seleccion = {
  espacios: string[]
  titulos: Record<string, string>
  montos: Record<string, number | null | undefined>
  hora_inicio: string
  hora_fin: string
}

export function ReservasPortal() {
  const router = useRouter()
  const [fecha, setFecha] = useState(todayISO)
  const [tipoEspacio, setTipoEspacio] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [okMsg, setOkMsg] = useState("")
  const [data, setData] = useState<DisponibilidadReservas | null>(null)
  const [seleccion, setSeleccion] = useState<Seleccion | null>(null)
  const [mias, setMias] = useState<ReservaPropia[]>([])
  const [adjuntando, setAdjuntando] = useState<string | null>(null)

  const loadMias = useCallback(async () => {
    try {
      const res = await fetch("/api/socios/reservas?mias=1")
      if (res.status === 401) {
        router.replace(loginRedirect())
        return
      }
      const body = (await res.json()) as { reservas?: ReservaPropia[]; error?: string }
      if (res.ok) setMias(body.reservas || [])
    } catch {
      /* secundario */
    }
  }, [router])

  const load = useCallback(async () => {
    setError("")
    setOkMsg("")
    setLoading(true)
    setSeleccion(null)
    try {
      const qs = new URLSearchParams({ fecha })
      if (tipoEspacio) qs.set("tipo_espacio", tipoEspacio)
      const res = await fetch(`/api/socios/reservas?${qs.toString()}`)
      if (res.status === 401) {
        router.replace(loginRedirect())
        return
      }
      const body = (await res.json()) as DisponibilidadReservas & { error?: string }
      if (!res.ok) {
        setError(body.error || "No se pudo consultar la disponibilidad.")
        setData(null)
        return
      }
      setData(body)
    } catch {
      setError("No se pudo consultar la disponibilidad.")
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [fecha, tipoEspacio, router])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    void loadMias()
  }, [loadMias])

  const espacios = useMemo(() => data?.espacios ?? [], [data])
  const byName = useMemo(() => {
    const m = new Map<string, EspacioResumen>()
    for (const e of espacios) m.set(e.name, e)
    return m
  }, [espacios])

  const totalSeleccionado = useMemo(() => {
    if (!seleccion) return 0
    return seleccion.espacios.reduce((acc, id) => acc + Number(seleccion.montos[id] || 0), 0)
  }, [seleccion])

  function toggleSlot(espacio: EspacioResumen, slot: ReservaSlot) {
    if (slot.estado !== "libre") return
    setOkMsg("")
    setError("")

    if (
      seleccion &&
      seleccion.hora_inicio === slot.hora_inicio &&
      seleccion.hora_fin === slot.hora_fin
    ) {
      const has = seleccion.espacios.includes(espacio.name)
      if (has) {
        const next = seleccion.espacios.filter((id) => id !== espacio.name)
        if (next.length === 0) {
          setSeleccion(null)
          return
        }
        setSeleccion({ ...seleccion, espacios: next })
        return
      }
      setSeleccion({
        ...seleccion,
        espacios: [...seleccion.espacios, espacio.name],
        titulos: { ...seleccion.titulos, [espacio.name]: espacio.titulo },
        montos: { ...seleccion.montos, [espacio.name]: espacio.monto_arancel },
      })
      return
    }

    setSeleccion({
      espacios: [espacio.name],
      titulos: { [espacio.name]: espacio.titulo },
      montos: { [espacio.name]: espacio.monto_arancel },
      hora_inicio: slot.hora_inicio,
      hora_fin: slot.hora_fin,
    })
  }

  function addComboPartner(partnerId: string) {
    if (!seleccion) return
    const partner = byName.get(partnerId)
    if (!partner) return
    const slotLibre = (partner.slots || []).some(
      (s) =>
        s.hora_inicio === seleccion.hora_inicio &&
        s.hora_fin === seleccion.hora_fin &&
        s.estado === "libre"
    )
    if (!slotLibre) {
      setError(`${partner.titulo} no está libre en ese horario.`)
      return
    }
    if (seleccion.espacios.includes(partnerId)) return
    setSeleccion({
      ...seleccion,
      espacios: [...seleccion.espacios, partnerId],
      titulos: { ...seleccion.titulos, [partnerId]: partner.titulo },
      montos: { ...seleccion.montos, [partnerId]: partner.monto_arancel },
    })
  }

  async function solicitar() {
    if (!seleccion || seleccion.espacios.length === 0) return
    setSaving(true)
    setError("")
    setOkMsg("")
    try {
      const [principal, ...extras] = seleccion.espacios
      const res = await fetch("/api/socios/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          espacio: principal,
          espacios_extra: extras,
          fecha,
          hora_inicio: seleccion.hora_inicio,
          hora_fin: seleccion.hora_fin,
        }),
      })
      const body = (await res.json()) as SolicitarReservaResultado & { error?: string }
      if (res.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (!res.ok) {
        setError(body.error || "No se pudo solicitar la reserva.")
        return
      }
      const nombres = seleccion.espacios.map((id) => seleccion.titulos[id] || id).join(" + ")
      const monto = formatMoney(body.monto_arancel ?? totalSeleccionado)
      setOkMsg(
        [
          `Solicitud enviada: ${nombres}`,
          `(${formatHora(seleccion.hora_inicio)}–${formatHora(seleccion.hora_fin)})`,
          body.estado ? `· ${body.estado}` : null,
          monto ? `· ${monto}` : null,
        ]
          .filter(Boolean)
          .join(" ")
      )
      setSeleccion(null)
      await load()
      await loadMias()
    } catch {
      setError("No se pudo solicitar la reserva.")
    } finally {
      setSaving(false)
    }
  }

  async function adjuntarPdf(reservaName: string, file: File | null) {
    if (!file) return
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setError("El comprobante debe ser un PDF.")
      return
    }
    setAdjuntando(reservaName)
    setError("")
    try {
      const uploadBody = new FormData()
      uploadBody.append("file", file)
      const up = await fetch("/api/socios/upload", { method: "POST", body: uploadBody })
      const upJson = (await up.json()) as { file_url?: string; error?: string }
      if (up.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (!up.ok || !upJson.file_url) {
        setError(upJson.error || "No se pudo subir el PDF.")
        return
      }
      const res = await fetch("/api/socios/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "adjuntar_comprobante",
          reserva: reservaName,
          file_url: upJson.file_url,
        }),
      })
      const body = (await res.json()) as { error?: string }
      if (!res.ok) {
        setError(body.error || "No se pudo adjuntar el comprobante.")
        return
      }
      setOkMsg(`Comprobante adjunto a ${reservaName}`)
      await loadMias()
    } catch {
      setError("No se pudo adjuntar el comprobante.")
    } finally {
      setAdjuntando(null)
    }
  }

  const comboHints = useMemo(() => {
    if (!seleccion || seleccion.espacios.length === 0) return [] as Array<{ id: string; titulo: string }>
    const hints: Array<{ id: string; titulo: string }> = []
    const seen = new Set(seleccion.espacios)
    for (const id of seleccion.espacios) {
      const esp = byName.get(id)
      for (const c of esp?.combo_con || []) {
        if (seen.has(c.espacio)) continue
        seen.add(c.espacio)
        hints.push({ id: c.espacio, titulo: c.titulo })
      }
    }
    return hints
  }, [seleccion, byName])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-raleway text-3xl font-bold text-slate-800">Reservas</h1>
        <p className="text-slate-500 mt-1">
          Elegí fecha, espacio y horario. Podés combinar espacios (ej. Parrilla + Sala Albamonte)
          en el mismo turno.
        </p>
      </header>

      {mias.length > 0 ? (
        <PortalCard title="Mis solicitudes">
          <ul className="space-y-3 text-sm">
            {mias.slice(0, 8).map((r) => (
              <li
                key={r.name}
                className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium text-slate-800">
                    {r.espacio} · {r.fecha}{" "}
                    {r.hora_inicio && r.hora_fin
                      ? `${formatHora(r.hora_inicio)}–${formatHora(r.hora_fin)}`
                      : ""}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-slate-500">{r.estado}</span>
                </div>
                {formatMoney(r.monto_arancel) ? (
                  <p className="text-xs text-slate-500 mt-0.5">{formatMoney(r.monto_arancel)}</p>
                ) : null}
                {r.motivo_rechazo ? (
                  <p className="mt-1 text-xs text-red-600">Rechazo: {r.motivo_rechazo}</p>
                ) : null}
                {r.estado === "Pendiente" && !r.comprobante ? (
                  <label className="mt-2 inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      disabled={adjuntando === r.name}
                      onChange={(e) => void adjuntarPdf(r.name, e.target.files?.[0] ?? null)}
                    />
                    {adjuntando === r.name ? "Adjuntando…" : "Adjuntar PDF de transferencia"}
                  </label>
                ) : null}
                {r.comprobante ? (
                  <p className="mt-1 text-xs text-emerald-700">Comprobante cargado</p>
                ) : null}
              </li>
            ))}
          </ul>
        </PortalCard>
      ) : null}

      <PortalCard title="Fecha y tipo">
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex flex-col gap-1 text-sm flex-1">
            <span className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
              Fecha
            </span>
            <input
              type="date"
              value={fecha}
              min={todayISO()}
              onChange={(e) => setFecha(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-club-blue/30"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm flex-1">
            <span className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
              Tipo de espacio
            </span>
            <select
              value={tipoEspacio}
              onChange={(e) => setTipoEspacio(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-club-blue/30"
            >
              {TIPOS_ESPACIO.map((t) => (
                <option key={t.value || "all"} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </PortalCard>

      {loading ? (
        <div className="h-48 rounded-xl bg-white/70 animate-pulse" />
      ) : (
        <>
          {error && !espacios.length ? (
            <PortalCard>
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="mt-3 text-sm text-club-blue font-medium hover:underline"
              >
                Reintentar
              </button>
            </PortalCard>
          ) : null}

          {!error && espacios.length === 0 ? (
            <PortalCard>
              <p className="text-slate-600 text-sm">
                No hay espacios disponibles para esa fecha
                {tipoEspacio ? ` (${tipoEspacio})` : ""}.
              </p>
            </PortalCard>
          ) : null}

          <div className="space-y-4">
            {espacios.map((espacio) => {
              const comboLabel = (espacio.combo_con || [])
                .map((c) => c.titulo)
                .join(" · ")
              return (
                <PortalCard key={espacio.name}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="shrink-0 mx-auto sm:mx-0">
                      <div className="h-28 w-40 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={espacioImgSrc(espacio)}
                          alt={espacio.titulo}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-raleway font-bold text-slate-800 text-lg leading-tight">
                            {espacio.titulo}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
                            <span className="rounded-md bg-slate-100 px-2 py-0.5">{espacio.tipo}</span>
                            {formatMoney(espacio.monto_arancel) ? (
                              <span className="rounded-md bg-club-blue/10 text-club-blue font-semibold px-2 py-0.5">
                                {formatMoney(espacio.monto_arancel)}
                              </span>
                            ) : null}
                          </div>
                          {comboLabel ? (
                            <p className="text-xs text-slate-500 mt-2">
                              Se puede reservar junto con:{" "}
                              <span className="font-medium text-slate-700">{comboLabel}</span>
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {(espacio.slots || []).length === 0 ? (
                        <p className="text-sm text-slate-500">Sin franjas para este día.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                          {(espacio.slots || []).map((slot) => {
                            const libre = slot.estado === "libre"
                            const active =
                              !!seleccion &&
                              seleccion.espacios.includes(espacio.name) &&
                              seleccion.hora_inicio === slot.hora_inicio &&
                              seleccion.hora_fin === slot.hora_fin
                            const label = `${formatHora(slot.hora_inicio)}–${formatHora(slot.hora_fin)}`
                            return (
                              <button
                                key={`${espacio.name}-${slot.hora_inicio}`}
                                type="button"
                                disabled={!libre}
                                onClick={() => toggleSlot(espacio, slot)}
                                className={cn(
                                  "rounded-lg border px-3 py-3 text-left text-xs font-raleway font-bold uppercase tracking-wide transition",
                                  !libre &&
                                    "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed line-through",
                                  libre &&
                                    !active &&
                                    "border-slate-200 bg-white text-club-blue hover:border-club-blue/40",
                                  active && "border-club-blue bg-club-blue text-white"
                                )}
                              >
                                {label}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </PortalCard>
              )
            })}
          </div>

          {(seleccion || error || okMsg) && (
            <PortalCard title="Tu solicitud">
              {seleccion ? (
                <div className="space-y-3 mb-3">
                  <p className="text-sm text-slate-700">
                    {seleccion.espacios.map((id) => seleccion.titulos[id] || id).join(" + ")} ·{" "}
                    {formatHora(seleccion.hora_inicio)}–{formatHora(seleccion.hora_fin)}
                    {totalSeleccionado > 0 ? ` · ${formatMoney(totalSeleccionado)}` : ""}
                  </p>
                  {comboHints.length > 0 ? (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                      <p className="font-medium mb-1">Reserva conjunta sugerida</p>
                      <p className="text-xs mb-2">
                        Estos espacios suelen alquilarse juntos en el mismo horario.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {comboHints.map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            onClick={() => addComboPartner(h.id)}
                            className="rounded-lg bg-white border border-amber-300 px-3 py-1.5 text-xs font-semibold hover:bg-amber-100"
                          >
                            Sumar {h.titulo}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {error ? <p className="text-sm text-red-600 mb-2">{error}</p> : null}
              {okMsg ? <p className="text-sm text-emerald-600 font-medium mb-2">{okMsg}</p> : null}
              <button
                type="button"
                disabled={!seleccion || saving}
                onClick={() => void solicitar()}
                className="w-full sm:w-auto rounded-lg bg-club-blue text-white px-8 py-3 font-raleway font-bold hover:bg-club-blue/90 disabled:opacity-50"
              >
                {saving ? "Enviando..." : "Solicitar reserva"}
              </button>
            </PortalCard>
          )}
        </>
      )}
    </div>
  )
}
