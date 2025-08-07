import { client } from '../../sanity/client'

export interface Instalacion {
  _id: string
  nombre: string
  descripcion: string
  aforo?: number
  imagenes: { src: string; alt: string }[]
}

export const getAllInstalaciones = async (): Promise<Instalacion[]> => {
  return await client.fetch(
    `*[_type == "instalacion"]{
      _id,
      nombre,
      descripcion,
      aforo,
      imagenes[]{
        "src": asset->url,
        alt
      }
    }`
  )
}
