import { NextResponse } from "next/server"
import { callFrappeMethod, FrappeApiError, type CatalogoAlta } from "@/lib/frappe/client"

export const runtime = "nodejs"

export async function GET() {
  try {
    const catalogo = await callFrappeMethod<CatalogoAlta>(
      "club_management.members.api.alta_grupo_publica.get_catalogo_alta"
    )
    return NextResponse.json(catalogo)
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("[inscripcion/catalogo]", err)
    return NextResponse.json(
      { error: "No se pudo cargar el catálogo. Probá de nuevo en unos minutos." },
      { status: 502 }
    )
  }
}
