"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { MenuDesplegable } from "./menu-desplegable"

interface HeaderProps {
  actividades: { title: string; slug: { current: string } }[]
}

export function Header({ actividades }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showHeader, setShowHeader] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrolled = currentScrollY > 50

      // Determinar si el scroll es hacia arriba o hacia abajo
      if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba - mostrar header
        setShowHeader(true)
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        // Scroll hacia abajo y no estamos en la parte superior - ocultar header
        setShowHeader(false)
      }

      setScrolled(isScrolled)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <>
      {/* Header principal */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          !showHeader && scrolled ? "transform -translate-y-full" : "transform translate-y-0",
        )}
      >
        <div className="relative">
          {/* Barra superior con logo y navegación */}
          <div className="bg-transparent text-white">
            <div className="container mx-auto flex h-20 justify-between px-4 pt-4 items-start">
              {/* Logo */}
              <div className={cn("transition-opacity duration-300", scrolled ? "opacity-0" : "opacity-100")}>
                <Link href="/" className="block">
                  <Image src="/logo.svg" alt="Logo Club Pedro Echagüe" width={60} height={60} className="h-16 w-auto" />
                </Link>
              </div>

              {/* Navegación de escritorio */}
              <div
                className={cn(
                  "hidden md:flex flex-col items-end transition-all duration-300",
                  scrolled ? "gap-2 pt-3" : "gap-3 pt-2",
                )}
              >
                <Link
                  href="/asociate"
                  className={cn(
                    "text-lg font-bold tracking-wider hover:text-club-yellow transition-colors",
                    scrolled ? "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" : "",
                  )}
                >
                  ASOCIATE AHORA
                </Link>

                <Link
                  href="/la-casona"
                  className={cn(
                    "text-lg font-bold tracking-wider hover:text-club-yellow transition-colors",
                    scrolled ? "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" : "",
                  )}
                >
                  LA CASONA
                </Link>

                <button
                  onClick={() => setMenuOpen(true)}
                  className={cn(
                    "flex items-center gap-1 text-lg font-bold tracking-wider hover:text-club-yellow transition-colors",
                    scrolled ? "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" : "",
                  )}
                >
                  <span>+ MENÚ</span>
                </button>
              </div>

              {/* Botón de menú móvil */}
              <button className="md:hidden text-white" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
                <Menu className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú desplegable */}
      <MenuDesplegable isOpen={menuOpen} onClose={() => setMenuOpen(false)} actividades={actividades} />
    </>
  )
}
