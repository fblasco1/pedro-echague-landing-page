/**
 * Tipos del contrato portal ↔ BFF ↔ Frappe (`portal_reservas`).
 * Alineado a `club_management.spaces.api.portal_reservas`.
 *
 * Nota de contrato Frappe:
 * - Disponibilidad: cada espacio usa la clave `espacio` (id); el BFF expone `name`.
 * - Solicitud: Frappe devuelve `reserva` (id); el BFF expone `name`.
 * - Slots: estados reales `libre` | `ocupado` (`bloqueado` queda tipado por compat).
 */

export type SlotEstado = "libre" | "ocupado" | "bloqueado"

/** Franja horaria de un espacio en una fecha. */
export type ReservaSlot = {
  hora_inicio: string
  hora_fin: string
  estado: SlotEstado
  /** Motivo de ocupación / bloqueo cuando no está libre. */
  motivo?: string | null
}

/** Espacio alquilable con su grilla del día. */
export type EspacioResumen = {
  name: string
  titulo: string
  tipo: string
  capacidad_personas?: number | null
  monto_arancel?: number | null
  imagen?: string | null
  combo_con?: Array<{ espacio: string; titulo: string }>
  slots: ReservaSlot[]
}

export type DisponibilidadReservas = {
  fecha: string
  tipo_espacio?: string | null
  espacios: EspacioResumen[]
}

export type SolicitarReservaPayload = {
  espacio: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  espacios_extra?: string[]
}

export type SolicitarReservaResultado = {
  name: string
  estado: string
  espacio: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  monto_arancel?: number | null
  status?: string
  cargo_socio?: string | null
  socio?: string | null
}

export const FRAPPE_GET_ESPACIOS =
  "club_management.spaces.api.portal_reservas.get_espacios_disponibles"

export const FRAPPE_SOLICITAR_RESERVA =
  "club_management.spaces.api.portal_reservas.solicitar_reserva_espacio"

export const FRAPPE_LIST_RESERVAS =
  "club_management.spaces.api.portal_reservas.list_reservas_propias"

export const FRAPPE_ADJUNTAR_COMPROBANTE =
  "club_management.spaces.api.portal_reservas.adjuntar_comprobante_reserva"

export type ReservaPropia = {
  name: string
  espacio: string
  fecha: string | null
  hora_inicio: string | null
  hora_fin: string | null
  estado: string
  monto_arancel?: number | null
  cargo_socio?: string | null
  comprobante?: string | null
  fecha_comprobante?: string | null
  motivo_rechazo?: string | null
}

export function normalizeReservaPropia(raw: unknown): ReservaPropia | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as Record<string, unknown>
  const name = asString(obj.name) || asString(obj.reserva)
  if (!name) return null
  return {
    name,
    espacio: asString(obj.espacio),
    fecha: obj.fecha == null ? null : asString(obj.fecha),
    hora_inicio: obj.hora_inicio == null ? null : asString(obj.hora_inicio),
    hora_fin: obj.hora_fin == null ? null : asString(obj.hora_fin),
    estado: asString(obj.estado),
    monto_arancel: asOptionalNumber(obj.monto_arancel) ?? null,
    cargo_socio: obj.cargo_socio == null ? null : asString(obj.cargo_socio),
    comprobante: obj.comprobante == null ? null : asString(obj.comprobante),
    fecha_comprobante:
      obj.fecha_comprobante == null ? null : asString(obj.fecha_comprobante),
    motivo_rechazo:
      obj.motivo_rechazo == null ? null : asString(obj.motivo_rechazo),
  }
}

const SLOT_ESTADOS: ReadonlySet<string> = new Set(["libre", "ocupado", "bloqueado"])

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function asOptionalNumber(value: unknown): number | null | undefined {
  if (value == null) return value === null ? null : undefined
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

function normalizeSlot(raw: unknown): ReservaSlot | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as Record<string, unknown>
  const hora_inicio = asString(obj.hora_inicio)
  const hora_fin = asString(obj.hora_fin)
  if (!hora_inicio || !hora_fin) return null
  const estadoRaw = asString(obj.estado, "ocupado")
  const estado: SlotEstado = SLOT_ESTADOS.has(estadoRaw)
    ? (estadoRaw as SlotEstado)
    : "ocupado"
  const slot: ReservaSlot = { hora_inicio, hora_fin, estado }
  if ("motivo" in obj) {
    slot.motivo = obj.motivo == null ? null : asString(obj.motivo)
  }
  return slot
}

/** Mapea un ítem Frappe (`espacio` id) al shape BFF (`name`). */
export function normalizeEspacioResumen(raw: unknown): EspacioResumen | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as Record<string, unknown>
  const name = asString(obj.name) || asString(obj.espacio)
  if (!name) return null
  const slotsRaw = Array.isArray(obj.slots) ? obj.slots : []
  const slots = slotsRaw
    .map(normalizeSlot)
    .filter((s): s is ReservaSlot => s != null)

  const out: EspacioResumen = {
    name,
    titulo: asString(obj.titulo) || name,
    tipo: asString(obj.tipo),
    slots,
  }
  if ("capacidad_personas" in obj) {
    out.capacidad_personas = asOptionalNumber(obj.capacidad_personas) ?? null
  }
  if ("monto_arancel" in obj) {
    out.monto_arancel = asOptionalNumber(obj.monto_arancel) ?? null
  }
  if ("imagen" in obj) {
    out.imagen = obj.imagen == null ? null : asString(obj.imagen)
  }
  if (Array.isArray(obj.combo_con)) {
    out.combo_con = obj.combo_con
      .map((c) => {
        if (!c || typeof c !== "object") return null
        const row = c as Record<string, unknown>
        const espacio = asString(row.espacio) || asString(row.name)
        if (!espacio) return null
        return { espacio, titulo: asString(row.titulo) || espacio }
      })
      .filter((c): c is { espacio: string; titulo: string } => c != null)
  }
  return out
}

/** Normaliza la respuesta de Frappe (array o envelope) al shape del BFF. */
export function normalizeDisponibilidad(
  raw: unknown,
  fecha: string,
  tipo_espacio?: string | null
): DisponibilidadReservas {
  if (Array.isArray(raw)) {
    return {
      fecha,
      tipo_espacio: tipo_espacio ?? null,
      espacios: raw
        .map(normalizeEspacioResumen)
        .filter((e): e is EspacioResumen => e != null),
    }
  }
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>
    const espacios = Array.isArray(obj.espacios)
      ? obj.espacios
          .map(normalizeEspacioResumen)
          .filter((e): e is EspacioResumen => e != null)
      : []
    return {
      fecha: typeof obj.fecha === "string" && obj.fecha ? obj.fecha : fecha,
      tipo_espacio:
        typeof obj.tipo_espacio === "string"
          ? obj.tipo_espacio
          : tipo_espacio ?? null,
      espacios,
    }
  }
  return { fecha, tipo_espacio: tipo_espacio ?? null, espacios: [] }
}

/** Mapea respuesta Frappe (`reserva`) al shape BFF (`name`). */
export function normalizeSolicitarResultado(raw: unknown): SolicitarReservaResultado {
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
    monto_arancel: asOptionalNumber(obj.monto_arancel) ?? null,
    status: asString(obj.status) || undefined,
    cargo_socio: obj.cargo_socio == null ? null : asString(obj.cargo_socio),
    socio: obj.socio == null ? null : asString(obj.socio),
  }
}
