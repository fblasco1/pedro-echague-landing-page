import Link from "next/link"
import { getCartaPlatos } from "@/lib/sanity/carta"
import type { PlatoCarta } from "@/lib/sanity/carta"
import { getCasona } from "@/lib/sanity/casona"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const revalidate = 60

const CATEGORIAS_LABELS: Record<string, string> = {
  entrada: 'Entrada',
  principales: 'Principales',
  salsas: 'Salsas',
  bebidas: 'Bebidas',
  postres: 'Postres',
  cafeteria: 'Cafetería',
  menu_infantil: 'Menú Infantil',
}

const SUBCATEGORIAS_LABELS: Record<string, string> = {
  pollo: 'Pollo',
  carnes: 'Carnes',
  pescados: 'Pescados',
  pastas: 'Pastas',
  sin_alcohol: 'Sin alcohol',
  tragos: 'Tragos',
  cervezas: 'Cervezas',
  vinos_tintos: 'Vinos tintos',
  vinos_blancos: 'Vinos blancos',
  espumantes: 'Espumantes',
}

function groupPlatosByCategory(platos: PlatoCarta[]) {
  const groups: { categoria: string; subcategoria?: string; platos: PlatoCarta[] }[] = []
  const order = [
    { cat: 'entrada' },
    { cat: 'principales', sub: 'pollo' }, { cat: 'principales', sub: 'carnes' }, { cat: 'principales', sub: 'pescados' }, { cat: 'principales', sub: 'pastas' }, { cat: 'principales' },
    { cat: 'salsas' },
    { cat: 'bebidas', sub: 'sin_alcohol' }, { cat: 'bebidas', sub: 'tragos' }, { cat: 'bebidas', sub: 'cervezas' }, { cat: 'bebidas', sub: 'vinos_tintos' }, { cat: 'bebidas', sub: 'vinos_blancos' }, { cat: 'bebidas', sub: 'espumantes' }, { cat: 'bebidas' },
    { cat: 'postres' },
    { cat: 'cafeteria' },
    { cat: 'menu_infantil' },
  ]
  for (const { cat, sub } of order) {
    const items = platos.filter((p) => p.categoria === cat && (sub ? p.subcategoria === sub : !p.subcategoria))
    if (items.length) groups.push({ categoria: cat, subcategoria: sub, platos: items })
  }
  return groups
}

export const metadata = {
  title: "Carta | La Casona | Club Pedro Echagüe",
  description: "Carta digital del restaurante La Casona. Entradas, principales, bebidas, postres y más.",
}

export default async function CartaPage() {
  const [platos, casona] = await Promise.all([getCartaPlatos(), getCasona()])
  const groups = groupPlatosByCategory(platos)

  return (
    <div className="min-h-screen">
      <PageHeader
        title="CARTA"
        hashtag="LA CASONA"
        backgroundImage={casona?.gallery?.[0]?.url || "/images/restaurante.png"}
      />
      <div className="container mx-auto px-4 py-8">
        <Link href="/la-casona" className="inline-flex items-center gap-1 text-club-blue font-medium hover:underline mb-8">
          <ChevronLeft className="h-4 w-4" />
          Volver a La Casona
        </Link>

        {platos.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-lg">La carta se está actualizando. Volvé pronto.</p>
            <Button asChild variant="outline" className="mt-4 border-club-blue text-club-blue">
              <Link href="/la-casona">Volver a La Casona</Link>
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12 pb-16">
            {groups.map((group, idx, arr) => {
              const isFirstPrincipales = group.categoria === 'principales' && (idx === 0 || arr[idx - 1].categoria !== 'principales')
              const isFirstBebidas = group.categoria === 'bebidas' && (idx === 0 || arr[idx - 1].categoria !== 'bebidas')
              const sinSubcategoria = !group.subcategoria
              const tituloCategoria = CATEGORIAS_LABELS[group.categoria] || group.categoria
              const tituloSubcategoria = group.subcategoria ? (SUBCATEGORIAS_LABELS[group.subcategoria] || group.subcategoria) : null

              return (
                <div key={idx}>
                  {/* Categorías sin subcategoría (Entrada, Salsas, Postres, etc.): título principal como Principales/Bebidas */}
                  {sinSubcategoria && (
                    <h2 className="text-2xl font-bold text-club-dark mb-6 font-raleway">{tituloCategoria}</h2>
                  )}
                  {/* Principales y Bebidas: título de sección principal la primera vez */}
                  {isFirstPrincipales && (
                    <h2 className="text-2xl font-bold text-club-dark mb-6 font-raleway">Principales</h2>
                  )}
                  {isFirstBebidas && (
                    <h2 className="text-2xl font-bold text-club-dark mb-6 font-raleway">Bebidas</h2>
                  )}
                  {/* Solo subcategorías (Pollo, Carnes, Sin alcohol, etc.) llevan h3 */}
                  {tituloSubcategoria && (
                    <h3 className="text-xl font-bold text-club-blue mb-4 font-raleway">{tituloSubcategoria}</h3>
                  )}
                  <ul className="space-y-3">
                    {group.platos.map((p) => (
                      <li key={p._id} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-gray-100 pb-2">
                        <div>
                          <span className="font-medium text-club-dark font-roboto">{p.nombre}</span>
                          {p.descripcion && (
                            <p className="text-sm text-gray-600 font-roboto">{p.descripcion}</p>
                          )}
                        </div>
                        {p.precio && (
                          <span className="text-club-blue font-medium font-roboto whitespace-nowrap">{p.precio}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <footer className="w-full border-t bg-club-dark text-white mt-auto">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-white/70 md:text-left font-roboto">
            © {new Date().getFullYear()} Club Pedro Echagüe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/icdpedroechague/" className="text-white/70 hover:text-white" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
            </Link>
            <Link href="https://www.facebook.com/icdpedroechague" className="text-white/70 hover:text-white" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z"></path></svg>
            </Link>
            <Link href="https://wa.me/5491136391151" className="text-white/70 hover:text-white" aria-label="Whatsapp">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.67.96.98-3.58-.24-.38A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.03 2.82 1.18 3.02c.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"></path></svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
