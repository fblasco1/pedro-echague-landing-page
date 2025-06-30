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

// Página desactivada temporalmente
export default function NoticiasPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-club-blue text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Noticias</h1>
      <p className="text-lg md:text-2xl">La sección de noticias se encuentra temporalmente desactivada.</p>
    </div>
  )
}
