"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuDesplegable } from "./menu-desplegable"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
                href="/socios"
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

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-club-blue text-white">
              <nav className="flex flex-col space-y-6 mt-8">
                <Link href="/" className="text-lg font-semibold hover:text-club-yellow transition-colors">
                  INICIO
                </Link>
                <Link href="/identidad" className="text-lg font-semibold hover:text-club-yellow transition-colors">
                  IDENTIDAD
                </Link>
                <Link href="/autoridades" className="text-lg font-semibold hover:text-club-yellow transition-colors">
                  AUTORIDADES
                </Link>
                <Link
                  href="/infraestructura"
                  className="text-lg font-semibold hover:text-club-yellow transition-colors"
                >
                  INFRAESTRUCTURA
                </Link>
                <Link href="/actividades" className="text-lg font-semibold hover:text-club-yellow transition-colors">
                  ACTIVIDADES
                </Link>
                <Link href="/noticias" className="text-lg font-semibold hover:text-club-yellow transition-colors">
                  NOTICIAS
                </Link>
                <Link href="/la-casona" className="text-lg font-semibold hover:text-club-yellow transition-colors">
                  LA CASONA
                </Link>
                <Link href="/socios" className="text-lg font-semibold hover:text-club-yellow transition-colors">
                  SOCIOS
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Menu Desplegable */}
      <MenuDesplegable isOpen={showMenu} onClose={() => setShowMenu(false)} actividades={actividades} />
    </>
  )
}
