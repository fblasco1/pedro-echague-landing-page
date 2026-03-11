'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import type { Actividad } from '@/app/types/Actividad'

export function ConditionalHeader({ actividades }: { actividades: Actividad[] }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <Header actividades={actividades} />
}
