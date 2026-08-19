import { callFrappeMethod } from "@/lib/frappe/client"

export type CuotaCategoriaPublica = {
  categoria: string
  valor: number
  condicion: string
}

export type ValoresCuotaPublica = {
  vigente_desde: string | null
  categorias: CuotaCategoriaPublica[]
}

export async function getValoresCuotaPublica(): Promise<ValoresCuotaPublica> {
  return callFrappeMethod<ValoresCuotaPublica>(
    "club_management.members.api.cuota_publica.get_valores_cuota"
  )
}
