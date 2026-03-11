'use client'

import { useEffect, useState } from 'react'

type CuotaRow = { _id: string; categoria: string; valor: string; condicion: string; vigenteDesde: string | null }

export default function AdminCuotaPage() {
  const [list, setList] = useState<CuotaRow[]>([])
  const [fechaVigente, setFechaVigente] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [savingFecha, setSavingFecha] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/cuota')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          const arr = Array.isArray(data) ? data : []
          setList(arr)
          if (arr.length > 0 && arr[0].vigenteDesde) {
            setFechaVigente(arr[0].vigenteDesde.slice(0, 10))
          }
        }
      })
      .catch(() => setError('Error al cargar'))
      .finally(() => setLoading(false))
  }, [])

  function handleChange(_id: string, field: 'categoria' | 'valor' | 'condicion', value: string) {
    setList((prev) =>
      prev.map((row) => (row._id === _id ? { ...row, [field]: value } : row))
    )
  }

  async function saveFechaVigente() {
    setSavingFecha(true)
    setError('')
    try {
      const res = await fetch('/api/admin/cuota', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vigenteDesde: fechaVigente || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al guardar')
      setList((prev) => prev.map((r) => ({ ...r, vigenteDesde: fechaVigente || null })))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al guardar fecha')
    } finally {
      setSavingFecha(false)
    }
  }

  async function save(row: CuotaRow) {
    setSaving(row._id)
    setError('')
    try {
      const res = await fetch('/api/admin/cuota', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: row._id,
          categoria: row.categoria,
          valor: row.valor,
          condicion: row.condicion,
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
      <h1 className="text-2xl font-bold text-club-dark mb-6">Cuota social</h1>

      {/* Fecha vigente única para todas las categorías */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow border border-gray-200">
        <h2 className="text-lg font-semibold text-club-dark mb-2">Fecha de vigencia</h2>
        <p className="text-sm text-gray-600 mb-3">Aplica a todas las categorías. Se muestra en la página de valores de cuota.</p>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            className="border border-gray-300 rounded px-3 py-2"
            value={fechaVigente}
            onChange={(e) => setFechaVigente(e.target.value)}
          />
          <button
            type="button"
            onClick={saveFechaVigente}
            disabled={savingFecha}
            className="bg-club-blue text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {savingFecha ? 'Guardando...' : 'Guardar fecha vigente'}
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-6">Editá los valores por categoría y guardá fila por fila.</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-club-blue text-white">
            <tr>
              <th className="py-3 px-4 text-left">Categoría</th>
              <th className="py-3 px-4 text-left">Valor</th>
              <th className="py-3 px-4 text-left">Condición</th>
              <th className="py-3 px-4 w-24">Acción</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-4">
                  <input
                    className="w-full border border-gray-200 rounded px-2 py-1"
                    value={row.categoria}
                    onChange={(e) => handleChange(row._id, 'categoria', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    className="w-full border border-gray-200 rounded px-2 py-1"
                    value={row.valor}
                    onChange={(e) => handleChange(row._id, 'valor', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    className="w-full border border-gray-200 rounded px-2 py-1"
                    value={row.condicion}
                    onChange={(e) => handleChange(row._id, 'condicion', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    type="button"
                    onClick={() => save(row)}
                    disabled={saving === row._id}
                    className="bg-club-blue text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    {saving === row._id ? 'Guardando...' : 'Guardar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
