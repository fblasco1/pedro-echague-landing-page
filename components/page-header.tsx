"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface PageHeaderProps {
  title: string
  backgroundImage: string
  hashtag?: string
  backLink?: string
  logoPosition?: "left" | "right"
  textColor?: "blue" | "white"
}

export function PageHeader({
  title,
  backgroundImage,
  hashtag = "ELCLUBDEFLORES",
  backLink = "/",
  logoPosition = "left",
  textColor = "blue",
}: PageHeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full">
      {/* Imagen de fondo o SVG de bastones */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        {backgroundImage && backgroundImage !== "/placeholder.svg" ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className={cn("object-cover transition-opacity duration-1000", isLoaded ? "opacity-100" : "opacity-0")}
          />
        ) : (
          // SVG de bastones azul y amarillo
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1600 800"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <rect x="0" y="0" width="320" height="800" fill="#003366" />
            <rect x="320" y="0" width="320" height="800" fill="#FFD600" />
            <rect x="640" y="0" width="320" height="800" fill="#003366" />
            <rect x="960" y="0" width="320" height="800" fill="#FFD600" />
            <rect x="1280" y="0" width="320" height="800" fill="#003366" />
          </svg>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-club-blue/90" />
      </div>

      {/* Franja amarilla con título */}
      <div className="absolute bottom-0 left-0 right-0 bg-club-yellow py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Link href={backLink} className={textColor === "blue" ? "text-club-blue" : "text-white"}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold font-raleway tracking-tight",
                textColor === "blue" ? "text-club-blue" : "text-white",
              )}
            >
              {title}
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <p
              className={cn(
                "text-sm md:text-base font-roboto",
                textColor === "blue" ? "text-club-blue/80" : "text-white/80",
              )}
            >
              #{hashtag}
            </p>
            <p
              className={cn(
                "text-sm md:text-base font-roboto",
                textColor === "blue" ? "text-club-blue/80" : "text-white/80",
              )}
            >
              CLUB PEDRO ECHAGÜE
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
