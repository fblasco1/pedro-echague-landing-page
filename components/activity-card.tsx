import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ActivityEvent {
  title: string
  date: string
  location: string
}

interface ActivityCardProps {
  title: string
  description: string
  imageSrc: string
  categories?: string[] | null
  events?: ActivityEvent[] | null
  link?: string
  logoSrc?: string
}

export function ActivityCard({
  title,
  description,
  imageSrc,
  categories,
  events,
  link = "#",
  logoSrc,
}: ActivityCardProps) {
  const safeCategories = Array.isArray(categories) ? categories : []
  const safeEvents = Array.isArray(events) ? events : []

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-md flex flex-col h-full">
      <div className="aspect-video overflow-hidden relative">
        {logoSrc && (
          <Image
            src={logoSrc}
            width={60}
            height={60}
            alt="Logo actividad"
            className="absolute top-2 left-2 z-10 bg-white rounded-full p-1 border border-gray-200 shadow"
            style={{ objectFit: "contain", background: "white" }}
          />
        )}
        {typeof imageSrc === "string" && imageSrc.trim() !== "" ? (
          <Image
            src={imageSrc}
            width={400}
            height={300}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Image
            src="/placeholder.svg"
            width={400}
            height={300}
            alt="Sin imagen"
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {safeCategories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-club-blue/10 text-club-blue border-club-blue/20">
              {category}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-bold text-club-blue font-raleway mb-2">{title}</h3>
        <p className="text-club-dark/80 font-roboto mb-4 flex-grow">{description}</p>

        {safeEvents.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-club-dark mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-club-blue" />
              Próximos eventos
            </h4>
            <ul className="space-y-2">
              {safeEvents.map((event, index) => (
                <li key={index} className="text-sm bg-gray-50 p-2 rounded">
                  <span className="font-medium">{event.title}</span>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{event.date}</span>
                    <span className="mx-1">•</span>
                    <span>{event.location}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button variant="link" asChild className="p-0 mt-auto text-club-blue hover:text-club-blue/80 font-roboto">
          <Link href={link}>Ver más información</Link>
        </Button>
      </div>
    </div>
  )
}
