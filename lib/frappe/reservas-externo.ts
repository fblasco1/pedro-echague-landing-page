/**
 * Contrato guest ↔ BFF ↔ Frappe (`externo_reservas`).
 * Spec: club_management/specs/reservas_espacio_externo.md
 *
 * Sesión corta (HMAC ~2 h) en cookie/header; por reserva: `token_acceso`.
 */

import {
  normalizeReservaPropia,
  type ReservaPropia,
  type SolicitarReservaResultado,
} from "@/lib/frappe/reservas"

export const FRAPPE_ABRIR_SESION_EXTERNA =
  "club_management.spaces.api.externo_reservas.abrir_sesion_reserva_externa"

export const FRAPPE_GET_ESPACIOS_EXTERNO =
  "club_management.spaces.api.externo_reservas.get_espacios_disponibles_externo"

export const FRAPPE_SOLICITAR_EXTERNA =
  "club_management.spaces.api.externo_reservas.solicitar_reserva_externa"

export const FRAPPE_GET_RESERVA_EXTERNA =
  "club_management.spaces.api.externo_reservas.get_reserva_externa"

export const FRAPPE_ADJUNTAR_COMPROBANTE_EXTERNO =
  "club_management.spaces.api.externo_reservas.adjuntar_comprobante_externo"

export const FRAPPE_UPLOAD_ADJUNTAR_COMPROBANTE_EXTERNO =
  "club_management.spaces.api.externo_reservas.upload_y_adjuntar_comprobante_externo"

/** Cookie httpOnly del BFF con el sesion_token HMAC de Frappe. */
export const ALQUILER_SESION_COOKIE = "alquiler_sesion"

/** Header opcional si el cliente no usa cookie (p. ej. tests). */
export const ALQUILER_SESION_HEADER = "x-alquiler-sesion"

/** ~2 h, alineado a la vida del token Frappe. */
export const ALQUILER_SESION_MAX_AGE = 2 * 60 * 60

export type SolicitarExternoPayload = {
  espacio: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  arrendatario_nombre: string
  arrendatario_contacto: string
}

export type SolicitarExternoResultado = SolicitarReservaResultado & {
  token_acceso: string
  status?: string
}

export type ReservaExterna = ReservaPropia & {
  arrendatario_nombre?: string | null
  token_acceso?: string | null
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

/** Normaliza respuesta de solicitar_reserva_externa (reserva + token_acceso). */
export function normalizeSolicitarExterno(raw: unknown): SolicitarExternoResultado {
  const obj =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {}
  const name = asString(obj.name) || asString(obj.reserva)
  return {
    name,
    estado: asString(obj.estado),
    espacio: asString(obj.espacio),
    fecha: asString(obj.fecha),
    hora_inicio: asString(obj.hora_inicio),
    hora_fin: asString(obj.hora_fin),
    monto_arancel:
      typeof obj.monto_arancel === "number"
        ? obj.monto_arancel
        : obj.monto_arancel == null
          ? null
          : Number(obj.monto_arancel) || null,
    status: asString(obj.status) || undefined,
    token_acceso: asString(obj.token_acceso),
  }
}

/** Normaliza get_reserva_externa al shape BFF. */
export function normalizeReservaExterna(raw: unknown): ReservaExterna | null {
  const base = normalizeReservaPropia(raw)
  if (!base) return null
  const obj =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {}
  return {
    ...base,
    arrendatario_nombre:
      obj.arrendatario_nombre == null ? null : asString(obj.arrendatario_nombre),
    token_acceso: obj.token_acceso == null ? null : asString(obj.token_acceso),
  }
}

/** Mensaje amigable cuando el canal guest está apagado (403 / PermissionError). */
export function mensajeCanalDeshabilitado(status: number, message: string): string {
  const lower = (message || "").toLowerCase()
  if (
    status === 403 ||
    lower.includes("not permitted") ||
    lower.includes("permission")
  ) {
    return "La reserva online de espacios no está disponible en este momento. Contactá al club para reservar."
  }
  return message || "Error en el servidor"
}
