"use client"

import Link from "next/link"

export function MainNav() {
  return (
    <div className="flex h-16 items-center space-x-4 sm:space-x-6 md:space-x-10 px-4">
      <Link href="/" className="font-bold text-club-blue">
        Club Pedro Echague
      </Link>
      <Link href="/identidad" className="text-sm font-medium text-club-blue hover:underline underline-offset-4">
        Identidad
      </Link>
      <Link href="/actividades" className="text-sm font-medium text-club-blue hover:underline underline-offset-4">
        Actividades
      </Link>
      <Link href="/infraestructura" className="text-sm font-medium text-club-blue hover:underline underline-offset-4">
        Infraestructura
      </Link>
      <Link href="/noticias" className="text-sm font-medium text-club-blue hover:underline underline-offset-4">
        Noticias
      </Link>
      <Link href="/socios/cuota" className="text-sm font-medium text-club-blue hover:underline underline-offset-4">
        Socios
      </Link>
      <Link href="/autoridades" className="text-sm font-medium text-club-blue hover:underline underline-offset-4">
        Autoridades
      </Link>
    </div>
  )
}
