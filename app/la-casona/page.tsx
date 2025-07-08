import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Phone, Heart, Users, Utensils } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LaCasonaPage() {
  const galleryImages = [
    { src: "/images/restaurante.png", alt: "Interior de La Casona" },
    { src: "/images/salon.png", alt: "Salón principal" },
    { src: "/images/sede-social-bailes.png", alt: "Sede social" },
    { src: "/images/subsuelo.png", alt: "Subsuelo del club" },
    { src: "/images/gimnasio-1.png", alt: "Área común" },
    { src: "/images/gimnasio-2.png", alt: "Espacio de encuentro" },
  ]

  const specialFeatures = [
    {
      icon: <Heart className="h-8 w-8 text-club-yellow" />,
      title: "Comida Casera",
      description: "En el corazón del club, donde las comidas caseras despiertan los mejores recuerdos familiares",
    },
    {
      icon: <Users className="h-8 w-8 text-club-yellow" />,
      title: "Punto de Encuentro",
      description: "El lugar donde el barrio se encuentra y las charlas de siempre se mezclan en cada mesa",
    },
    {
      icon: <Utensils className="h-8 w-8 text-club-yellow" />,
      title: "Vida Social",
      description: "Más que un restaurante, somos el espacio donde la vida social del club cobra vida",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="LA CASONA"
        subtitle="Restaurante del Club"
        backgroundImage="/images/restaurante.png"
        hashtag="CORAZONGASTRONOMICO"
        backLink="/"
      />

      <main className="container py-12 px-4 md:px-6">
        {/* Qué nos hace especiales */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-club-blue font-raleway mb-4">Qué nos hace especiales</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              La Casona no es solo un restaurante: es el punto de encuentro del barrio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialFeatures.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow border-none">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-club-blue mb-4 font-raleway">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Horarios y Contacto */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-club-blue font-raleway mb-4">Horarios y Contacto</h2>
            <p className="text-gray-600 text-lg">Te esperamos para compartir los mejores momentos</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Horarios */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-none">
              <CardContent className="p-8 text-center">
                <div className="bg-club-blue p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Horarios</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Martes a Sábados</span>
                    <span className="text-club-blue font-bold text-lg">20:00 - 24:00 hs</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">Domingos y Lunes</span>
                    <span className="text-red-500 font-bold">CERRADO</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-none">
              <CardContent className="p-8 text-center">
                <div className="bg-club-yellow p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-club-blue" />
                </div>
                <h3 className="text-2xl font-bold text-club-blue mb-4 font-raleway">Contacto</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Reservas (solo viernes y sábados)</p>
                    <p className="text-gray-600 mb-4">Delivery todos los días</p>
                    <Link
                      href="tel:1176401842"
                      className="inline-block bg-club-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-club-blue/90 transition-colors"
                    >
                      11 7640-1842
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nuestro Restaurante - Galería */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-club-blue font-raleway mb-4">Nuestro Restaurante</h2>
            <p className="text-gray-600 text-lg">Conocé todos los espacios donde vivimos los mejores momentos</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-white/70 md:text-left font-roboto">
            © {new Date().getFullYear()} Club Pedro Echagüe. Todos los derechos reservados.
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
