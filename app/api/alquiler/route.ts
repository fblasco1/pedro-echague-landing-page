/**
 * BFF público de alquiler externo (sin login socio).
 * Spec: club_management/specs/reservas_espacio_externo.md
 *
 * GET  ?fecha=[&tipo_espacio=]  → sesión + disponibilidad
 * GET  ?token=                  → detalle por token_acceso
 * POST action: abrir | solicitar | upload_comprobante
 */

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { callFrappeMethod, FrappeApiError } from "@/lib/frappe/client"
import { normalizeDisponibilidad } from "@/lib/frappe/reservas"
import {
  ALQUILER_SESION_COOKIE,
  ALQUILER_SESION_HEADER,
  ALQUILER_SESION_MAX_AGE,
  FRAPPE_ABRIR_SESION_EXTERNA,
  FRAPPE_GET_ESPACIOS_EXTERNO,
  FRAPPE_GET_RESERVA_EXTERNA,
  FRAPPE_SOLICITAR_EXTERNA,
  FRAPPE_UPLOAD_ADJUNTAR_COMPROBANTE_EXTERNO,
  mensajeCanalDeshabilitado,
  normalizeReservaExterna,
  normalizeSolicitarExterno,
  type SolicitarExternoPayload,
} from "@/lib/frappe/reservas-externo"

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

function jsonError(err: unknown, fallback: string): NextResponse {
  if (err instanceof FrappeApiError) {
    return NextResponse.json(
      { error: mensajeCanalDeshabilitado(err.status, err.message) },
      { status: err.status }
    )
  }
  return NextResponse.json({ error: fallback }, { status: 502 })
}

function readSesionFromRequest(request: Request): string {
  const header = request.headers.get(ALQUILER_SESION_HEADER)?.trim()
  if (header) return header
  return ""
}

async function readSesionCookie(): Promise<string> {
  const jar = await cookies()
  return jar.get(ALQUILER_SESION_COOKIE)?.value?.trim() || ""
}

function setSesionCookie(res: NextResponse, token: string): void {
  res.cookies.set(ALQUILER_SESION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ALQUILER_SESION_MAX_AGE,
  })
}

async function ensureSesionToken(existing: string): Promise<string> {
  if (existing) return existing
  const data = await callFrappeMethod<{ sesion_token?: string }>(
    FRAPPE_ABRIR_SESION_EXTERNA,
    {}
  )
  const token = typeof data?.sesion_token === "string" ? data.sesion_token.trim() : ""
  if (!token) {
    throw new FrappeApiError(502, "No se pudo abrir la sesión de alquiler.")
  }
  return token
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const tokenAcceso = (url.searchParams.get("token") || "").trim()

  if (tokenAcceso) {
    try {
      const raw = await callFrappeMethod(FRAPPE_GET_RESERVA_EXTERNA, {
        token_acceso: tokenAcceso,
      })
      const reserva = normalizeReservaExterna(raw)
      if (!reserva) {
        return NextResponse.json({ error: "Reserva no encontrada." }, { status: 404 })
      }
      return NextResponse.json({ reserva, token_acceso: tokenAcceso })
    } catch (err) {
      return jsonError(err, "No se pudo consultar la reserva.")
    }
  }

  const fecha = (url.searchParams.get("fecha") || todayISO()).trim()
  const tipoRaw = url.searchParams.get("tipo_espacio")
  const tipo_espacio = tipoRaw && tipoRaw.trim() ? tipoRaw.trim() : null

  if (!DATE_RE.test(fecha)) {
    return NextResponse.json({ error: "Fecha inválida. Usá formato YYYY-MM-DD." }, { status: 400 })
  }

  try {
    const fromHeader = readSesionFromRequest(request)
    const fromCookie = fromHeader || (await readSesionCookie())
    const sesion_token = await ensureSesionToken(fromCookie)

    const params: Record<string, unknown> = { sesion_token, fecha }
    if (tipo_espacio) params.tipo_espacio = tipo_espacio

    const raw = await callFrappeMethod(FRAPPE_GET_ESPACIOS_EXTERNO, params)
    const body = normalizeDisponibilidad(raw, fecha, tipo_espacio)
    const res = NextResponse.json(body)
    if (!fromCookie || fromCookie !== sesion_token) {
      setSesionCookie(res, sesion_token)
    }
    return res
  } catch (err) {
    // Cookie/sesión vencida: reabrir una vez (no reintentar si el canal está off sin cookie)
    const hadSesion =
      Boolean(readSesionFromRequest(request)) || Boolean(await readSesionCookie())
    if (
      hadSesion &&
      err instanceof FrappeApiError &&
      (err.status === 403 || err.status === 401)
    ) {
      try {
        const sesion_token = await ensureSesionToken("")
        const params: Record<string, unknown> = { sesion_token, fecha }
        if (tipo_espacio) params.tipo_espacio = tipo_espacio
        const raw = await callFrappeMethod(FRAPPE_GET_ESPACIOS_EXTERNO, params)
        const body = normalizeDisponibilidad(raw, fecha, tipo_espacio)
        const res = NextResponse.json(body)
        setSesionCookie(res, sesion_token)
        return res
      } catch (retryErr) {
        return jsonError(retryErr, "No se pudo consultar la disponibilidad.")
      }
    }
    return jsonError(err, "No se pudo consultar la disponibilidad.")
  }
}

type PostBody = SolicitarExternoPayload & {
  action?: string
  token_acceso?: string
  filename?: string
  content_b64?: string
  file_url?: string
}

async function resolveSesionForPost(request: Request, bodyToken?: string): Promise<string> {
  const fromHeader = readSesionFromRequest(request)
  if (fromHeader) return fromHeader
  if (bodyToken?.trim()) return bodyToken.trim()
  return readSesionCookie()
}

async function handleUploadComprobante(
  request: Request,
  body: PostBody | null
): Promise<NextResponse> {
  const contentType = request.headers.get("content-type") || ""

  let token_acceso = ""
  let filename = "comprobante.pdf"
  let content_b64 = ""

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData()
    token_acceso = String(form.get("token_acceso") || "").trim()
    const file = form.get("file")
    if (file instanceof File) {
      filename = file.name || filename
      const buf = Buffer.from(await file.arrayBuffer())
      content_b64 = buf.toString("base64")
    }
  } else if (body) {
    token_acceso = typeof body.token_acceso === "string" ? body.token_acceso.trim() : ""
    filename =
      typeof body.filename === "string" && body.filename.trim()
        ? body.filename.trim()
        : filename
    content_b64 = typeof body.content_b64 === "string" ? body.content_b64.trim() : ""
  }

  if (!token_acceso || !content_b64) {
    return NextResponse.json(
      { error: "Faltan token_acceso o el archivo PDF." },
      { status: 400 }
    )
  }
  if (!filename.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "El comprobante debe ser un PDF." }, { status: 400 })
  }

  try {
    const data = await callFrappeMethod(FRAPPE_UPLOAD_ADJUNTAR_COMPROBANTE_EXTERNO, {
      token_acceso,
      filename,
      content_b64,
    })
    const reserva = normalizeReservaExterna(data)
    return NextResponse.json(reserva ?? data)
  } catch (err) {
    return jsonError(err, "No se pudo adjuntar el comprobante.")
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || ""

  // Multipart → upload directo
  if (contentType.includes("multipart/form-data")) {
    return handleUploadComprobante(request, null)
  }

  let body: PostBody
  try {
    body = (await request.json()) as PostBody
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 })
  }

  const action = (body.action || "solicitar").trim()

  if (action === "abrir") {
    try {
      const sesion_token = await ensureSesionToken("")
      const res = NextResponse.json({ ok: true })
      setSesionCookie(res, sesion_token)
      return res
    } catch (err) {
      return jsonError(err, "No se pudo abrir la sesión de alquiler.")
    }
  }

  if (action === "upload_comprobante") {
    return handleUploadComprobante(request, body)
  }

  // solicitar
  const espacio = typeof body.espacio === "string" ? body.espacio.trim() : ""
  const fecha = typeof body.fecha === "string" ? body.fecha.trim() : ""
  const hora_inicio = typeof body.hora_inicio === "string" ? body.hora_inicio.trim() : ""
  const hora_fin = typeof body.hora_fin === "string" ? body.hora_fin.trim() : ""
  const arrendatario_nombre =
    typeof body.arrendatario_nombre === "string" ? body.arrendatario_nombre.trim() : ""
  const arrendatario_contacto =
    typeof body.arrendatario_contacto === "string" ? body.arrendatario_contacto.trim() : ""

  if (!espacio || !fecha || !hora_inicio || !hora_fin) {
    return NextResponse.json(
      { error: "Faltan espacio, fecha, hora_inicio u hora_fin." },
      { status: 400 }
    )
  }
  if (!arrendatario_nombre || !arrendatario_contacto) {
    return NextResponse.json(
      { error: "Indicá tu nombre y un contacto (email o teléfono)." },
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
    const existing = await resolveSesionForPost(request)
    let sesion_token = existing || (await ensureSesionToken(""))

    const data = await callFrappeMethod(FRAPPE_SOLICITAR_EXTERNA, {
      sesion_token,
      espacio,
      fecha,
      hora_inicio,
      hora_fin,
      arrendatario_nombre,
      arrendatario_contacto,
    })
    const result = normalizeSolicitarExterno(data)
    const res = NextResponse.json(result)
    setSesionCookie(res, sesion_token)
    return res
  } catch (err) {
    const hadSesion = Boolean(await resolveSesionForPost(request))
    if (
      hadSesion &&
      err instanceof FrappeApiError &&
      (err.status === 403 || err.status === 401)
    ) {
      try {
        const sesion_token = await ensureSesionToken("")
        const data = await callFrappeMethod(FRAPPE_SOLICITAR_EXTERNA, {
          sesion_token,
          espacio,
          fecha,
          hora_inicio,
          hora_fin,
          arrendatario_nombre,
          arrendatario_contacto,
        })
        const result = normalizeSolicitarExterno(data)
        const res = NextResponse.json(result)
        setSesionCookie(res, sesion_token)
        return res
      } catch (retryErr) {
        return jsonError(retryErr, "No se pudo solicitar la reserva.")
      }
    }
    return jsonError(err, "No se pudo solicitar la reserva.")
  }
}
