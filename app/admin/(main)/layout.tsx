import { requireAdminSession } from '@/lib/admin-auth'
import Link from 'next/link'

export default async function AdminMainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdminSession()
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-club-blue text-white shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="font-bold text-white">
            Admin Club Echagüe
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/admin/cuota" className="hover:text-club-yellow whitespace-nowrap">
              Cuota social
            </Link>
            <Link href="/admin/actividades" className="hover:text-club-yellow whitespace-nowrap">
              Aranceles y horarios
            </Link>
            <Link href="/admin/carta" className="hover:text-club-yellow whitespace-nowrap">
              Carta La Casona
            </Link>
            <Link
              href="/"
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap"
            >
              Ir al sitio
            </Link>
            <form action="/api/admin/logout" method="POST" className="inline">
              <button type="submit" className="hover:text-club-yellow whitespace-nowrap">
                Cerrar sesión
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
