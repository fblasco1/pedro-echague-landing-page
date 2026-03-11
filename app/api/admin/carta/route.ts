import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { adminClient } from '@/sanity/adminClient'

export async function GET() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const list = await adminClient.fetch<
      { _id: string; nombre: string; descripcion?: string; precio?: string; categoria: string; subcategoria?: string; orden?: number }[]
    >(
      `*[_type == "platoCarta"] | order(categoria asc, orden asc, nombre asc){ _id, nombre, descripcion, precio, categoria, subcategoria, orden }`
    )
    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al obtener carta' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await request.json()
    const { nombre, descripcion, precio, categoria, subcategoria, orden } = body
    if (!nombre || !categoria) return NextResponse.json({ error: 'Faltan nombre o categoría' }, { status: 400 })
    const doc = await adminClient.create({
      _type: 'platoCarta',
      nombre,
      descripcion: descripcion || '',
      precio: precio || '',
      categoria,
      ...(subcategoria && { subcategoria }),
      ...(orden != null && { orden: Number(orden) }),
    })
    return NextResponse.json({ _id: doc._id, ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al crear plato' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await request.json()
    const { _id, nombre, descripcion, precio, categoria, subcategoria, orden } = body
    if (!_id) return NextResponse.json({ error: 'Falta _id' }, { status: 400 })
    const patch: Record<string, unknown> = {}
    if (nombre !== undefined) patch.nombre = nombre
    if (descripcion !== undefined) patch.descripcion = descripcion
    if (precio !== undefined) patch.precio = precio
    if (categoria !== undefined) patch.categoria = categoria
    if (subcategoria !== undefined) patch.subcategoria = subcategoria
    if (orden !== undefined) patch.orden = orden === '' ? undefined : Number(orden)
    await adminClient.patch(_id).set(patch).commit()
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al actualizar plato' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const { searchParams } = new URL(request.url)
    const _id = searchParams.get('_id')
    if (!_id) return NextResponse.json({ error: 'Falta _id' }, { status: 400 })
    await adminClient.delete(_id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al eliminar plato' }, { status: 500 })
  }
}
