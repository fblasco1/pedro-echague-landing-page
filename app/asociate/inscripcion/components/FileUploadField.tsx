"use client"

import { useState } from "react"
import { Loader2, Upload, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type Props = {
  label: string
  accept?: string
  value?: string
  onUploaded: (fileUrl: string) => void
  error?: string
}

export function FileUploadField({
  label,
  accept = "image/jpeg,image/png,image/webp,application/pdf",
  value,
  onUploaded,
  error,
}: Props) {
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  async function handleChange(file: File | null) {
    if (!file) return
    setBusy(true)
    setLocalError(null)
    try {
      const body = new FormData()
      body.append("file", file)
      const res = await fetch("/api/inscripcion/upload", {
        method: "POST",
        body,
        credentials: "same-origin",
      })
      const raw = await res.text()
      let data: { error?: string; file_url?: string } = {}
      try {
        data = raw ? (JSON.parse(raw) as { error?: string; file_url?: string }) : {}
      } catch {
        throw new Error(
          res.status === 401 || res.status === 302
            ? "Sesión del preview expirada. Recargá la página."
            : "Respuesta inválida al subir. Probá de nuevo."
        )
      }
      if (!res.ok) {
        throw new Error(data.error || "Error al subir")
      }
      onUploaded(data.file_url as string)
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : "Error al subir")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-1.5">
      <Label className="font-roboto text-sm text-gray-700">{label}</Label>
      <label
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-gray-300 bg-white px-3 py-3 transition hover:border-club-blue",
          error || localError ? "border-red-400" : "",
          value ? "border-club-blue/40 bg-club-blue/5" : ""
        )}
      >
        <input
          type="file"
          className="hidden"
          accept={accept}
          disabled={busy}
          onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
        />
        {busy ? (
          <Loader2 className="h-5 w-5 animate-spin text-club-blue" />
        ) : value ? (
          <Check className="h-5 w-5 text-club-blue" />
        ) : (
          <Upload className="h-5 w-5 text-gray-400" />
        )}
        <span className="font-roboto text-sm text-gray-600">
          {busy ? "Subiendo…" : value ? "Archivo cargado" : "Elegir archivo (máx. 4 MB)"}
        </span>
      </label>
      {(error || localError) && (
        <p className="text-xs text-red-600 font-roboto">{error || localError}</p>
      )}
    </div>
  )
}
