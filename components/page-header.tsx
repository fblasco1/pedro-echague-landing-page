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
      {/* Imagen de fondo */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={title}
          fill
          priority
          className={cn("object-cover transition-opacity duration-1000", isLoaded ? "opacity-100" : "opacity-0")}
        />
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
