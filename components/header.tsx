"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MenuDesplegable } from "./menu-desplegable"
import { Menu } from "lucide-react"

interface HeaderProps {
  actividades?: any[]
}

/** Fondos claros: el chrome debe ser claro para que el escudo (letras azules) se lea. */
function isLightSurfacePath(pathname: string): boolean {
  if (pathname.startsWith("/alquiler")) return true
  if (pathname.startsWith("/asociate/inscripcion")) return true
  if (pathname.startsWith("/socios/login")) return true
  return false
}

/** Héroes oscuros/foto: sobre el top se puede usar texto blanco con velo suave. */
function hasDarkHeroPath(pathname: string): boolean {
  if (pathname === "/") return true
  if (pathname.startsWith("/asociate") && !pathname.startsWith("/asociate/inscripcion")) return true
  if (pathname.startsWith("/infraestructura")) return true
  if (pathname.startsWith("/identidad")) return true
  if (pathname.startsWith("/autoridades")) return true
  if (pathname.startsWith("/actividades")) return true
  if (pathname.startsWith("/la-casona")) return true
  if (pathname.startsWith("/socios/cuota")) return true
  if (pathname.startsWith("/socios/beneficios")) return true
  return false
}

export function Header({ actividades = [] }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()
  const enAsociate = pathname.startsWith("/asociate")
  const enReservas = pathname.startsWith("/alquiler")
  const lightSurface = isLightSurfacePath(pathname)
  const darkHero = hasDarkHeroPath(pathname)

  // Chrome claro (sin azul): páginas claras, scroll, o sin hero oscuro.
  const lightChrome = lightSurface || isScrolled || !darkHero

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const navLinkClass = lightChrome
    ? "text-club-blue font-bold text-sm whitespace-nowrap hover:text-club-blue/70 transition-colors font-raleway"
    : "text-white font-bold text-sm whitespace-nowrap hover:text-club-yellow transition-colors font-raleway drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"

  const headerSurface = lightChrome
    ? "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm"
    : "bg-gradient-to-b from-black/50 via-black/25 to-transparent"

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${headerSurface}`}
      >
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0" aria-label="Inicio Club Pedro Echagüe">
            <Image
              src="/logo.svg"
              alt="Club Pedro Echagüe"
              width={48}
              height={48}
              className={
                lightChrome
                  ? "transition-all duration-300"
                  : "transition-all duration-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
              }
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-end gap-5 xl:gap-7">
            <Link href={enAsociate ? "/" : "/asociate"} className={navLinkClass}>
              {enAsociate ? "VOLVER AL INICIO" : "ASOCIATE AHORA"}
            </Link>
            <Link
              href="/alquiler"
              className={`${navLinkClass} ${
                enReservas
                  ? lightChrome
                    ? "underline underline-offset-4 decoration-2"
                    : "text-club-yellow"
                  : ""
              }`}
              aria-current={enReservas ? "page" : undefined}
            >
              RESERVA DE ESPACIOS
            </Link>
            <Link href="/la-casona" className={navLinkClass}>
              LA CASONA
            </Link>
            <button type="button" onClick={() => setShowMenu(true)} className={navLinkClass}>
              + MENÚ
            </button>
          </nav>

          <button
            type="button"
            className={`lg:hidden flex-shrink-0 ${
              lightChrome
                ? "text-club-blue"
                : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            }`}
            onClick={() => setShowMenu(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MenuDesplegable isOpen={showMenu} onClose={() => setShowMenu(false)} actividades={actividades} />
    </>
  )
}
