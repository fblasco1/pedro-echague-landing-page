'use client'

import { useEffect, useState } from 'react'

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

type ActividadRow = {
  _id: string
  title: string
  slug: string
  horarios: HorarioItem[]
  arancelPorPeriodicidad?: ArancelPeriodicidadItem[]
}

export default function AdminActividadesPage() {
  const [list, setList] = useState<ActividadRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/actividades')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error)
        else setList(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Error al cargar'))
      .finally(() => setLoading(false))
  }, [])

  function updateHorario(actividadId: string, index: number, field: keyof HorarioItem, value: string) {
    setList((prev) =>
      prev.map((a) => {
        if (a._id !== actividadId || !a.horarios) return a
        const horarios = [...a.horarios]
        horarios[index] = { ...horarios[index], [field]: value }
        return { ...a, horarios }
      })
    )
  }

  function updateArancelPeriodicidad(actividadId: string, index: number, field: 'periodicidad' | 'valor', value: string) {
    setList((prev) =>
      prev.map((a) => {
        if (a._id !== actividadId) return a
        const arr = [...(a.arancelPorPeriodicidad || [])]
        arr[index] = { ...arr[index], [field]: value }
        return { ...a, arancelPorPeriodicidad: arr }
      })
    )
  }

  function addArancelPeriodicidad(actividadId: string) {
    setList((prev) =>
      prev.map((a) => {
        if (a._id !== actividadId) return a
        const arr = [...(a.arancelPorPeriodicidad || []), { periodicidad: '', valor: '' }]
        return { ...a, arancelPorPeriodicidad: arr }
      })
    )
  }

  function removeArancelPeriodicidad(actividadId: string, index: number) {
    setList((prev) =>
      prev.map((a) => {
        if (a._id !== actividadId || !a.arancelPorPeriodicidad) return a
        const arr = a.arancelPorPeriodicidad.filter((_, i) => i !== index)
        return { ...a, arancelPorPeriodicidad: arr }
      })
    )
  }

  async function save(actividad: ActividadRow) {
    setSaving(actividad._id)
    setError('')
    try {
      const res = await fetch('/api/admin/actividades', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: actividad._id,
          horarios: actividad.horarios,
          arancelPorPeriodicidad: actividad.arancelPorPeriodicidad ?? [],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al guardar')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al guardar')
    } finally {
      setSaving(null)
    }
  }

  if (loading) return <p className="text-gray-600">Cargando...</p>
  if (error && list.length === 0) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-club-dark mb-6">Aranceles y horarios por actividad</h1>
      <p className="text-gray-600 mb-6">Expandí una actividad. Para GAP, Crossfit, Funcional, Yoga, etc. usá <strong>Días y horarios</strong> + <strong>Arancel por periodicidad</strong>. Guardá al terminar.</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="space-y-2">
        {list.map((act) => (
          <div key={act._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded(expanded === act._id ? null : act._id)}
              className="w-full flex items-center justify-between py-3 px-4 text-left font-medium text-club-dark hover:bg-gray-50"
            >
              <span>{act.title}</span>
              <span className="text-gray-500">{expanded === act._id ? '▼' : '▶'}</span>
            </button>
            {expanded === act._id && (
              <div className="border-t border-gray-100 p-4 space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-club-blue mb-2">Días y horarios</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-club-blue text-white">
                        <tr>
                          <th className="py-2 px-2 text-left">Categoría</th>
                          <th className="py-2 px-2 text-left">Tira</th>
                          <th className="py-2 px-2 text-left">Género</th>
                          <th className="py-2 px-2 text-left">Días y horarios</th>
                          <th className="py-2 px-2 text-left">Arancel</th>
                          <th className="py-2 px-2 text-left">A. Socio</th>
                          <th className="py-2 px-2 text-left">A. No socio</th>
                          <th className="py-2 px-2 text-left">A. por clases</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(act.horarios || []).map((h, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="py-1 px-2">
                              <input
                                className="w-28 border border-gray-200 rounded px-1"
                                value={h.category || ''}
                                onChange={(e) => updateHorario(act._id, i, 'category', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-24 border border-gray-200 rounded px-1"
                                value={h.tira || ''}
                                onChange={(e) => updateHorario(act._id, i, 'tira', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-20 border border-gray-200 rounded px-1"
                                value={h.genero || ''}
                                onChange={(e) => updateHorario(act._id, i, 'genero', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-36 border border-gray-200 rounded px-1"
                                value={h.days || ''}
                                onChange={(e) => updateHorario(act._id, i, 'days', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-24 border border-gray-200 rounded px-1"
                                value={h.fee || h.arancel || ''}
                                onChange={(e) => updateHorario(act._id, i, 'fee', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-24 border border-gray-200 rounded px-1"
                                value={h.arancelSocio || ''}
                                onChange={(e) => updateHorario(act._id, i, 'arancelSocio', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-24 border border-gray-200 rounded px-1"
                                value={h.arancelNoSocio || ''}
                                onChange={(e) => updateHorario(act._id, i, 'arancelNoSocio', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-24 border border-gray-200 rounded px-1"
                                value={h.arancelPorClases || ''}
                                onChange={(e) => updateHorario(act._id, i, 'arancelPorClases', e.target.value)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-club-blue mb-2">Arancel por periodicidad</h3>
                  <p className="text-xs text-gray-600 mb-2">Para GAP, Crossfit, Funcional, Yoga, etc. Si cargás acá, en la web se muestran dos tablas: Días y horarios + Valores del arancel.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="py-2 px-2 text-left">Periodicidad</th>
                          <th className="py-2 px-2 text-left">Valor</th>
                          <th className="py-2 px-2 w-20"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(act.arancelPorPeriodicidad || []).map((item, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="py-1 px-2">
                              <input
                                className="w-full min-w-[160px] border border-gray-200 rounded px-2 py-1"
                                placeholder="Ej: 1 vez por semana"
                                value={item.periodicidad}
                                onChange={(e) => updateArancelPeriodicidad(act._id, i, 'periodicidad', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <input
                                className="w-full min-w-[100px] border border-gray-200 rounded px-2 py-1"
                                placeholder="Ej: $ 5.000"
                                value={item.valor}
                                onChange={(e) => updateArancelPeriodicidad(act._id, i, 'valor', e.target.value)}
                              />
                            </td>
                            <td className="py-1 px-2">
                              <button
                                type="button"
                                onClick={() => removeArancelPeriodicidad(act._id, i)}
                                className="text-red-600 text-xs"
                              >
                                Quitar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => addArancelPeriodicidad(act._id)}
                    className="mt-2 text-sm text-club-blue hover:underline"
                  >
                    + Agregar fila de periodicidad
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => save(act)}
                    disabled={saving === act._id}
                    className="bg-club-blue text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    {saving === act._id ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
