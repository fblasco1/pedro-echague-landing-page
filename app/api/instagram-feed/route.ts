import { NextResponse } from "next/server"

// Esta es una API route que en un entorno real se conectaría con la API de Instagram
// para obtener los posts del feed del club
export async function GET() {
  try {
    // En un entorno real, aquí iría la lógica para obtener los posts de Instagram
    // usando el token de acceso y la API de Instagram Graph

    // Ejemplo de cómo sería:
    // const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    // const userId = process.env.INSTAGRAM_BUSINESS_ID;
    // const response = await fetch(
    //   `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`
    // );
    // const data = await response.json();

    // Por ahora, devolvemos datos de ejemplo
    const mockPosts = [
      {
        id: "1",
        media_url: "/placeholder.svg?height=600&width=600",
        permalink: "https://www.instagram.com/p/example1/",
        caption: "¡Gran victoria de nuestro equipo de básquet en el torneo metropolitano! #PedroEchague #Basquet",
        likes: 45,
        comments: 8,
        timestamp: "2023-03-15T18:30:00Z",
        media_type: "IMAGE",
      },
      {
        id: "2",
        media_url: "/placeholder.svg?height=600&width=600",
        permalink: "https://www.instagram.com/p/example2/",
        caption: "Exhibición de patín artístico este fin de semana. ¡No te lo pierdas! #PedroEchague #PatinArtistico",
        likes: 32,
        comments: 5,
        timestamp: "2023-03-10T14:20:00Z",
        media_type: "IMAGE",
      },
      // Más posts...
    ]

    return NextResponse.json(mockPosts)
  } catch (error) {
    console.error("Error fetching Instagram feed:", error)
    return NextResponse.json({ error: "Failed to fetch Instagram feed" }, { status: 500 })
  }
}
