"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PortalCard } from "@/components/portal/PortalShell"

export type PerfilSocio = {
  numero_socio?: number | null
  nombre?: string | null
  apellido?: string | null
  dni?: string | null
  nacionalidad?: string | null
  fecha_nacimiento?: string | null
  genero?: string | null
  email?: string | null
  telefono_fijo?: string | null
  telefono_movil?: string | null
  calle?: string | null
  numero?: string | null
  piso?: string | null
  departamento?: string | null
  provincia?: string | null
  ciudad?: string | null
  localidad_barrio?: string | null
  codigo_postal?: string | null
  estado?: string | null
  categoria?: string | null
  actividad?: string | null
  fecha_ingreso?: string | null
  fecha_alta?: string | null
  tiene_foto?: boolean
}

type EditableForm = {
  nombre: string
  apellido: string
  nacionalidad: string
  fecha_nacimiento: string
  genero: string
  telefono_fijo: string
  telefono_movil: string
  calle: string
  numero: string
  piso: string
  departamento: string
  provincia: string
  ciudad: string
  localidad_barrio: string
  codigo_postal: string
}

const GENERO_OPTIONS = ["Masculino", "Femenino", "Otro", "Prefiero no decir"] as const

function loginRedirect() {
  return `/socios/login?from=${encodeURIComponent("/socios/perfil")}`
}

function formatDate(value?: string | null): string {
  if (!value) return "—"
  const d = value.slice(0, 10)
  const [y, m, day] = d.split("-")
  if (y && m && day) return `${day}/${m}/${y}`
  return value
}

function display(value?: string | number | null): string {
  if (value === null || value === undefined || value === "") return "—"
  return String(value)
}

function toForm(p: PerfilSocio): EditableForm {
  return {
    nombre: p.nombre || "",
    apellido: p.apellido || "",
    nacionalidad: p.nacionalidad || "",
    fecha_nacimiento: (p.fecha_nacimiento || "").slice(0, 10),
    genero: p.genero || "",
    telefono_fijo: p.telefono_fijo || "",
    telefono_movil: p.telefono_movil || "",
    calle: p.calle || "",
    numero: p.numero || "",
    piso: p.piso || "",
    departamento: p.departamento || "",
    provincia: p.provincia || "",
    ciudad: p.ciudad || "",
    localidad_barrio: p.localidad_barrio || "",
    codigo_postal: p.codigo_postal || "",
  }
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-400 text-xs uppercase tracking-wide">{label}</p>
      <p className="font-medium text-slate-800 mt-0.5">{value}</p>
    </div>
  )
}

function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  id: keyof EditableForm
  label: string
  value: string
  onChange: (id: keyof EditableForm, value: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="text-slate-400 text-xs uppercase tracking-wide">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-club-blue/30 focus:border-club-blue"
      />
    </div>
  )
}

export function PerfilSocioView() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [saveError, setSaveError] = useState("")
  const [okMsg, setOkMsg] = useState("")
  const [perfil, setPerfil] = useState<PerfilSocio | null>(null)
  const [form, setForm] = useState<EditableForm | null>(null)
  const [fotoBroken, setFotoBroken] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const res = await fetch("/api/socios/perfil")
      if (res.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (res.status === 403) {
        setError("No tenés acceso al portal de socio.")
        setLoading(false)
        return
      }
      if (!res.ok) {
        setError("No se pudo cargar tu perfil.")
        setLoading(false)
        return
      }
      const data = (await res.json()) as PerfilSocio
      if (cancelled) return
      setPerfil(data)
      setForm(toForm(data))
      setLoading(false)
    }
    load().catch(() => {
      if (!cancelled) {
        setError("No se pudo cargar tu perfil.")
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [router])

  function setField(id: keyof EditableForm, value: string) {
    setForm((prev) => (prev ? { ...prev, [id]: value } : prev))
    setOkMsg("")
    setSaveError("")
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setSaveError("")
    setOkMsg("")
    try {
      const res = await fetch("/api/socios/perfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as PerfilSocio & { error?: string }
      if (res.status === 401) {
        router.replace(loginRedirect())
        return
      }
      if (!res.ok) {
        setSaveError(data.error || "No se pudo guardar.")
        return
      }
      setPerfil(data)
      setForm(toForm(data))
      setOkMsg("Datos actualizados.")
    } catch {
      setSaveError("No se pudo guardar. Probá de nuevo.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="h-64 rounded-xl bg-white/70 animate-pulse" />
  }

  if (error || !perfil || !form) {
    return (
      <div className="space-y-3">
        <p className="text-red-600">{error || "No se pudo cargar el perfil."}</p>
        <Link href="/socios/login" className="text-club-blue font-medium hover:underline">
          Ir al login
        </Link>
      </div>
    )
  }

  const nombreCompleto = [perfil.nombre, perfil.apellido].filter(Boolean).join(" ") || "Socio"
  const nro =
    perfil.numero_socio != null ? String(perfil.numero_socio).padStart(5, "0") : "—"

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-raleway text-3xl font-bold text-slate-800">Mis datos</h1>
        <p className="text-slate-500 mt-1">
          Socio #{nro} — actualizá tu información de contacto y domicilio
        </p>
      </header>

      <PortalCard>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="shrink-0">
            <div className="h-36 w-36 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              {perfil.tiene_foto && !fotoBroken ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/api/socios/foto"
                  alt={`Foto de perfil de ${nombreCompleto}`}
                  className="h-full w-full object-cover"
                  onError={() => setFotoBroken(true)}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-slate-400 p-2 text-center">
                  Sin foto 4×4
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">Foto 4×4</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <ReadOnly label="Nº de socio" value={nro} />
            <ReadOnly label="Estado" value={display(perfil.estado)} />
            <ReadOnly label="Categoría" value={display(perfil.categoria)} />
            <ReadOnly label="Actividad" value={display(perfil.actividad)} />
            <ReadOnly label="DNI" value={display(perfil.dni)} />
            <ReadOnly label="Email" value={display(perfil.email)} />
            <ReadOnly label="Fecha de ingreso" value={formatDate(perfil.fecha_ingreso)} />
            <ReadOnly label="Fecha de alta" value={formatDate(perfil.fecha_alta)} />
          </div>
        </div>
      </PortalCard>

      <form onSubmit={guardar} className="space-y-4">
        <PortalCard title="Datos personales">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField id="nombre" label="Nombre" value={form.nombre} onChange={setField} required />
            <InputField id="apellido" label="Apellido" value={form.apellido} onChange={setField} required />
            <InputField
              id="nacionalidad"
              label="Nacionalidad"
              value={form.nacionalidad}
              onChange={setField}
              required
            />
            <InputField
              id="fecha_nacimiento"
              label="Fecha de nacimiento"
              value={form.fecha_nacimiento}
              onChange={setField}
              type="date"
              required
            />
            <div>
              <label htmlFor="genero" className="text-slate-400 text-xs uppercase tracking-wide">
                Género
              </label>
              <select
                id="genero"
                name="genero"
                required
                value={form.genero}
                onChange={(e) => setField("genero", e.target.value)}
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-club-blue/30 focus:border-club-blue"
              >
                <option value="">Elegí una opción</option>
                {GENERO_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </PortalCard>

        <PortalCard title="Contacto">
          <p className="text-xs text-slate-400 mb-4">
            El email de login no se cambia acá; pedilo a Secretaría si hace falta.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="telefono_movil"
              label="Teléfono móvil"
              value={form.telefono_movil}
              onChange={setField}
              required
            />
            <InputField
              id="telefono_fijo"
              label="Teléfono fijo"
              value={form.telefono_fijo}
              onChange={setField}
            />
          </div>
        </PortalCard>

        <PortalCard title="Domicilio">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField id="calle" label="Calle" value={form.calle} onChange={setField} />
            <InputField id="numero" label="Número" value={form.numero} onChange={setField} />
            <InputField id="piso" label="Piso" value={form.piso} onChange={setField} />
            <InputField
              id="departamento"
              label="Departamento"
              value={form.departamento}
              onChange={setField}
            />
            <InputField
              id="localidad_barrio"
              label="Barrio / localidad"
              value={form.localidad_barrio}
              onChange={setField}
            />
            <InputField id="ciudad" label="Ciudad" value={form.ciudad} onChange={setField} />
            <InputField id="provincia" label="Provincia" value={form.provincia} onChange={setField} />
            <InputField
              id="codigo_postal"
              label="Código postal"
              value={form.codigo_postal}
              onChange={setField}
            />
          </div>
        </PortalCard>

        {saveError && <p className="text-sm text-red-600">{saveError}</p>}
        {okMsg && <p className="text-sm text-emerald-600 font-medium">{okMsg}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto rounded-lg bg-club-blue text-white px-8 py-3 font-raleway font-bold hover:bg-club-blue/90 disabled:opacity-50 transition-colors"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  )
}
