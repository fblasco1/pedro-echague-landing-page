import { client } from '@/sanity/client'
import { Actividad } from '@/app/types/Actividad'

export const getAllActividades = async (): Promise<Actividad[]> => {
  return await client.fetch(
    `*[_type == "actividad"]{
      _id,
      title,
      slug,
      description,
      longDescription,
      tipo,
      categories,
      imageSrc{asset->{url}},
      logo{asset->{url}},
      fotoPortada{asset->{url}},
      horarios,
      coaches[]{firstName, lastName, roles, image{asset->{url}}},
      events,
      gallery[]{asset->{url}}
    }`
  )
}

export const getActividadBySlug = async (slug: string): Promise<Actividad | null> => {
  return await client.fetch(
    `*[_type == "actividad" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      longDescription,
      tipo,
      categories,
      imageSrc{asset->{url}},
      logo{asset->{url}},
      fotoPortada{asset->{url}},
      horarios,
      coaches[]{firstName, lastName, roles, image{asset->{url}}},
      events,
      gallery[]{asset->{url}}
    }`,
    { slug }
  )
}
