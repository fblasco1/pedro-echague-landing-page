"use client"

import { usePathname } from "next/navigation"
import { PortalShell } from "@/components/portal/PortalShell"

const PUBLIC_SOCIOS = ["/socios/login", "/socios/cuota", "/socios/beneficios"]

export function SociosAppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ""
  const isPublic = PUBLIC_SOCIOS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
  if (isPublic) return <>{children}</>
  return <PortalShell>{children}</PortalShell>
}
