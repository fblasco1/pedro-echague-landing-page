"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuDesplegable } from "./menu-desplegable"
import { Menu } from "lucide-react"

interface HeaderProps {
  actividades?: any[]
}

export function Header({ actividades = [] }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent h-20 pt-4">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Club Pedro Echagüe"
              width={50}
              height={50}
              className={`transition-all duration-300 ${isScrolled ? "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" : ""}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-col items-end gap-2 transition-all duration-300">
            <div className="flex flex-col items-end gap-1 pt-2">
              <Link
                href="/asociate"
                className={`text-white font-bold text-sm hover:text-club-yellow transition-colors font-raleway ${
                  isScrolled ? "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" : ""
                }`}
              >
                ASOCIATE AHORA
              </Link>
              <Link
                href="/la-casona"
                className={`text-white font-bold text-sm hover:text-club-yellow transition-colors font-raleway ${
                  isScrolled ? "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" : ""
                }`}
              >
                LA CASONA
              </Link>
              <button
                onClick={() => setShowMenu(true)}
                className={`text-white font-bold text-sm hover:text-club-yellow transition-colors font-raleway ${
                  isScrolled ? "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" : ""
                }`}
              >
                + MENÚ
              </button>
            </div>
          </nav>

          {/* Mobile Navigation: solo botón */}
          <button
            className="lg:hidden text-white"
            onClick={() => setShowMenu(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Menu Desplegable */}
      <MenuDesplegable isOpen={showMenu} onClose={() => setShowMenu(false)} actividades={actividades} />
    </>
  )
}
