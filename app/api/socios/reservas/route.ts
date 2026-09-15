import { NextResponse } from "next/server"
import { FrappeApiError } from "@/lib/frappe/client"
import {
  FRAPPE_ADJUNTAR_COMPROBANTE,
  FRAPPE_GET_ESPACIOS,
  FRAPPE_LIST_RESERVAS,
  FRAPPE_SOLICITAR_RESERVA,
  normalizeDisponibilidad,
  normalizeReservaPropia,
  normalizeSolicitarResultado,
  type ReservaPropia,
  type SolicitarReservaPayload,
} from "@/lib/frappe/reservas"
import { callFrappeMethodAuthed, readSocioSession } from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{1,2}:\d{2}(:\d{2})?$/

function todayISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** GET ?fecha=… → disponibilidad; GET ?mias=1 → reservas propias. */
export async function GET(request: Request) {
  const session = await readSocioSession()
  if (!session) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: 401 })
  }

  const url = new URL(request.url)
  if (url.searchParams.get("mias") === "1") {
    try {
      const raw = await callFrappeMethodAuthed(FRAPPE_LIST_RESERVAS, {}, session)
      const list = Array.isArray(raw) ? raw : []
      const reservas = list
        .map(normalizeReservaPropia)
        .filter((r): r is ReservaPropia => r != null)
      return NextResponse.json({ reservas })
    } catch (err) {
      if (err instanceof FrappeApiError) {
        return NextResponse.json({ error: err.message }, { status: err.status })
      }
      return NextResponse.json({ error: "No se pudieron listar tus reservas." }, { status: 502 })
    }
  }

  const fecha = (url.searchParams.get("fecha") || todayISO()).trim()
  const tipoRaw = url.searchParams.get("tipo_espacio")
  const tipo_espacio = tipoRaw && tipoRaw.trim() ? tipoRaw.trim() : null

  if (!DATE_RE.test(fecha)) {
    return NextResponse.json({ error: "Fecha inválida. Usá formato YYYY-MM-DD." }, { status: 400 })
  }

  try {
    const params: Record<string, unknown> = { fecha }
    if (tipo_espacio) params.tipo_espacio = tipo_espacio

    const raw = await callFrappeMethodAuthed(FRAPPE_GET_ESPACIOS, params, session)
    return NextResponse.json(normalizeDisponibilidad(raw, fecha, tipo_espacio))
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json(
      { error: "No se pudo consultar la disponibilidad." },
      { status: 502 }
    )
  }
}

type PostBody = SolicitarReservaPayload & {
  action?: string
  reserva?: string
  file_url?: string
  espacios_extra?: string[]
}

/** POST solicitar | adjuntar comprobante (file_url PDF). */
export async function POST(request: Request) {
  const session = await readSocioSession()
  if (!session) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: 401 })
  }

  let body: PostBody
  try {
    body = (await request.json()) as PostBody
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 })
  }

  if (body.action === "adjuntar_comprobante") {
    const reserva = typeof body.reserva === "string" ? body.reserva.trim() : ""
    const file_url = typeof body.file_url === "string" ? body.file_url.trim() : ""
    if (!reserva || !file_url) {
      return NextResponse.json({ error: "Faltan reserva o file_url." }, { status: 400 })
    }
    if (!file_url.toLowerCase().includes(".pdf")) {
      return NextResponse.json({ error: "El comprobante debe ser un PDF." }, { status: 400 })
    }
    try {
      const data = await callFrappeMethodAuthed(
        FRAPPE_ADJUNTAR_COMPROBANTE,
        { reserva, file_url },
        session
      )
      return NextResponse.json(data)
    } catch (err) {
      if (err instanceof FrappeApiError) {
        return NextResponse.json({ error: err.message }, { status: err.status })
      }
      return NextResponse.json({ error: "No se pudo adjuntar el comprobante." }, { status: 502 })
    }
  }

  const espacio = typeof body.espacio === "string" ? body.espacio.trim() : ""
  const fecha = typeof body.fecha === "string" ? body.fecha.trim() : ""
  const hora_inicio = typeof body.hora_inicio === "string" ? body.hora_inicio.trim() : ""
  const hora_fin = typeof body.hora_fin === "string" ? body.hora_fin.trim() : ""
  const extrasRaw = body.espacios_extra
  const espacios_extra = Array.isArray(extrasRaw)
    ? extrasRaw.map((x) => String(x).trim()).filter(Boolean)
    : []

  if (!espacio || !fecha || !hora_inicio || !hora_fin) {
    return NextResponse.json(
      { error: "Faltan espacio, fecha, hora_inicio u hora_fin." },
      { status: 400 }
    )
  }
  if (!DATE_RE.test(fecha)) {
    return NextResponse.json({ error: "Fecha inválida. Usá formato YYYY-MM-DD." }, { status: 400 })
  }
  if (!TIME_RE.test(hora_inicio) || !TIME_RE.test(hora_fin)) {
    return NextResponse.json(
      { error: "Horario inválido. Usá formato HH:MM o HH:MM:SS." },
      { status: 400 }
    )
  }

  try {
    const params: Record<string, unknown> = { espacio, fecha, hora_inicio, hora_fin }
    if (espacios_extra.length) params.espacios_extra = espacios_extra
    const data = await callFrappeMethodAuthed(FRAPPE_SOLICITAR_RESERVA, params, session)
    return NextResponse.json(normalizeSolicitarResultado(data))
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "No se pudo solicitar la reserva." }, { status: 502 })
  }
}
