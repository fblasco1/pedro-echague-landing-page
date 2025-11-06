import { client } from '../../sanity/client'
import type { CuotaCategoria } from '@/app/types/Cuota'


export async function getCategoriasSocios(): Promise<CuotaCategoria[]> {
  return client.fetch(
    `*[_type == "cuotaCategoria"] | order(valor desc){
      categoria,
      valor,
      condicion,
      vigenteDesde,
      _updatedAt
    }`
  )
}
