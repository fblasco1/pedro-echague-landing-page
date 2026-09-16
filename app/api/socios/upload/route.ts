import { NextResponse } from "next/server"
import { FrappeApiError, frappeFetch } from "@/lib/frappe/client"
import { readSocioSession } from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

const MAX_BYTES = 10 * 1024 * 1024

/** Sube un archivo privado con la sesión del socio. Body: multipart `file`. */
export async function POST(request: Request) {
  const session = await readSocioSession()
  if (!session) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: 401 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 })
  }
  const file = form.get("file")
  if (!(file instanceof File) || file.size <= 0) {
    return NextResponse.json({ error: "Elegí un archivo." }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "El archivo supera 10 MB." }, { status: 400 })
  }

  try {
    const uploadForm = new FormData()
    uploadForm.append("file", file, file.name || "adjunto.bin")
    uploadForm.append("is_private", "1")
    uploadForm.append("folder", "Home")

    const res = await frappeFetch("/api/method/upload_file", {
      method: "POST",
      headers: {
        Cookie: `sid=${session.sid}; csrf_token=${session.csrfToken}`,
        "X-Frappe-CSRF-Token": session.csrfToken,
      },
      body: uploadForm,
    })
    const body = (await res.json().catch(() => ({}))) as {
      message?: { file_url?: string }
    }
    if (!res.ok || !body.message?.file_url) {
      throw new FrappeApiError(res.status || 502, "No se pudo subir el archivo.")
    }
    return NextResponse.json({ file_url: body.message.file_url })
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "No se pudo subir el archivo." }, { status: 502 })
  }
}
