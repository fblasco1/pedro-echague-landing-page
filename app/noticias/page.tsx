"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"

// Tipo para los posts de Instagram
interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption: string
  likes: number
  comments: number
  timestamp: string
  media_type: string
  thumbnail_url?: string
}

// Componente para mostrar un post individual de Instagram
function InstagramPostCard({ post }: { post: InstagramPost }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={post.media_type === "VIDEO" ? post.thumbnail_url || post.media_url : post.media_url}
            alt={post.caption.substring(0, 60) + "..."}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {post.media_type === "VIDEO" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </a>
      <div className="p-4">
        <p className="line-clamp-2 text-sm text-gray-700">{post.caption}</p>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center text-gray-500">
            <Heart className="mr-1 h-4 w-4" />
            <span className="text-xs">{post.likes}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MessageCircle className="mr-1 h-4 w-4" />
            <span className="text-xs">{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para mostrar el perfil de Instagram
function InstagramProfileHeader() {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-club-blue">
        <Image
          src="/placeholder.svg?height=100&width=100"
          alt="Club Pedro Echague Instagram"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold text-club-blue">
          icdpedroechague
          <a
            href="https://www.instagram.com/icdpedroechague/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-club-blue"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </h2>
        <p className="text-sm text-gray-600">
          Club deportivo y cultural Pedro Echagüe - Desde 1934 en el barrio de Flores
        </p>
      </div>
    </div>
  )
}

export default function NoticiasPage() {
  // En un entorno real, estos datos vendrían de la API de Instagram
  // Aquí usamos datos de ejemplo
  const [posts, setPosts] = useState<InstagramPost[]>([
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
    {
      id: "3",
      media_url: "/placeholder.svg?height=600&width=600",
      permalink: "https://www.instagram.com/p/example3/",
      caption:
        "Nuestros pequeños deportistas disfrutando de la iniciación deportiva. ¡El futuro del club! #PedroEchague #Deportes",
      likes: 67,
      comments: 12,
      timestamp: "2023-03-05T10:15:00Z",
      media_type: "VIDEO",
      thumbnail_url: "/placeholder.svg?height=600&width=600",
    },
    {
      id: "4",
      media_url: "/placeholder.svg?height=600&width=600",
      permalink: "https://www.instagram.com/p/example4/",
      caption:
        "Torneo de vóley en nuestras instalaciones. ¡Felicitaciones a todos los participantes! #PedroEchague #Voley",
      likes: 41,
      comments: 7,
      timestamp: "2023-03-01T16:45:00Z",
      media_type: "IMAGE",
    },
    {
      id: "5",
      media_url: "/placeholder.svg?height=600&width=600",
      permalink: "https://www.instagram.com/p/example5/",
      caption: "Clase abierta de taekwondo. ¡Vení a probar! #PedroEchague #Taekwondo",
      likes: 29,
      comments: 3,
      timestamp: "2023-02-25T11:30:00Z",
      media_type: "IMAGE",
    },
    {
      id: "6",
      media_url: "/placeholder.svg?height=600&width=600",
      permalink: "https://www.instagram.com/p/example6/",
      caption: "Nuestro equipo de básquet femenino sigue creciendo. ¡Sumate! #PedroEchague #BasquetFemenino",
      likes: 53,
      comments: 9,
      timestamp: "2023-02-20T19:10:00Z",
      media_type: "IMAGE",
    },
    {
      id: "7",
      media_url: "/placeholder.svg?height=600&width=600",
      permalink: "https://www.instagram.com/p/example7/",
      caption:
        "Taller de escritura para adultos mayores. ¡Una actividad que estimula la creatividad! #PedroEchague #Cultura",
      likes: 38,
      comments: 6,
      timestamp: "2023-02-15T15:20:00Z",
      media_type: "IMAGE",
    },
    {
      id: "8",
      media_url: "/placeholder.svg?height=600&width=600",
      permalink: "https://www.instagram.com/p/example8/",
      caption: "Entrenamiento de crossfit. ¡Superando límites! #PedroEchague #Crossfit",
      likes: 47,
      comments: 4,
      timestamp: "2023-02-10T08:45:00Z",
      media_type: "VIDEO",
      thumbnail_url: "/placeholder.svg?height=600&width=600",
    },
  ])

  // En un entorno real, aquí se haría la llamada a la API de Instagram
  // useEffect(() => {
  //   async function fetchInstagramPosts() {
  //     try {
  //       const response = await fetch('/api/instagram-feed');
  //       const data = await response.json();
  //       setPosts(data);
  //     } catch (error) {
  //       console.error('Error fetching Instagram posts:', error);
  //     }
  //   }
  //   fetchInstagramPosts();
  // }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b">
        <MainNav />
      </header>

      <main className="container py-12 px-4 md:px-6">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-club-blue hover:text-club-blue/80">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-club-blue font-raleway">
            Noticias
          </h1>
        </div>

        <p className="max-w-[900px] text-club-dark/80 md:text-xl/relaxed mb-8 font-roboto">
          Mantente al día con las últimas novedades y actividades del Club Pedro Echague.
        </p>

        <div className="w-full">
          {/* Perfil de Instagram */}
          <InstagramProfileHeader />

          {/* Grid de posts de Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <InstagramPostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-club-blue hover:bg-club-blue/90 font-roboto">
              <a href="https://www.instagram.com/icdpedroechague/" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Ver más en Instagram
              </a>
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-white/70 md:text-left font-roboto">
            © {new Date().getFullYear()} Club Pedro Echague. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-white/70 hover:text-white font-roboto">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-sm text-white/70 hover:text-white font-roboto">
              Términos de Servicio
            </Link>
            <Link href="#" className="text-sm text-white/70 hover:text-white font-roboto">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
