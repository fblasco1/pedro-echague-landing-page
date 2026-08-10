import { NextRequest, NextResponse } from "next/server"
import { FrappeApiError, uploadFileToFrappe } from "@/lib/frappe/client"

export const runtime = "nodejs"

const MAX_BYTES = 4 * 1024 * 1024 // 4 MB — bajo el límite ~4.5 MB de Vercel
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
])

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const file = form.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Falta el archivo" }, { status: 400 })
    }
    if (file.size <= 0) {
      return NextResponse.json({ error: "Archivo vacío" }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "El archivo supera 4 MB. Comprimí la imagen o usá un PDF más liviano." },
        { status: 413 }
      )
    }
    if (file.type && !ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: "Formato no permitido. Usá JPG, PNG, WEBP o PDF." },
        { status: 400 }
      )
    }

    const fileUrl = await uploadFileToFrappe(file)
    return NextResponse.json({ file_url: fileUrl })
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("[inscripcion/upload]", err)
    return NextResponse.json({ error: "No se pudo subir el archivo" }, { status: 502 })
  }
}
