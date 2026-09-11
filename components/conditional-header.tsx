'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import type { Actividad } from '@/app/types/Actividad'

function isPortalAutenticado(pathname: string | null): boolean {
  if (!pathname?.startsWith('/socios')) return false
  if (pathname.startsWith('/socios/cuota')) return false
  if (pathname.startsWith('/socios/beneficios')) return false
  // Login + área autenticada usan chrome propio del portal (sin header del sitio).
  return true
}

export function ConditionalHeader({ actividades }: { actividades: Actividad[] }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  if (isPortalAutenticado(pathname)) return null
  return <Header actividades={actividades} />
}
