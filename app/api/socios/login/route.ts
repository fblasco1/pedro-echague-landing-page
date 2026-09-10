import { NextResponse } from "next/server"
import { FrappeApiError } from "@/lib/frappe/client"
import {
  loginSocioSession,
  sessionCookieOptions,
  SOCIO_CSRF_COOKIE,
  SOCIO_SID_COOKIE,
} from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let usr = ""
  let pwd = ""
  try {
    const body = (await request.json()) as { usr?: string; pwd?: string }
    usr = (body.usr || "").trim()
    pwd = body.pwd || ""
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 })
  }
  if (!usr || !pwd) {
    return NextResponse.json(
      { error: "Ingresá tu email o DNI y tu contraseña." },
      { status: 400 }
    )
  }
  try {
    const session = await loginSocioSession(usr, pwd)
    const res = NextResponse.json({ ok: true })
    const opts = sessionCookieOptions()
    res.cookies.set(SOCIO_SID_COOKIE, session.sid, opts)
    res.cookies.set(SOCIO_CSRF_COOKIE, session.csrfToken, opts)
    return res
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json(
      { error: "No se pudo iniciar sesión. Probá de nuevo." },
      { status: 502 }
    )
  }
}
