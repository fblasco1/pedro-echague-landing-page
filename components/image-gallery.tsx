"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
  }[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % images.length)
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <button
              className="absolute right-4 top-4 z-10 bg-black/50 rounded-full p-2 text-white"
              onClick={closeLightbox}
            >
              <X size={20} />
            </button>

            <div className="relative aspect-video">
              {selectedImage !== null && (
                <Image
                  src={images[selectedImage].src || "/placeholder.svg"}
                  alt={images[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <button className="bg-black/50 rounded-full p-2 ml-4 text-white" onClick={goToPrevious}>
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              <button className="bg-black/50 rounded-full p-2 mr-4 text-white" onClick={goToNext}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
