"use client"

import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, label: "Tus datos" },
  { id: 2, label: "Tu familia" },
  { id: 3, label: "Listo" },
] as const

type Props = { current: 1 | 2 | 3 }

export function WizardStepper({ current }: Props) {
  return (
    <ol className="flex items-center justify-between gap-2 mb-8">
      {STEPS.map((step, idx) => {
        const done = current > step.id
        const active = current === step.id
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-raleway text-sm font-bold",
                  active && "bg-club-blue text-white",
                  done && "bg-club-yellow text-club-blue",
                  !active && !done && "bg-gray-200 text-gray-500"
                )}
              >
                {step.id}
              </span>
              <span
                className={cn(
                  "truncate font-raleway text-xs font-semibold uppercase tracking-wide",
                  active ? "text-club-blue" : "text-gray-500"
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={cn("h-px flex-1", done ? "bg-club-yellow" : "bg-gray-200")} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
