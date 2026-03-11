import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { adminClient } from '@/sanity/adminClient'

type HorarioItem = {
  category?: string
  tira?: string
  genero?: string
  days?: string
  fee?: string
  arancel?: string
  arancelSocio?: string
  arancelNoSocio?: string
  arancelPorClases?: string
}

type ArancelPeriodicidadItem = { periodicidad: string; valor: string }

export async function GET() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const list = await adminClient.fetch<
      { _id: string; title: string; slug: { current: string }; horarios: HorarioItem[]; arancelPorPeriodicidad?: ArancelPeriodicidadItem[] }[]
    >(
      `*[_type == "actividad"]{ _id, title, "slug": slug.current, horarios, arancelPorPeriodicidad }`
    )
    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al obtener actividades' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await request.json()
    const { _id, horarios, arancelPorPeriodicidad } = body as {
      _id: string
      horarios?: HorarioItem[]
      arancelPorPeriodicidad?: ArancelPeriodicidadItem[]
    }
    if (!_id) return NextResponse.json({ error: 'Falta _id' }, { status: 400 })
    const patch: Record<string, unknown> = {}
    if (Array.isArray(horarios)) patch.horarios = horarios
    if (arancelPorPeriodicidad !== undefined) patch.arancelPorPeriodicidad = arancelPorPeriodicidad
    if (Object.keys(patch).length === 0) return NextResponse.json({ error: 'Falta horarios o arancelPorPeriodicidad' }, { status: 400 })
    await adminClient.patch(_id).set(patch).commit()
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
