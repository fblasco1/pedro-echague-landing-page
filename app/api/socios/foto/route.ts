import { NextResponse } from "next/server"
import { FrappeApiError, frappeFetch } from "@/lib/frappe/client"
import { callFrappeMethodAuthed, readSocioSession } from "@/lib/frappe/socio-session"

export const runtime = "nodejs"

function isSafePrivatePath(path: string): boolean {
  return (
    path.startsWith("/private/files/") &&
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
      return NextResponse.json({ error: "Sesión vencida. Volvé a ingresar." }, { status: fileRes.status })
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
