import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Phone, Utensils, Heart, Users } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function LaCasonaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="LA CASONA" backgroundImage="/images/restaurante.png" hashtag="LACASONA" />

      <div className="container mx-auto px-4 py-12">
        {/* Imagen Interior Principal */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image src="/images/salon.png" alt="Interior de La Casona" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-3 font-raleway">En el corazón del club</h2>
                <p className="text-lg md:text-xl opacity-90 font-roboto">
                  El punto de encuentro del barrio, donde las comidas caseras, las charlas de siempre y la vida social
                  se mezclan en cada mesa.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Galería de Fotos */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/restaurante.png"
                  alt="Ambiente de La Casona"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Card>
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/salon.png"
                  alt="Salón principal"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Card>
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/sede-social-bailes.png"
                  alt="Eventos especiales"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Card>
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/subsuelo.png"
                  alt="Área de eventos"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Card>
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/pena-tango-1977.png"
                  alt="Noches de tango"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Card>
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/sundays-club-1978.png"
                  alt="Domingos familiares"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Qué nos hace especiales */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-club-blue text-center mb-8 font-raleway">
            ¿Qué nos hace especiales?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="bg-club-yellow p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Utensils className="h-10 w-10 text-club-blue" />
                </div>
                <h3 className="text-xl font-bold text-club-blue mb-4 font-raleway">Comida Casera</h3>
                <p className="text-gray-600 leading-relaxed">
                  Platos tradicionales preparados con el amor y la sazón de siempre, como en casa de la abuela
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="bg-club-blue p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-club-blue mb-4 font-raleway">Ambiente Familiar</h3>
                <p className="text-gray-600 leading-relaxed">
                  Un espacio cálido donde las familias y amigos se reúnen para compartir momentos únicos
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="bg-club-yellow p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-10 w-10 text-club-blue" />
                </div>
                <h3 className="text-xl font-bold text-club-blue mb-4 font-raleway">Punto de Encuentro</h3>
                <p className="text-gray-600 leading-relaxed">
                  El lugar donde el barrio se encuentra y comparte las charlas de siempre en cada mesa
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Información de Contacto y Horarios */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Horarios */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-club-blue text-white">
                <CardTitle className="text-2xl font-raleway flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  Horarios
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Martes a Sábados</span>
                    <span className="text-club-blue font-bold text-lg">20:00 - 24:00 hs</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-700">Domingos y Lunes</span>
                    <span className="text-red-500 font-bold text-lg">CERRADO</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-club-yellow text-club-blue">
                <CardTitle className="text-2xl font-raleway flex items-center">
                  <Phone className="h-6 w-6 mr-3" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 mb-2">Reservas solo viernes y sábados</p>
                    <p className="text-gray-600 mb-2">Delivery todos los dias</p>
                    <Button asChild className="w-full bg-club-blue hover:bg-club-blue/90">
                      <a href="tel:1176401842" className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        11 7640-1842
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
