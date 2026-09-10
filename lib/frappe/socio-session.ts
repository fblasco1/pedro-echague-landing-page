/**
 * Sesión del socio contra Frappe (sid + CSRF).
 * Solo Route Handlers — el browser habla con /api/socios/*.
 */

import { cookies } from "next/headers"
import {
  FrappeApiError,
  frappeFetch,
} from "@/lib/frappe/client"

export const SOCIO_SID_COOKIE = "socio_sid"
export const SOCIO_CSRF_COOKIE = "socio_csrf"

const SESSION_MAX_AGE = 8 * 60 * 60

export type FrappeSocioSession = {
  sid: string
  csrfToken: string
}

type FrappeErrorBody = {
  exc_type?: string
  exception?: string
  _server_messages?: string
  message?: unknown
}

function parseSetCookie(res: Response): Record<string, string> {
  const headers = res.headers as Headers & { getSetCookie?: () => string[] }
  const lines =
    typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : [res.headers.get("set-cookie") || ""].filter(Boolean)
  const out: Record<string, string> = {}
  for (const line of lines) {
    const pair = line.split(";")[0] || ""
    const eq = pair.indexOf("=")
    if (eq > 0) {
      out[pair.slice(0, eq).trim()] = decodeURIComponent(pair.slice(eq + 1).trim())
    }
  }
  return out
}

function genericAuthError(status: number): FrappeApiError {
  return new FrappeApiError(status, "Usuario o contraseña incorrectos.")
}

export async function loginSocioSession(usr: string, pwd: string): Promise<FrappeSocioSession> {
  const res = await frappeFetch("/api/method/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ usr: usr.trim(), pwd }),
  })
  const cookiesMap = parseSetCookie(res)
  if (!res.ok || !cookiesMap.sid) {
    throw genericAuthError(res.status === 401 || res.status === 403 ? res.status : 401)
  }
  let csrf = cookiesMap.csrf_token || cookiesMap.csrfToken || ""
  if (!csrf) {
    const boot = await frappeFetch(
      "/api/method/club_management.activities.api.portal_socio.get_session_bootstrap",
      {
      method: "GET",
      headers: {
        Cookie: `sid=${cookiesMap.sid}`,
        Accept: "application/json",
      },
      }
    )
    const body = (await boot.json().catch(() => ({}))) as {
      message?: { csrf_token?: string }
    }
    if (boot.status === 401 || boot.status === 403) {
      throw new FrappeApiError(403, "No tenés acceso al portal de socio.")
    }
    csrf = body.message?.csrf_token || ""
  }
  if (!csrf) {
    throw new FrappeApiError(502, "No se pudo iniciar sesión. Probá de nuevo.")
  }
  return { sid: cookiesMap.sid, csrfToken: csrf }
}

export async function logoutSocioSession(session: FrappeSocioSession): Promise<void> {
  await frappeFetch("/api/method/logout", {
    method: "POST",
    headers: {
      Cookie: `sid=${session.sid}`,
      "X-Frappe-CSRF-Token": session.csrfToken,
      Accept: "application/json",
    },
  }).catch(() => undefined)
}

export async function callFrappeMethodAuthed<T>(
  method: string,
  params: Record<string, unknown>,
  session: FrappeSocioSession
): Promise<T> {
  const res = await frappeFetch(`/api/method/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `sid=${session.sid}; csrf_token=${session.csrfToken}`,
      "X-Frappe-CSRF-Token": session.csrfToken,
    },
    body: JSON.stringify(params),
  })
  const raw = await res.text()
  let body: FrappeErrorBody = {}
  try {
    body = raw ? (JSON.parse(raw) as FrappeErrorBody) : {}
  } catch {
    throw new FrappeApiError(res.status || 502, "No se pudo contactar al club. Probá de nuevo.")
  }
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new FrappeApiError(res.status, "Sesión vencida. Volvé a ingresar.")
    }
    let msg =
      typeof body.message === "string" && body.message.trim() ? body.message : ""
    if (!msg && body._server_messages) {
      try {
        const parsed = JSON.parse(body._server_messages) as string[]
        const inner = JSON.parse(parsed[0] || "{}") as { message?: string }
        msg = inner.message || ""
      } catch {
        /* ignore */
      }
    }
    if (!msg && typeof body.exception === "string") {
      const parts = body.exception.split(":")
      msg = parts[parts.length - 1]?.trim() || ""
    }
    throw new FrappeApiError(res.status, msg || "No se pudo completar la operación.")
  }
  return body.message as T
}

export async function readSocioSession(): Promise<FrappeSocioSession | null> {
  const store = await cookies()
  const sid = store.get(SOCIO_SID_COOKIE)?.value
  const csrfToken = store.get(SOCIO_CSRF_COOKIE)?.value
  if (!sid || !csrfToken) return null
  return { sid, csrfToken }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE,
    path: "/",
  }
}
