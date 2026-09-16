import { NextResponse } from "next/server"
import { FrappeApiError } from "@/lib/frappe/client"
import { callFrappeMethodAuthed, readSocioSession } from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

export async function GET() {
  const session = await readSocioSession()
  if (!session) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: 401 })
  }
  try {
    const data = await callFrappeMethodAuthed(
      "club_management.members.api.portal_perfil.get_perfil_socio",
      {},
      session
    )
    return NextResponse.json(data)
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "No se pudo cargar el perfil." }, { status: 502 })
  }
}

export async function POST(request: Request) {
  const session = await readSocioSession()
  if (!session) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: 401 })
  }
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 })
  }
  try {
    const data = await callFrappeMethodAuthed(
      "club_management.members.api.portal_perfil.update_perfil_socio",
      { data: body },
      session
    )
    return NextResponse.json(data)
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "No se pudo guardar el perfil." }, { status: 502 })
  }
}
