"use client"
import { useState } from "react"

export default function AsociatePage() {
  const [form, setForm] = useState({
    apellidos: "",
    nombre: "",
    dni: "",
    nacionalidad: "",
    fechaNacimiento: "",
    genero: "",
    calle: "",
    numero: "",
    piso: "",
    departamento: "",
    localidad: "",
    provincia: "",
    codigoPostal: "",
    telefono: "",
    email: "",
    ocupacion: "",
    colegio: "",
    exSocio: false,
    ultimoAnioSocio: "",
  })
  const [dniFrente, setDniFrente] = useState<File | null>(null)
  const [dniDorso, setDniDorso] = useState<File | null>(null)
  const [foto4x4, setFoto4x4] = useState<File | null>(null)
  const [dniPadreFrente, setDniPadreFrente] = useState<File | null>(null)
  const [dniPadreDorso, setDniPadreDorso] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Calcular si es menor de edad (menos de 18 años)
  const esMenorEdad = (() => {
    if (!form.fechaNacimiento) return false
    const hoy = new Date()
    const nacimiento = new Date(form.fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const m = hoy.getMonth() - nacimiento.getMonth()
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad < 18
  })()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    let fieldValue: string | boolean = value
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue
    }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void) {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, typeof value === "boolean" ? String(value) : value ?? "")
    })
    if (dniFrente) formData.append("dniFrente", dniFrente)
    if (dniDorso) formData.append("dniDorso", dniDorso)
    if (foto4x4) formData.append("foto4x4", foto4x4)
    if (dniPadreFrente) formData.append("dniPadreFrente", dniPadreFrente)
    if (dniPadreDorso) formData.append("dniPadreDorso", dniPadreDorso)

    try {
      const res = await fetch("/api/asociate-form", {
        method: "POST",
        body: formData
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        alert("Error al enviar la solicitud: " + (data.error || "Error desconocido"))
      }
    } catch (err) {
      alert("Error de red al enviar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-club-blue mb-6 text-center">Asociate al Club</h1>
        {loading ? (
          <div className="text-center text-club-blue font-semibold text-lg py-12">Enviando solicitud, por favor espere...</div>
        ) : submitted ? (
          <div className="text-center text-green-600 font-semibold">
            ¡Gracias por tu interés en asociarte! Nos pondremos en contacto pronto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input type="text" id="apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                <input type="text" id="dni" name="dni" value={form.dni} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="nacionalidad" className="block text-sm font-medium text-gray-700 mb-1">Nacionalidad</label>
                <input type="text" id="nacionalidad" name="nacionalidad" value={form.nacionalidad} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                <select id="genero" name="genero" value={form.genero} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue">
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="X">X</option>
                </select>
              </div>
              <div>
                <label htmlFor="calle" className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
                <input type="text" id="calle" name="calle" value={form.calle} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input type="text" id="numero" name="numero" value={form.numero} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="piso" className="block text-sm font-medium text-gray-700 mb-1">Piso</label>
                <input type="text" id="piso" name="piso" value={form.piso} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <input type="text" id="departamento" name="departamento" value={form.departamento} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="localidad" className="block text-sm font-medium text-gray-700 mb-1">Localidad/Barrio</label>
                <input type="text" id="localidad" name="localidad" value={form.localidad} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                <input type="text" id="provincia" name="provincia" value={form.provincia} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                <input type="text" id="codigoPostal" name="codigoPostal" value={form.codigoPostal} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono/Celular</label>
                <input type="text" id="telefono" name="telefono" value={form.telefono} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="ocupacion" className="block text-sm font-medium text-gray-700 mb-1">Ocupación</label>
                <input type="text" id="ocupacion" name="ocupacion" value={form.ocupacion} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div>
                <label htmlFor="colegio" className="block text-sm font-medium text-gray-700 mb-1">Colegio/Universidad (si es estudiante)</label>
                <input type="text" id="colegio" name="colegio" value={form.colegio} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <input type="checkbox" id="exSocio" name="exSocio" checked={form.exSocio} onChange={handleChange} />
                <label htmlFor="exSocio" className="text-sm font-medium text-gray-700">¿Fue socio alguna vez del club?</label>
                {form.exSocio && (
                  <input type="text" id="ultimoAnioSocio" name="ultimoAnioSocio" value={form.ultimoAnioSocio} onChange={handleChange} placeholder="Último año que fue socio" className="ml-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-club-blue" />
                )}
              </div>
              {/* El campo menorEdad ahora se calcula automáticamente */}
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-gray-700">{esMenorEdad ? "El solicitante es menor de edad" : "El solicitante es mayor de edad"}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto DNI Frente (solicitante)</label>
                <input type="file" accept="image/*" onChange={e => handleFileChange(e, setDniFrente)} required className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto DNI Dorso (solicitante)</label>
                <input type="file" accept="image/*" onChange={e => handleFileChange(e, setDniDorso)} required className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto 4x4 (solicitante)</label>
                <input type="file" accept="image/*" onChange={e => handleFileChange(e, setFoto4x4)} required className="w-full" />
              </div>
              {esMenorEdad && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto DNI Frente (padre/madre/tutor)</label>
                    <input type="file" accept="image/*" onChange={e => handleFileChange(e, setDniPadreFrente)} required={esMenorEdad} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto DNI Dorso (padre/madre/tutor)</label>
                    <input type="file" accept="image/*" onChange={e => handleFileChange(e, setDniPadreDorso)} required={esMenorEdad} className="w-full" />
                  </div>
                </>
              )}
            </div>
            <button type="submit" className="w-full bg-club-blue text-white py-2 rounded font-bold hover:bg-club-blue/90 transition-colors">Enviar solicitud</button>
          </form>
        )}
      </div>
    </div>
  )
}