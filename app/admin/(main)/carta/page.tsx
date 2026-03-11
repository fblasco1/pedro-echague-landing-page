'use client'

import { useEffect, useState } from 'react'

const CATEGORIAS: { value: string; label: string }[] = [
  { value: 'entrada', label: 'Entrada' },
  { value: 'principales', label: 'Principales' },
  { value: 'salsas', label: 'Salsas' },
  { value: 'bebidas', label: 'Bebidas' },
  { value: 'postres', label: 'Postres' },
  { value: 'cafeteria', label: 'Cafetería' },
  { value: 'menu_infantil', label: 'Menú Infantil' },
]

const SUBCATEGORIAS: Record<string, { value: string; label: string }[]> = {
  principales: [
    { value: 'pollo', label: 'Pollo' },
    { value: 'carnes', label: 'Carnes' },
    { value: 'pescados', label: 'Pescados' },
    { value: 'pastas', label: 'Pastas' },
  ],
  bebidas: [
    { value: 'sin_alcohol', label: 'Sin alcohol' },
    { value: 'tragos', label: 'Tragos' },
    { value: 'cervezas', label: 'Cervezas' },
    { value: 'vinos_tintos', label: 'Vinos tintos' },
    { value: 'vinos_blancos', label: 'Vinos blancos' },
    { value: 'espumantes', label: 'Espumantes' },
  ],
}

function getCategoriaLabel(v: string) {
  return CATEGORIAS.find((c) => c.value === v)?.label || v
}

function getSubcategoriaLabel(cat: string, v: string) {
  return SUBCATEGORIAS[cat]?.find((s) => s.value === v)?.label || v
}

type PlatoRow = {
  _id: string
  nombre: string
  descripcion?: string
  precio?: string
  categoria: string
  subcategoria?: string
  orden?: number
}

export default function AdminCartaPage() {
  const [list, setList] = useState<PlatoRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [modal, setModal] = useState<'new' | PlatoRow | null>(null)
  const [form, setForm] = useState<Partial<PlatoRow>>({ nombre: '', descripcion: '', precio: '', categoria: 'entrada', orden: 0 })

  const load = () => {
    fetch('/api/admin/carta')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error)
        else setList(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Error al cargar'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  function openNew() {
    setForm({ nombre: '', descripcion: '', precio: '', categoria: 'entrada', orden: list.length })
    setModal('new')
  }

  function openEdit(plato: PlatoRow) {
    setForm({ ...plato })
    setModal(plato)
  }

  async function submit() {
    if (!form.nombre?.trim() || !form.categoria) return
    setError('')
    if (modal === 'new') {
      try {
        const res = await fetch('/api/admin/carta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error al crear')
        setModal(null)
        load()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error')
      }
    } else if (modal && '_id' in modal) {
      setSaving(modal._id)
      try {
        const res = await fetch('/api/admin/carta', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error al guardar')
        setModal(null)
        load()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error')
      } finally {
        setSaving(null)
      }
    }
  }

  async function remove(plato: PlatoRow) {
    if (!confirm(`¿Eliminar "${plato.nombre}"?`)) return
    setError('')
    try {
      const res = await fetch(`/api/admin/carta?_id=${encodeURIComponent(plato._id)}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al eliminar')
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    }
  }

  const byCategory = list.reduce<Record<string, PlatoRow[]>>((acc, p) => {
    const key = p.subcategoria ? `${p.categoria}:${p.subcategoria}` : p.categoria
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {})

  const categoryOrder = ['entrada', 'principales', 'salsas', 'bebidas', 'postres', 'cafeteria', 'menu_infantil']
  const subOrder: Record<string, string[]> = {
    principales: ['pollo', 'carnes', 'pescados', 'pastas'],
    bebidas: ['sin_alcohol', 'tragos', 'cervezas', 'vinos_tintos', 'vinos_blancos', 'espumantes'],
  }

  if (loading) return <p className="text-gray-600">Cargando...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-club-dark mb-6">Carta digital - La Casona</h1>
      <p className="text-gray-600 mb-6">Platos agrupados por categoría. Agregá o editá platos para la carta en /la-casona/carta.</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button
        type="button"
        onClick={openNew}
        className="mb-6 bg-club-blue text-white px-4 py-2 rounded hover:bg-club-blue/90"
      >
        + Agregar plato
      </button>

      <div className="space-y-8">
        {categoryOrder.map((cat) => {
          const hasSub = subOrder[cat]
          if (hasSub) {
            return (
              <div key={cat}>
                <h2 className="text-xl font-bold text-club-blue mb-4">{getCategoriaLabel(cat)}</h2>
                {(subOrder[cat] || []).map((sub) => {
                  const key = `${cat}:${sub}`
                  const items = byCategory[key] || []
                  return (
                    <div key={key} className="mb-6">
                      <h3 className="text-lg font-medium text-gray-700 mb-2">{getSubcategoriaLabel(cat, sub)}</h3>
                      <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 text-left">Nombre</th>
                              <th className="py-2 px-4 text-left">Descripción</th>
                              <th className="py-2 px-4 text-left">Precio</th>
                              <th className="py-2 px-4 w-32">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((p) => (
                              <tr key={p._id} className="border-t">
                                <td className="py-2 px-4 font-medium">{p.nombre}</td>
                                <td className="py-2 px-4 text-gray-600 text-sm">{p.descripcion || '-'}</td>
                                <td className="py-2 px-4">{p.precio || '-'}</td>
                                <td className="py-2 px-4">
                                  <button type="button" onClick={() => openEdit(p)} className="text-club-blue mr-2">Editar</button>
                                  <button type="button" onClick={() => remove(p)} className="text-red-600">Eliminar</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {items.length === 0 && (
                          <p className="py-4 px-4 text-gray-500 text-sm">Sin platos en esta subcategoría.</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }
          const items = byCategory[cat] || []
          return (
            <div key={cat}>
              <h2 className="text-xl font-bold text-club-blue mb-4">{getCategoriaLabel(cat)}</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 text-left">Nombre</th>
                      <th className="py-2 px-4 text-left">Descripción</th>
                      <th className="py-2 px-4 text-left">Precio</th>
                      <th className="py-2 px-4 w-32">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p) => (
                      <tr key={p._id} className="border-t">
                        <td className="py-2 px-4 font-medium">{p.nombre}</td>
                        <td className="py-2 px-4 text-gray-600 text-sm">{p.descripcion || '-'}</td>
                        <td className="py-2 px-4">{p.precio || '-'}</td>
                        <td className="py-2 px-4">
                          <button type="button" onClick={() => openEdit(p)} className="text-club-blue mr-2">Editar</button>
                          <button type="button" onClick={() => remove(p)} className="text-red-600">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {items.length === 0 && <p className="py-4 px-4 text-gray-500 text-sm">Sin platos en esta categoría.</p>}
              </div>
            </div>
          )
        })}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">{modal === 'new' ? 'Nuevo plato' : 'Editar plato'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={form.nombre || ''}
                  onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={2}
                  value={form.descripcion || ''}
                  onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={form.precio || ''}
                  onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value }))}
                  placeholder="Ej: $ 1.200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={form.categoria || 'entrada'}
                  onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value, subcategoria: undefined }))}
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              {(form.categoria === 'principales' || form.categoria === 'bebidas') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={form.subcategoria || ''}
                    onChange={(e) => setForm((f) => ({ ...f, subcategoria: e.target.value || undefined }))}
                  >
                    <option value="">— Sin subcategoría —</option>
                    {(SUBCATEGORIAS[form.categoria || ''] || []).map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={form.orden ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, orden: e.target.value === '' ? undefined : parseInt(e.target.value, 10) }))}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={submit}
                disabled={saving !== null}
                className="bg-club-blue text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {modal === 'new' ? 'Crear' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="border border-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
