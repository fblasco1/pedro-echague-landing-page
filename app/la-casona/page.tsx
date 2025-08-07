import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getCasona } from "@/lib/sanity/casona"

export default async function LaCasonaPage() {
  const casona = await getCasona()
  const ClockIcon = LucideIcons['Clock'];
  const PhoneIcon = LucideIcons['Phone'];
  return (
    <div className="min-h-screen">
      <PageHeader
        title={casona?.title || "LA CASONA"}
        hashtag="CORAZÓNGASTRONÓMICO"
        backgroundImage={casona?.gallery?.[0]?.url || "/images/restaurante.png"}
      />
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Qué nos hace especiales */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-club-dark mb-4">¿Qué nos hace especiales?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {casona?.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {casona?.features?.map((feature: any, index: number) => {
              const IconComponent = feature.icon && (LucideIcons as any)[feature.icon] ? (LucideIcons as any)[feature.icon] : null;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {IconComponent ? (
                        <IconComponent className="h-8 w-8 text-club-yellow" />
                      ) : (
                        <span className="h-8 w-8 text-club-yellow" />
                      )}
                    </div>
                    <CardTitle className="text-club-dark">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        {/* Horarios y contacto */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Horarios */}
          <Card className="border-club-blue/20">
            <CardHeader className="bg-club-blue text-white">
              <CardTitle className="flex items-center gap-2">
                {ClockIcon && <ClockIcon className="h-5 w-5" />}
                Horarios de Atención
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{casona?.horario || "Martes a Sábados 20:00 - 24:00 hs"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Contacto */}
          <Card className="border-club-yellow/20">
            <CardHeader className="bg-club-yellow text-club-dark">
              <CardTitle className="flex items-center gap-2">
                {PhoneIcon && <PhoneIcon className="h-5 w-5" />}
                Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-club-dark mb-2">Reservas (viernes y sábados)</p>
                  <p className="font-medium text-club-dark mb-2">Delivery</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-club-yellow text-club-dark hover:bg-club-yellow/10 bg-transparent"
                  >
                    <Link href={`https://wa.me/${casona?.contacto?.whatsapp || "5491176401842"}`}>
                      {PhoneIcon && <PhoneIcon className="h-4 w-4 mr-2" />}
                      WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
            {casona?.gallery?.map((image: any, index: number) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.caption || `Foto ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </section>
      </div>
      <footer className="w-full border-t bg-club-dark text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-white/70 md:text-left font-roboto">
            © {new Date().getFullYear()} Club Pedro Echagüe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/icdpedroechague/" className="text-white/70 hover:text-white" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
            </Link>
            <Link href="https://www.facebook.com/icdpedroechague" className="text-white/70 hover:text-white" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z"></path></svg>
            </Link>
            <Link href="https://wa.me/5491136391151" className="text-white/70 hover:text-white" aria-label="Whatsapp">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.67.96.98-3.58-.24-.38A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.03 2.82 1.18 3.02c.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"></path></svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
