import { getAllActividades } from '@/lib/sanity/actividades'
import ActividadesClient from '@/app/actividades/ActividadesCliente'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Actividades",
  description: "Descubrí todas las actividades del Club Pedro Echagüe. Deportes federados, recreativos y culturales. Básquet, fútbol, gimnasio, danza, teatro y más. Encontrá tu actividad ideal.",
  keywords: [
    "actividades",
    "deportes",
    "básquet",
    "fútbol",
    "gimnasio",
    "danza",
    "teatro",
    "actividades recreativas",
    "actividades culturales",
    "deportes federados",
    "club pedro echagüe",
    "actividades deportivas"
  ],
  openGraph: {
    title: "Actividades | Club Pedro Echagüe",
    description: "Descubrí todas las actividades del Club Pedro Echagüe. Deportes, cultura y recreación para toda la familia.",
    type: "website",
    url: "https://www.icdpedroechague.com.ar/actividades",
    images: [
      {
        url: "/images/activities/basquet.png",
        width: 1200,
        height: 630,
        alt: "Actividades del Club Pedro Echagüe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Actividades | Club Pedro Echagüe",
    description: "Descubrí todas las actividades del Club Pedro Echagüe. Deportes, cultura y recreación.",
    images: ["/images/activities/basquet.png"],
  },
  alternates: {
    canonical: "https://www.icdpedroechague.com.ar/actividades",
  },
}

export default async function ActividadesPage() {
  const actividades = await getAllActividades()

  return (
    <main>
      <ActividadesClient actividades={actividades} />
    </main>
  )
}
