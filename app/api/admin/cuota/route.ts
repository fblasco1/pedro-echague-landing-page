import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { adminClient } from '@/sanity/adminClient'

export async function GET() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const list = await adminClient.fetch<{ _id: string; categoria: string; valor: string; condicion: string; vigenteDesde: string | null }[]>(
      `*[_type == "cuotaCategoria"] | order(valor desc){ _id, categoria, valor, condicion, vigenteDesde }`
    )
    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al obtener cuotas' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await request.json()
    const { _id, categoria, valor, condicion, vigenteDesde } = body

    // Actualizar fecha vigente en todas las categorías de una vez
    if (vigenteDesde !== undefined && !_id) {
      const ids = await adminClient.fetch<string[]>(
        `*[_type == "cuotaCategoria"]._id`
      )
      const tx = adminClient.transaction()
      for (const id of ids) {
        tx.patch(id, (p) => p.set({ vigenteDesde }))
      }
      await tx.commit()
      return NextResponse.json({ ok: true })
    }

    if (!_id) return NextResponse.json({ error: 'Falta _id' }, { status: 400 })
    const patch: Record<string, unknown> = {}
    if (categoria !== undefined) patch.categoria = categoria
    if (valor !== undefined) patch.valor = valor
    if (condicion !== undefined) patch.condicion = condicion
    if (vigenteDesde !== undefined) patch.vigenteDesde = vigenteDesde
    await adminClient.patch(_id).set(patch).commit()
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al actualizar cuota' }, { status: 500 })
  }
}
