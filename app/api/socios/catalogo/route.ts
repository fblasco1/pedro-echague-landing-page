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
      "club_management.activities.api.portal_socio.get_catalogo_inscripcion",
      {},
      session
    )
    return NextResponse.json(data)
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "No se pudo cargar el catálogo." }, { status: 502 })
  }
}
