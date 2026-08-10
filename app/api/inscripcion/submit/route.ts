import { NextRequest, NextResponse } from "next/server"
import {
  callFrappeMethod,
  FrappeApiError,
  type SubmitAltaResult,
} from "@/lib/frappe/client"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body || typeof body !== "object" || !body.titular) {
      return NextResponse.json(
        { error: "Payload inválido: falta el titular" },
        { status: 400 }
      )
    }

    const result = await callFrappeMethod<SubmitAltaResult>(
      "club_management.members.api.alta_grupo_publica.submit_alta_grupo",
      { data: body }
    )

    return NextResponse.json(result)
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("[inscripcion/submit]", err)
    return NextResponse.json(
      { error: "No se pudo enviar la solicitud. Probá de nuevo." },
      { status: 502 }
    )
  }
}
