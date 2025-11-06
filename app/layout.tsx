import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Raleway, Roboto } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { getAllActividades } from "@/lib/sanity/actividades"
import { Header } from "@/components/header"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Club Pedro Echagüe | Deportes, Cultura y Comunidad",
    template: "%s | Club Pedro Echagüe"
  },
  description: "Club Pedro Echagüe: Más de 90 años de historia deportiva y cultural. Básquet, fútbol, gimnasio, actividades recreativas y culturales. Formá parte de nuestra gran familia.",
  keywords: [
    "club pedro echagüe",
    "deportes",
    "básquet",
    "fútbol",
    "gimnasio",
    "actividades deportivas",
    "club deportivo",
    "cultura",
    "comunidad",
    "socios",
    "cuota social",
    "actividades recreativas",
    "actividades culturales"
  ],
  authors: [{ name: "Club Pedro Echagüe" }],
  creator: "Club Pedro Echagüe",
  publisher: "Club Pedro Echagüe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.icdpedroechague.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://www.icdpedroechague.com.ar",
    siteName: "Club Pedro Echagüe",
    title: "Club Pedro Echagüe | Deportes, Cultura y Comunidad",
    description: "Más de 90 años de historia deportiva y cultural. Básquet, fútbol, gimnasio, actividades recreativas y culturales.",
    images: [
      {
        url: "/images/portada.jpg",
        width: 1200,
        height: 630,
        alt: "Club Pedro Echagüe - Instalaciones deportivas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Pedro Echagüe | Deportes, Cultura y Comunidad",
    description: "Más de 90 años de historia deportiva y cultural. Formá parte de nuestra gran familia.",
    images: ["/images/portada.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Reemplazar con el código real
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const actividades = await getAllActividades()
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "name": "Club Pedro Echagüe",
    "description": "Club deportivo y cultural con más de 90 años de historia. Ofrecemos actividades deportivas, recreativas y culturales para toda la familia.",
    "url": "https://www.icdpedroechague.com.ar",
    "logo": "https://www.icdpedroechague.com.ar/logo.svg",
    "image": "https://www.icdpedroechague.com.ar/images/portada.jpg",
    "foundingDate": "1934",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AR",
      "addressLocality": "Buenos Aires"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54-9-11-3639-1151",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      "https://wa.me/5491136391151"
    ],
    "sport": [
      "Basketball",
      "Football",
      "Volleyball",
      "Gymnastics",
      "Martial Arts",
      "Dance"
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Gimnasio",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Canchas deportivas",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Salón de eventos",
        "value": true
      }
    ]
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${raleway.variable} ${roboto.variable} font-raleway`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header actividades={actividades} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
