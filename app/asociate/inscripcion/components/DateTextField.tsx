"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/** YYYY-MM-DD → DD/MM/AAAA */
export function isoToDisplay(iso: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return ""
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}

/** Acepta DD/MM/AAAA o YYYY-MM-DD → YYYY-MM-DD ("" vacío, null inválida). */
export function displayToIso(raw: string): string | null {
  const s = raw.trim()
  if (!s) return ""
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return isValidIso(s) ? s : null
  }
  const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/)
  if (!m) return null
  const dd = m[1].padStart(2, "0")
  const mm = m[2].padStart(2, "0")
  const yyyy = m[3]
  const iso = `${yyyy}-${mm}-${dd}`
  return isValidIso(iso) ? iso : null
}

function isValidIso(iso: string): boolean {
  const [y, m, d] = iso.split("-").map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
}

/** Máscara liviana: solo dígitos → inserta / al tipear. */
function maskTyping(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

type Props = {
  value: string
  onChange: (iso: string) => void
  onBlur?: () => void
  id?: string
  "aria-invalid"?: boolean
  className?: string
}

/**
 * Un solo campo: se tipea DD/MM/AAAA y el ícono abre el calendario nativo.
 */
export function DateTextField({ value, onChange, onBlur, id, className, ...aria }: Props) {
  const autoId = useId()
  const fieldId = id || autoId
  const pickerRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState(() => isoToDisplay(value))

  useEffect(() => {
    setText(isoToDisplay(value))
  }, [value])

  const commitText = (raw: string) => {
    const iso = displayToIso(raw)
    if (iso === null) {
      onChange("")
      return
    }
    onChange(iso)
    setText(iso ? isoToDisplay(iso) : "")
  }

  const openPicker = () => {
    const el = pickerRef.current
    if (!el) return
    try {
      if (typeof el.showPicker === "function") {
        el.showPicker()
        return
      }
    } catch {
      /* algunos browsers bloquean showPicker sin gesto directo */
    }
    el.click()
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        id={fieldId}
        type="text"
        inputMode="numeric"
        autoComplete="bday"
        placeholder="DD/MM/AAAA"
        value={text}
        aria-invalid={aria["aria-invalid"]}
        onChange={(e) => {
          const next = maskTyping(e.target.value)
          setText(next)
          if (next.length === 10) {
            const iso = displayToIso(next)
            if (iso) onChange(iso)
          }
        }}
        onBlur={() => {
          commitText(text)
          onBlur?.()
        }}
        className="pr-11"
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label="Abrir calendario"
        title="Abrir calendario"
        onClick={openPicker}
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-500 hover:text-club-blue"
      >
        <Calendar className="h-4 w-4" aria-hidden />
      </button>
      {/* Calendario nativo oculto: lo dispara el ícono */}
      <input
        ref={pickerRef}
        type="date"
        tabIndex={-1}
        aria-hidden
        value={value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ""}
        onChange={(e) => {
          const iso = e.target.value
          onChange(iso)
          setText(isoToDisplay(iso))
        }}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
    </div>
  )
}
