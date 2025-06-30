"use client"
import Image from "next/image"
import Link from "next/link"
import { X, Mail, Phone, MapPin, Clock, Instagram, Facebook, ChevronRight } from "lucide-react"
import { useEffect } from "react"
import { filtrarFederadasPrincipales } from "@/lib/utils"

interface MenuCategory {
  title: string
  items: SubMenuItem[]
}

interface SubMenuItem {
  name: string
  href: string
  disabled?: boolean
  comingSoon?: boolean
  hasSubmenu?: boolean
}

interface MenuDesplegableProps {
  isOpen: boolean
  onClose: () => void
  actividades?: { title: string; slug: { current: string } }[]
}

export function MenuDesplegable({ isOpen, onClose, actividades = [] }: MenuDesplegableProps) {
  const federadasPrincipales = filtrarFederadasPrincipales(Array.isArray(actividades) ? actividades : [])

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const menuCategories: MenuCategory[] = [
    {
      title: "El Club",
      items: [
        { name: "Identidad", href: "/identidad" },
        { name: "Noticias", href: "/noticias" },
        { name: "Infraestructura", href: "/infraestructura" },
      ],
    },
    {
      title: "Actividades",
      items: [
        ...federadasPrincipales.map(act => ({
          name: act.title,
          href: `/actividades/${act.slug.current}`
        })),
        { name: "Recreativas", href: "/actividades?categoria=recreativas", hasSubmenu: true },
        { name: "Culturales", href: "/actividades?categoria=culturales", hasSubmenu: true },
      ],
    },
    {
      title: "Socios",
      items: [
        { name: "Valores de la Cuota", href: "/socios/cuota" },
        { name: "Beneficios", href: "/socios/beneficios", disabled: true, comingSoon: true },
      ],
    },
    {
      title: "Institucional",
      items: [
        { name: "Autoridades", href: "/autoridades" },
        { name: "Estatuto", href: "/estatuto", disabled: true, comingSoon: true },
        { name: "Misión, Visión y Valores", href: "/#quienes-somos" },
      ],
    },
  ]

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      text: "clubpedroechague@fibertel.com",
      href: "mailto:clubpedroechague@fibertel.com",
    },
    { icon: <Phone className="h-5 w-5" />, text: "+54 9 11 3639-1151", href: "https://wa.me/5491136391151" },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Portela 836, CABA",
      href: "https://maps.google.com/?q=Portela+836,+CABA",
    },
    { icon: <Clock className="h-5 w-5" />, text: "Lun a Vie 15 a 21hs", href: "#" },
  ]

  const socialMedia = [
    { icon: <Instagram className="h-6 w-6" />, href: "https://www.instagram.com/icdpedroechague/" },
    { icon: <Facebook className="h-6 w-6" />, href: "https://www.facebook.com/clubpedroechague/" },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-club-blue flex flex-col">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={onClose}
          className="text-white hover:text-club-yellow transition-colors"
          aria-label="Cerrar menú"
        >
          <span className="text-lg font-bold mr-2">CERRAR MENÚ</span>
        </button>
      </div>

      <div className="flex-1 border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          {/* Desktop menu layout - sin scroll */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {menuCategories.map((category) => (
              <div key={category.title} className="mb-6">
                <h2 className="text-club-yellow text-xl font-bold mb-4">{category.title.toUpperCase()}</h2>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      {item.disabled ? (
                        <span className="text-white/50 flex items-center text-sm">
                          {item.name}
                          {item.comingSoon && (
                            <span className="ml-2 text-xs bg-club-yellow/20 text-club-yellow px-2 py-0.5 rounded">
                              Próximamente
                            </span>
                          )}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-white hover:text-club-yellow transition-colors text-sm flex items-center"
                          onClick={onClose}
                        >
                          {item.name}
                          {item.hasSubmenu && <ChevronRight className="h-4 w-4 ml-1" />}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile menu layout - vertical stacking con scroll */}
          <div className="md:hidden overflow-auto">
            {menuCategories.map((category) => (
              <div key={category.title} className="mb-8">
                <h2 className="text-club-yellow text-xl font-bold mb-4">{category.title.toUpperCase()}</h2>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      {item.disabled ? (
                        <span className="text-white/50 flex items-center">
                          {item.name}
                          {item.comingSoon && (
                            <span className="ml-2 text-xs bg-club-yellow/20 text-club-yellow px-2 py-0.5 rounded">
                              Próximamente
                            </span>
                          )}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-white hover:text-club-yellow transition-colors flex items-center"
                          onClick={onClose}
                        >
                          {item.name}
                          {item.hasSubmenu && <ChevronRight className="h-4 w-4 ml-1" />}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de contacto en una sola fila */}
      <div className="bg-club-blue/80 border-t border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-white hover:text-club-yellow transition-colors flex items-center gap-2 text-sm"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.text}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {socialMedia.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-white hover:text-club-yellow transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Redes sociales"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
