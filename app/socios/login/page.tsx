"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

function SocioLoginForm() {
  const [usr, setUsr] = useState("")
  const [pwd, setPwd] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams?.get("from") || "/socios"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/socios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usr, pwd }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setError(data.error || "Usuario o contraseña incorrectos.")
        return
      }
      router.push(from.startsWith("/") ? from : "/socios")
      router.refresh()
    } catch {
      setError("No se pudo iniciar sesión. Probá de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <Image src="/logo.svg" alt="Club Pedro Echagüe" width={44} height={44} />
        <div>
          <p className="font-raleway text-[11px] font-bold uppercase tracking-wide text-slate-700">
            Club Pedro Echagüe
          </p>
          <p className="text-xs text-slate-400">Portal del socio</p>
        </div>
      </div>
      <h1 className="font-raleway text-2xl font-bold text-slate-800 mb-2">Ingresá</h1>
      <p className="text-sm text-slate-500 mb-6">
        Usá tu email o DNI y la contraseña de tu usuario del club.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="usr" className="text-slate-400 text-xs uppercase tracking-wide">
            Email o DNI
          </label>
          <input
            id="usr"
            type="text"
            autoComplete="username"
            value={usr}
            onChange={(e) => setUsr(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-club-blue/30 focus:border-club-blue"
            required
          />
        </div>
        <div>
          <label htmlFor="pwd" className="text-slate-400 text-xs uppercase tracking-wide">
            Contraseña
          </label>
          <input
            id="pwd"
            type="password"
            autoComplete="current-password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-club-blue/30 focus:border-club-blue"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-club-blue text-white py-3 font-raleway font-bold hover:bg-club-blue/90 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-500">
        ¿Todavía no sos socio?{" "}
        <Link href="/asociate" className="text-club-blue font-semibold hover:underline">
          Asociate
        </Link>
      </p>
    </div>
  )
}

export default function SocioLoginPage() {
  return (
    <main className="min-h-screen bg-[#F0F3F7] flex items-center justify-center px-4 py-16">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white rounded-xl shadow p-8 animate-pulse h-72" />
        }
      >
        <SocioLoginForm />
      </Suspense>
    </main>
  )
}
