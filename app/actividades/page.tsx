import { getAllActividades } from '@/lib/sanity/actividades'
import ActividadesClient from '@/app/actividades/ActividadesCliente'

export default async function ActividadesPage() {
  const actividades = await getAllActividades()

  return (
    <main>
      <ActividadesClient actividades={actividades} />
    </main>
  )
}
