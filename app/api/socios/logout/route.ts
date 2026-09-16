import { NextResponse } from "next/server"
import {
  logoutSocioSession,
  readSocioSession,
  SOCIO_CSRF_COOKIE,
  SOCIO_SID_COOKIE,
} from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

export async function POST() {
  const session = await readSocioSession()
  if (session) {
    await logoutSocioSession(session)
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SOCIO_SID_COOKIE, "", { path: "/", maxAge: 0 })
  res.cookies.set(SOCIO_CSRF_COOKIE, "", { path: "/", maxAge: 0 })
  return res
}
