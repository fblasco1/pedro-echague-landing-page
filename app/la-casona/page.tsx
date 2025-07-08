import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Phone, MapPin, Heart, Users, ChefHat } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LaCasonaPage() {
  const specialFeatures = [
    {
      icon: <Heart className="h-8 w-8 text-club-yellow" />,
      title: "Comida Casera",
      description: "Platos tradicionales preparados con amor y los mejores ingredientes, como en casa.",
    },
    {
      icon: <Users className="h-8 w-8 text-club-yellow" />,
      title: "Punto de Encuentro",
      description: "El lugar donde se reúne el barrio, donde cada mesa cuenta una historia.",
    },
    {
      icon: <ChefHat className="h-8 w-8 text-club-yellow" />,
      title: "Ambiente Familiar",
      description: "Un espacio cálido y acogedor donde todos se sienten como en familia.",
    },
  ]

  const galleryImages = [
    { src: "/images/restaurante.png", alt: "Interior del restaurante" },
    { src: "/images/salon.png", alt: "Salón principal" },
    { src: "/images/sede-social-bailes.png", alt: "Área social" },
    { src: "/images/subsuelo.png", alt: "Subsuelo del club" },
    { src: "/images/gimnasio-1.png", alt: "Vista del gimnasio" },
    { src: "/images/gimnasio-2.png", alt: "Instalaciones deportivas" },
  ]

  return (
    <div className="min-h-screen">
      <PageHeader
        title="LA CASONA"
        subtitle="Restaurante del Club"
        hashtag="#CORAZONGASTRONOMICO"
        backgroundImage="/images/restaurante.png"
      />

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Qué nos hace especiales */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-club-dark mb-4">¿Qué nos hace especiales?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En el corazón del club, La Casona no es solo un restaurante: es el punto de encuentro del barrio, donde
              las comidas caseras, las charlas de siempre y la vida social se mezclan en cada mesa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-club-dark">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Horarios y Contacto */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-club-dark mb-4">Horarios y Contacto</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Horarios */}
            <Card className="border-club-blue/20">
              <CardHeader className="bg-club-blue text-white">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Martes a Sábados</span>
                    <span className="text-club-blue font-semibold">20:00 - 24:00 hs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Domingos y Lunes</span>
                    <span className="text-red-500 font-semibold">Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card className="border-club-yellow/20">
              <CardHeader className="bg-club-yellow text-club-dark">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-club-dark mb-2">Reservas (Viernes y Sábados)</p>
                    <Button asChild className="w-full bg-club-blue hover:bg-club-blue/90">
                      <Link href="tel:1176401842">
                        <Phone className="h-4 w-4 mr-2" />
                        11 7640-1842
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium text-club-dark mb-2">Delivery</p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-club-yellow text-club-dark hover:bg-club-yellow/10 bg-transparent"
                    >
                      <Link href="https://wa.me/5491176401842">
                        <Phone className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nuestro Restaurante - Galería */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-club-dark mb-4">Nuestro Restaurante</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conocé los espacios donde compartimos los mejores momentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-club-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Club Pedro Echagüe</h3>
              <p className="text-gray-300">
                Más de 90 años formando campeones y construyendo comunidad en el corazón de Buenos Aires.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Portela 836, CABA
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +54 11 3639-1151
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://www.instagram.com/icdpedroechague/"
                  className="text-gray-300 hover:text-club-yellow transition-colors"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.facebook.com/clubpedroechague/"
                  className="text-gray-300 hover:text-club-yellow transition-colors"
                >
                  Facebook
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Club Pedro Echagüe. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
