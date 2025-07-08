"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "INICIO", href: "/" },
  { name: "IDENTIDAD", href: "/identidad" },
  { name: "AUTORIDADES", href: "/autoridades" },
  { name: "INFRAESTRUCTURA", href: "/infraestructura" },
  { name: "ACTIVIDADES", href: "/actividades" },
  { name: "NOTICIAS", href: "/noticias" },
  { name: "LA CASONA", href: "/la-casona" },
  { name: "SOCIOS", href: "/socios" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-club-yellow",
            pathname === item.href ? "text-club-yellow" : "text-white",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
