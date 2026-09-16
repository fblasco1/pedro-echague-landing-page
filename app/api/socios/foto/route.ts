import { NextResponse } from "next/server"
import { FrappeApiError, frappeFetch } from "@/lib/frappe/client"
import { callFrappeMethodAuthed, readSocioSession } from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

const MAX_BYTES = 8 * 1024 * 1024

function isSafePrivatePath(path: string): boolean {
  return (
    (path.startsWith("/private/files/") || path.startsWith("/files/")) &&
    !path.includes("..") &&
    !path.includes("\\") &&
    !path.includes("://")
  )
}

export async function GET() {
  const session = await readSocioSession()
  if (!session) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: 401 })
  }
  try {
    const path = await callFrappeMethodAuthed<string>(
      "club_management.members.api.portal_perfil.get_foto_perfil_path",
      {},
      session
    )
    if (typeof path !== "string" || !isSafePrivatePath(path)) {
      return NextResponse.json({ error: "Foto no disponible." }, { status: 404 })
    }
    const fileRes = await frappeFetch(path, {
      method: "GET",
      headers: {
        Cookie: `sid=${session.sid}`,
        Accept: "image/*,*/*",
      },
    })
    if (fileRes.status === 401 || fileRes.status === 403) {
      return NextResponse.json(
        { error: "Sesión vencida. Volvé a ingresar." },
        { status: fileRes.status }
      )
    }
    if (!fileRes.ok) {
      return NextResponse.json({ error: "Foto no disponible." }, { status: 404 })
    }
    const contentType = fileRes.headers.get("content-type") || "image/jpeg"
    const buffer = await fileRes.arrayBuffer()
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, no-store",
      },
    })
  } catch (err) {
    if (err instanceof FrappeApiError) {
      const status = err.status === 404 || err.status === 417 ? 404 : err.status
      return NextResponse.json(
        { error: status === 404 ? "Foto no disponible." : err.message },
        { status }
      )
    }
    return NextResponse.json({ error: "No se pudo obtener la foto." }, { status: 502 })
  }
}

/** POST multipart: sube imagen y actualiza foto_perfil del socio. */
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
    return NextResponse.json({ error: "Elegí una imagen." }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "La imagen supera 8 MB." }, { status: 400 })
  }
  const type = (file.type || "").toLowerCase()
  if (type && !type.startsWith("image/")) {
    return NextResponse.json({ error: "Solo se permiten imágenes." }, { status: 400 })
  }

  try {
    const uploadForm = new FormData()
    uploadForm.append("file", file, file.name || "foto-perfil.jpg")
    uploadForm.append("is_private", "1")
    uploadForm.append("folder", "Home")

    const uploadRes = await frappeFetch("/api/method/upload_file", {
      method: "POST",
      headers: {
        Cookie: `sid=${session.sid}; csrf_token=${session.csrfToken}`,
        "X-Frappe-CSRF-Token": session.csrfToken,
      },
      body: uploadForm,
    })
    const uploadBody = (await uploadRes.json().catch(() => ({}))) as {
      message?: { file_url?: string }
      exc_type?: string
      _server_messages?: string
    }
    if (!uploadRes.ok || !uploadBody.message?.file_url) {
      throw new FrappeApiError(
        uploadRes.status || 502,
        "No se pudo subir la foto. Probá de nuevo."
      )
    }
    const file_url = uploadBody.message.file_url
    const data = await callFrappeMethodAuthed(
      "club_management.members.api.portal_perfil.update_foto_perfil",
      { file_url },
      session
    )
    return NextResponse.json(data)
  } catch (err) {
    if (err instanceof FrappeApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "No se pudo actualizar la foto." }, { status: 502 })
  }
}
