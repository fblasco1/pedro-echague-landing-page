"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const TABS = [
  { href: "/socios", label: "Inicio", match: (p: string) => p === "/socios" },
  {
    href: "/socios/perfil",
    label: "Mis datos",
    match: (p: string) => p.startsWith("/socios/perfil"),
  },
  {
    href: "/socios/actividades",
    label: "Actividades",
    match: (p: string) => p.startsWith("/socios/actividades"),
  },
  { href: "#", label: "Deudas", disabled: true, match: (_p: string) => false },
] as const

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ""
  const router = useRouter()

  async function salir() {
    await fetch("/api/socios/logout", { method: "POST" })
    router.replace("/socios/login")
  }

  return (
    <div className="min-h-screen bg-[#F0F3F7] font-roboto text-slate-800">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/socios" className="flex items-center gap-2.5 min-w-0">
            <Image
              src="/logo.svg"
              alt="Club Pedro Echagüe"
              width={36}
              height={36}
              className="shrink-0"
            />
            <div className="min-w-0 leading-tight">
              <p className="font-raleway text-[11px] font-bold uppercase tracking-wide text-slate-700 truncate">
                Club Pedro Echagüe
              </p>
              <p className="text-[10px] text-slate-400 hidden sm:block">Portal del socio</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 rounded-lg p-1">
            {TABS.map((tab) => {
              if ("disabled" in tab && tab.disabled) {
                return (
                  <span
                    key={tab.label}
                    className="px-3 py-1.5 text-sm text-slate-400 cursor-not-allowed rounded-md"
                    title="Próximamente"
                  >
                    {tab.label}
                  </span>
                )
              }
              const active = tab.match(pathname)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    active
                      ? "bg-white text-slate-900 shadow-sm font-medium"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={salir}
            aria-label="Cerrar sesión"
            className="h-9 w-9 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 flex items-center justify-center text-sm font-medium shrink-0"
            title="Salir"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
          </button>
        </div>

        <nav className="md:hidden border-t border-slate-100 px-2 py-2 flex gap-1 overflow-x-auto">
          {TABS.map((tab) => {
            if ("disabled" in tab && tab.disabled) {
              return (
                <span
                  key={tab.label}
                  className="px-3 py-1.5 text-xs whitespace-nowrap text-slate-400 rounded-md"
                >
                  {tab.label}
                </span>
              )
            }
            const active = tab.match(pathname)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-3 py-1.5 text-xs whitespace-nowrap rounded-md",
                  active ? "bg-slate-200 text-slate-900 font-medium" : "text-slate-600"
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 pb-16">{children}</main>
    </div>
  )
}

export function PortalCard({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-5",
        className
      )}
    >
      {title ? (
        <h2 className="text-sm font-semibold text-club-blue mb-3">{title}</h2>
      ) : null}
      {children}
    </section>
  )
}

export function StatusBadge({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "amber" | "slate" }) {
  const tones = {
    green: "bg-emerald-500 text-white",
    amber: "bg-amber-500 text-white",
    slate: "bg-slate-500 text-white",
  }
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", tones[tone])}>
      {children}
    </span>
  )
}
