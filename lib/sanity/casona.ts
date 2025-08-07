import { client } from '../../sanity/client'

export async function getCasona() {
  const query = `*[_type == "casona"][0]{
    title,
    description,
    features,
    horario,
    contacto,
    "gallery": gallery[]{"url": asset->url, caption}
  }`
  return await client.fetch(query)
}
