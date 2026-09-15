"use client"

/**
 * UI pública de alquiler externo (sin login).
 * Flujo: fecha/tipo → un espacio + slot → nombre/contacto → token de seguimiento.
 * Con ?token=: estado + upload PDF comprobante.
 */

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import type {
  DisponibilidadReservas,
  EspacioResumen,
  ReservaSlot,
} from "@/lib/frappe/reservas"
import type {
  ReservaExterna,
  SolicitarExternoResultado,
} from "@/lib/frappe/reservas-externo"

const TIPOS_ESPACIO = [
  { value: "", label: "Todos" },
  { value: "Cancha", label: "Canchas" },
  { value: "Gimnasio", label: "Gimnasio" },
  { value: "Salon", label: "Salón" },
  { value: "Otro", label: "Otros" },
] as const

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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || "")
      const comma = result.indexOf(",")
      resolve(comma >= 0 ? result.slice(comma + 1) : result)
    }
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"))
    reader.readAsDataURL(file)
  })
}

type Seleccion = {
  espacio: string
  titulo: string
  monto?: number | null
  hora_inicio: string
  hora_fin: string
}

export function AlquilerExterno() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenParam = (searchParams?.get("token") || "").trim()

  if (tokenParam) {
    return <VistaToken token={tokenParam} />
  }

  return <VistaSolicitud router={router} />
}

function VistaSolicitud({ router }: { router: ReturnType<typeof useRouter> }) {
  const [fecha, setFecha] = useState(todayISO)
  const [tipoEspacio, setTipoEspacio] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [canalOff, setCanalOff] = useState(false)
  const [data, setData] = useState<DisponibilidadReservas | null>(null)
  const [seleccion, setSeleccion] = useState<Seleccion | null>(null)
  const [nombre, setNombre] = useState("")
  const [contacto, setContacto] = useState("")
  const [exito, setExito] = useState<SolicitarExternoResultado | null>(null)

  const load = useCallback(async () => {
    setError("")
    setCanalOff(false)
    setLoading(true)
    setSeleccion(null)
    setExito(null)
    try {
      const qs = new URLSearchParams({ fecha })
      if (tipoEspacio) qs.set("tipo_espacio", tipoEspacio)
      const res = await fetch(`/api/alquiler?${qs.toString()}`)
      const body = (await res.json()) as DisponibilidadReservas & { error?: string }
      if (!res.ok) {
        setError(body.error || "No se pudo consultar la disponibilidad.")
        setCanalOff(res.status === 403)
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
  }, [fecha, tipoEspacio])

  useEffect(() => {
    void load()
  }, [load])

  const espacios = useMemo(() => data?.espacios ?? [], [data])

  function pickSlot(espacio: EspacioResumen, slot: ReservaSlot) {
    if (slot.estado !== "libre") return
    setError("")
    if (
      seleccion &&
      seleccion.espacio === espacio.name &&
      seleccion.hora_inicio === slot.hora_inicio
    ) {
      setSeleccion(null)
      return
    }
    setSeleccion({
      espacio: espacio.name,
      titulo: espacio.titulo,
      monto: espacio.monto_arancel,
      hora_inicio: slot.hora_inicio,
      hora_fin: slot.hora_fin,
    })
  }

  async function solicitar() {
    if (!seleccion) return
    if (!nombre.trim() || !contacto.trim()) {
      setError("Completá tu nombre y un contacto (email o teléfono).")
      return
    }
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/alquiler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "solicitar",
          espacio: seleccion.espacio,
          fecha,
          hora_inicio: seleccion.hora_inicio,
          hora_fin: seleccion.hora_fin,
          arrendatario_nombre: nombre.trim(),
          arrendatario_contacto: contacto.trim(),
        }),
      })
      const body = (await res.json()) as SolicitarExternoResultado & { error?: string }
      if (!res.ok) {
        setError(body.error || "No se pudo solicitar la reserva.")
        setCanalOff(res.status === 403)
        return
      }
      setExito(body)
      setSeleccion(null)
      if (body.token_acceso) {
        router.replace(`/alquiler?token=${encodeURIComponent(body.token_acceso)}`)
      }
    } catch {
      setError("No se pudo solicitar la reserva.")
    } finally {
      setSaving(false)
    }
  }

  if (canalOff) {
    return (
      <section className="rounded-2xl bg-white border border-slate-200/80 px-6 py-10 text-center shadow-sm">
        <h2 className="font-raleway text-xl font-bold text-club-blue mb-3">
          Canal no disponible
        </h2>
        <p className="font-roboto text-gray-600 max-w-md mx-auto">
          {error ||
            "La reserva online de espacios no está disponible en este momento. Contactá al club para reservar."}
        </p>
      </section>
    )
  }

  if (exito?.token_acceso) {
    const link = `/alquiler?token=${encodeURIComponent(exito.token_acceso)}`
    return (
      <section className="rounded-2xl bg-white border border-slate-200/80 px-6 py-8 shadow-sm space-y-4">
        <h2 className="font-raleway text-xl font-bold text-emerald-700">
          Solicitud enviada
        </h2>
        <p className="font-roboto text-gray-600 text-sm">
          Guardá este enlace para seguir el estado y adjuntar el comprobante de
          transferencia:
        </p>
        <a
          href={link}
          className="block break-all font-mono text-sm text-club-blue hover:underline"
        >
          {link}
        </a>
        <p className="text-xs text-slate-500">
          Token: <span className="font-mono">{exito.token_acceso}</span>
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex flex-col gap-1.5 text-sm flex-1">
          <span className="font-raleway text-xs font-bold uppercase tracking-widest text-slate-400">
            Fecha
          </span>
          <input
            type="date"
            value={fecha}
            min={todayISO()}
            onChange={(e) => setFecha(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-club-blue/30"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm flex-1">
          <span className="font-raleway text-xs font-bold uppercase tracking-widest text-slate-400">
            Tipo de espacio
          </span>
          <select
            value={tipoEspacio}
            onChange={(e) => setTipoEspacio(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-club-blue/30"
          >
            {TIPOS_ESPACIO.map((t) => (
              <option key={t.value || "all"} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <div className="h-40 rounded-xl bg-white/80 animate-pulse" />
      ) : (
        <>
          {error && !espacios.length ? (
            <div className="rounded-xl bg-white border border-red-100 px-4 py-4">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="mt-2 text-sm font-semibold text-club-blue hover:underline"
              >
                Reintentar
              </button>
            </div>
          ) : null}

          {!error && espacios.length === 0 ? (
            <p className="font-roboto text-gray-600 text-sm">
              No hay espacios disponibles para esa fecha
              {tipoEspacio ? ` (${tipoEspacio})` : ""}.
            </p>
          ) : null}

          <ul className="space-y-6">
            {espacios.map((espacio) => (
              <li key={espacio.name} className="border-b border-slate-200/70 pb-6 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h2 className="font-raleway text-lg font-bold text-club-blue">
                    {espacio.titulo}
                  </h2>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-slate-500">{espacio.tipo}</span>
                    {formatMoney(espacio.monto_arancel) ? (
                      <span className="font-semibold text-club-blue">
                        {formatMoney(espacio.monto_arancel)}
                      </span>
                    ) : null}
                  </div>
                </div>
                {(espacio.slots || []).length === 0 ? (
                  <p className="text-sm text-slate-500">Sin franjas para este día.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(espacio.slots || []).map((slot) => {
                      const libre = slot.estado === "libre"
                      const active =
                        !!seleccion &&
                        seleccion.espacio === espacio.name &&
                        seleccion.hora_inicio === slot.hora_inicio
                      const label = `${formatHora(slot.hora_inicio)}–${formatHora(slot.hora_fin)}`
                      return (
                        <button
                          key={`${espacio.name}-${slot.hora_inicio}`}
                          type="button"
                          disabled={!libre}
                          onClick={() => pickSlot(espacio, slot)}
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
              </li>
            ))}
          </ul>

          {seleccion ? (
            <section className="rounded-2xl bg-white border border-slate-200/80 px-5 py-6 shadow-sm space-y-4">
              <h2 className="font-raleway text-lg font-bold text-slate-800">
                Tus datos
              </h2>
              <p className="text-sm text-slate-600">
                {seleccion.titulo} · {formatHora(seleccion.hora_inicio)}–
                {formatHora(seleccion.hora_fin)}
                {seleccion.monto != null ? ` · ${formatMoney(seleccion.monto)}` : ""}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Nombre
                  </span>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    autoComplete="name"
                    className="rounded-lg border border-slate-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-club-blue/30"
                    placeholder="Nombre y apellido"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email o teléfono
                  </span>
                  <input
                    type="text"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    autoComplete="email"
                    className="rounded-lg border border-slate-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-club-blue/30"
                    placeholder="contacto@mail.com / 11…"
                  />
                </label>
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="button"
                disabled={saving}
                onClick={() => void solicitar()}
                className="w-full sm:w-auto rounded-lg bg-club-blue text-white px-8 py-3 font-raleway font-bold hover:bg-club-blue/90 disabled:opacity-50"
              >
                {saving ? "Enviando…" : "Solicitar reserva"}
              </button>
            </section>
          ) : null}
        </>
      )}
    </div>
  )
}

function VistaToken({ token }: { token: string }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [canalOff, setCanalOff] = useState(false)
  const [reserva, setReserva] = useState<ReservaExterna | null>(null)
  const [uploading, setUploading] = useState(false)
  const [okMsg, setOkMsg] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    setError("")
    setCanalOff(false)
    try {
      const res = await fetch(`/api/alquiler?token=${encodeURIComponent(token)}`)
      const body = (await res.json()) as {
        reserva?: ReservaExterna
        error?: string
      }
      if (!res.ok) {
        setError(body.error || "No se pudo consultar la reserva.")
        setCanalOff(res.status === 403)
        setReserva(null)
        return
      }
      setReserva(body.reserva || null)
    } catch {
      setError("No se pudo consultar la reserva.")
      setReserva(null)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    void load()
  }, [load])

  async function uploadPdf(file: File | null) {
    if (!file) return
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setError("El comprobante debe ser un PDF.")
      return
    }
    setUploading(true)
    setError("")
    setOkMsg("")
    try {
      const content_b64 = await fileToBase64(file)
      const res = await fetch("/api/alquiler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upload_comprobante",
          token_acceso: token,
          filename: file.name || "comprobante.pdf",
          content_b64,
        }),
      })
      const body = (await res.json()) as ReservaExterna & { error?: string }
      if (!res.ok) {
        setError(body.error || "No se pudo adjuntar el comprobante.")
        setCanalOff(res.status === 403)
        return
      }
      setOkMsg("Comprobante adjunto correctamente.")
      if (body.name || body.estado) {
        setReserva({
          name: body.name || reserva?.name || "",
          espacio: body.espacio || reserva?.espacio || "",
          fecha: body.fecha ?? reserva?.fecha ?? null,
          hora_inicio: body.hora_inicio ?? reserva?.hora_inicio ?? null,
          hora_fin: body.hora_fin ?? reserva?.hora_fin ?? null,
          estado: body.estado || reserva?.estado || "",
          monto_arancel: body.monto_arancel ?? reserva?.monto_arancel,
          comprobante: body.comprobante ?? "ok",
          fecha_comprobante: body.fecha_comprobante ?? null,
          motivo_rechazo: body.motivo_rechazo ?? null,
          arrendatario_nombre: body.arrendatario_nombre ?? reserva?.arrendatario_nombre,
        })
      } else {
        await load()
      }
    } catch {
      setError("No se pudo adjuntar el comprobante.")
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <div className="h-40 rounded-xl bg-white/80 animate-pulse" />
  }

  if (canalOff) {
    return (
      <section className="rounded-2xl bg-white border border-slate-200/80 px-6 py-10 text-center shadow-sm">
        <h2 className="font-raleway text-xl font-bold text-club-blue mb-3">
          Canal no disponible
        </h2>
        <p className="font-roboto text-gray-600 max-w-md mx-auto">
          {error ||
            "La reserva online de espacios no está disponible en este momento."}
        </p>
      </section>
    )
  }

  if (error && !reserva) {
    return (
      <section className="rounded-2xl bg-white border border-red-100 px-6 py-8 shadow-sm">
        <p className="text-sm text-red-600">{error}</p>
        <a
          href="/alquiler"
          className="mt-4 inline-block text-sm font-semibold text-club-blue hover:underline"
        >
          ← Volver a alquiler
        </a>
      </section>
    )
  }

  if (!reserva) return null

  return (
    <section className="rounded-2xl bg-white border border-slate-200/80 px-5 py-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-raleway text-xl font-bold text-club-blue">Tu reserva</h2>
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {reserva.estado}
        </span>
      </div>
      <dl className="grid gap-2 text-sm text-slate-700 font-roboto">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Espacio</dt>
          <dd className="font-medium">{reserva.espacio}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Fecha y horario</dt>
          <dd>
            {reserva.fecha}
            {reserva.hora_inicio && reserva.hora_fin
              ? ` · ${formatHora(reserva.hora_inicio)}–${formatHora(reserva.hora_fin)}`
              : ""}
          </dd>
        </div>
        {formatMoney(reserva.monto_arancel) ? (
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Monto</dt>
            <dd className="font-semibold text-club-blue">
              {formatMoney(reserva.monto_arancel)}
            </dd>
          </div>
        ) : null}
        {reserva.arrendatario_nombre ? (
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">A nombre de</dt>
            <dd>{reserva.arrendatario_nombre}</dd>
          </div>
        ) : null}
      </dl>

      {reserva.motivo_rechazo ? (
        <p className="text-sm text-red-600">Rechazo: {reserva.motivo_rechazo}</p>
      ) : null}

      {reserva.comprobante ? (
        <p className="text-sm text-emerald-700 font-medium">Comprobante cargado</p>
      ) : null}

      {reserva.estado === "Pendiente" && !reserva.comprobante ? (
        <div className="pt-2 border-t border-slate-100">
          <p className="text-sm text-slate-600 mb-3">
            Adjuntá el PDF de la transferencia para que Coordinación pueda confirmar.
          </p>
          <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-raleway font-bold text-club-blue hover:bg-slate-50">
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={uploading}
              onChange={(e) => void uploadPdf(e.target.files?.[0] ?? null)}
            />
            {uploading ? "Subiendo…" : "Subir comprobante PDF"}
          </label>
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {okMsg ? <p className="text-sm text-emerald-600 font-medium">{okMsg}</p> : null}

      <p className="text-xs text-slate-400 pt-2">
        Guardá este enlace:{" "}
        <span className="font-mono break-all">/alquiler?token=…</span>
      </p>
      <a href="/alquiler" className="text-sm font-semibold text-club-blue hover:underline">
        ← Nueva solicitud
      </a>
    </section>
  )
}
