import { NextResponse } from "next/server"
import { FrappeApiError } from "@/lib/frappe/client"
import { callFrappeMethodAuthed, readSocioSession } from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

type Seleccion = {
  actividad: string
  grupo?: string
  grupo_actividad?: string
}

export async function POST(request: Request) {
  const session = await readSocioSession()
  if (!session) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: 401 })
  }
  let selecciones: Seleccion[] = []
  try {
    const body = (await request.json()) as { selecciones?: Seleccion[] }
    selecciones = Array.isArray(body.selecciones) ? body.selecciones : []
  } catch {
    return NextResponse.json({ error: "Selección inválida." }, { status: 400 })
  }
  try {
    const data = await callFrappeMethodAuthed(
      "club_management.activities.api.portal_socio.confirmar_inscripcion_actividades",
      { selecciones },
      session
    )
    return NextResponse.json(data)
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json(
      { error: "No se pudo confirmar la inscripción." },
      { status: 502 }
    )
  }
}
