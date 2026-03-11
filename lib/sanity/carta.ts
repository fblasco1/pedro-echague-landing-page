import { client } from '../../sanity/client'

export type PlatoCarta = {
  _id: string
  nombre: string
  descripcion?: string
  precio?: string
  categoria: string
  subcategoria?: string
  orden?: number
}

export async function getCartaPlatos(): Promise<PlatoCarta[]> {
  const list = await client.fetch<PlatoCarta[]>(
    `*[_type == "platoCarta"] | order(categoria asc, orden asc, nombre asc){
      _id,
      nombre,
      descripcion,
      precio,
      categoria,
      subcategoria,
      orden
    }`
  )
  return list || []
}
