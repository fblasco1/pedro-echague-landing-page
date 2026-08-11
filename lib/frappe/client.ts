/**
 * Cliente server-side hacia Frappe (club_management).
 * Solo se usa desde Route Handlers — nunca en el browser.
 */

export class FrappeApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = "FrappeApiError"
  }
}

/** Local: IPv4. En Vercel exige FRAPPE_BASE_URL (UAT túnel o staging/prod explícito). */
function defaultFrappeBaseUrl(): string {
  if (process.env.VERCEL) {
    throw new FrappeApiError(
      500,
      "Falta FRAPPE_BASE_URL en Vercel (Preview/Production). Para UAT usá el túnel cloudflared + FRAPPE_SITE_HOST=dev.localhost."
    )
  }
  return "http://127.0.0.1:8000"
}

export function getFrappeBaseUrl(): string {
  return (process.env.FRAPPE_BASE_URL || defaultFrappeBaseUrl()).replace(/\/$/, "")
}

export function getPortalKey(): string | undefined {
  return process.env.FRAPPE_PORTAL_KEY || undefined
}

type FrappeErrorBody = {
  exc_type?: string
  exception?: string
  _server_messages?: string
  message?: string
}

function extractFrappeMessage(body: FrappeErrorBody): string {
  if (typeof body.message === "string" && body.message.trim()) {
    return body.message
  }
  if (body._server_messages) {
    try {
      const parsed = JSON.parse(body._server_messages) as string[]
      const first = parsed[0]
      if (first) {
        const inner = JSON.parse(first) as { message?: string }
        if (inner.message) return inner.message
      }
    } catch {
      /* ignore */
    }
  }
  if (body.exception) {
    const parts = body.exception.split(":")
    return parts[parts.length - 1]?.trim() || "Error en el servidor"
  }
  return "Error en el servidor"
}

function frappeHostHeader(baseUrl: string): string | undefined {
  // Siempre preferir FRAPPE_SITE_HOST (UAT vía túnel Cloudflare, local IP, etc.).
  if (process.env.FRAPPE_SITE_HOST?.trim()) {
    return process.env.FRAPPE_SITE_HOST.trim()
  }
  try {
    const host = new URL(baseUrl).hostname
    // En local a menudo usamos 127.0.0.1 pero el site de Frappe es dev.localhost.
    if (host === "127.0.0.1" || host === "localhost") {
      return "dev.localhost"
    }
    return host
  } catch {
    return undefined
  }
}

async function frappeFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const base = getFrappeBaseUrl()
  const headers = new Headers(init.headers)
  const portalKey = getPortalKey()
  if (portalKey) {
    headers.set("X-Portal-Key", portalKey)
  }
  const siteHost = frappeHostHeader(base)
  if (siteHost && !headers.has("Host")) {
    // Undici/Node ignora Host custom en algunos casos; Accept + URL IP + site header
    // vía `X-Frappe-Site-Name` es el patrón soportado por Frappe.
    headers.set("X-Frappe-Site-Name", siteHost)
  }
  return fetch(`${base}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  })
}

/** Llama a un `@frappe.whitelist` method. */
export async function callFrappeMethod<T>(
  method: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const res = await frappeFetch(`/api/method/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(params),
  })

  const raw = await res.text()
  let body: FrappeErrorBody & { message?: T } = {}
  try {
    body = raw ? (JSON.parse(raw) as FrappeErrorBody & { message?: T }) : {}
  } catch {
    throw new FrappeApiError(
      res.status || 502,
      res.redirected || res.status === 302
        ? "El preview de Vercel exige autenticación SSO; abrí la URL en el navegador o desactivá Deployment Protection."
        : `Respuesta no JSON del backend (${res.status}). Revisá FRAPPE_BASE_URL.`
    )
  }

  if (!res.ok) {
    throw new FrappeApiError(res.status, extractFrappeMessage(body))
  }

  return body.message as T
}

/** Sube un archivo como Guest vía `upload_file`. Devuelve la URL `/files/...`. */
export async function uploadFileToFrappe(file: File): Promise<string> {
  const form = new FormData()
  form.append("file", file, file.name)
  form.append("is_private", "0")
  form.append("folder", "Home")

  const res = await frappeFetch("/api/method/upload_file", {
    method: "POST",
    body: form,
  })

  const body = (await res.json().catch(() => ({}))) as FrappeErrorBody & {
    message?: { file_url?: string; file_name?: string }
  }

  if (!res.ok) {
    throw new FrappeApiError(res.status, extractFrappeMessage(body))
  }

  const url = body.message?.file_url
  if (!url) {
    throw new FrappeApiError(502, "El servidor no devolvió la URL del archivo")
  }
  return url
}

export type CatalogoAlta = {
  actividades: Array<{ value: string; label: string }>
  categorias: string[]
  roles_grupo: string[]
  adjuntos: string[]
  places?: Record<string, unknown>
}

export type SubmitAltaResult = {
  status: string
  token_seguimiento: string
  personas: number
}
