import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Asociate al Club Pedro Echagüe | Formulario de Inscripción",
  description: "Formá parte del Club Pedro Echagüe. Accedé a todas las actividades deportivas, instalaciones de primer nivel y nuestra gran comunidad. Contactá a secretaría por WhatsApp para más información.",
  keywords: [
    "club pedro echagüe",
    "asociarse",
    "inscripción",
    "deportes",
    "básquet",
    "fútbol",
    "gimnasio",
    "actividades deportivas",
    "socios",
    "cuota social",
    "secretaría",
    "whatsapp"
  ],
  openGraph: {
    title: "Asociate al Club Pedro Echagüe",
    description: "Formá parte de nuestra gran familia deportiva y social. Accedé a todas las actividades y instalaciones del club.",
    type: "website",
    locale: "es_AR",
    siteName: "Club Pedro Echagüe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asociate al Club Pedro Echagüe",
    description: "Formá parte de nuestra gran familia deportiva y social.",
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
  alternates: {
    canonical: "https://www.icdpedroechague.com.ar/asociate",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Club Pedro Echagüe",
      "description": "Club deportivo y social con actividades como básquet, fútbol, gimnasio y más",
      "url": "https://www.icdpedroechague.com.ar",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+54-9-11-3639-1151",
        "contactType": "customer service",
        "availableLanguage": "Spanish"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AR"
      },
      "sameAs": [
        "https://wa.me/5491136391151"
      ]
    })
  },
}

export default function AsociatePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-club-blue mb-4 font-raleway">Asociate al Club Pedro Echagüe</h1>
            <p className="text-xl text-gray-600 font-roboto">
              Formá parte de nuestra gran familia deportiva y social
            </p>
          </header>

        {/* Main Content */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Benefits */}
          <article className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">¿Por qué asociarte?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-club-blue rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Acceso a todas las actividades</h3>
                  <p className="text-gray-600 text-sm">Básquet, fútbol, gimnasio, y más disciplinas deportivas</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-club-blue rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Instalaciones de primer nivel</h3>
                  <p className="text-gray-600 text-sm">Gimnasio, canchas, salón de eventos y más</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-club-blue rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Comunidad y amistad</h3>
                  <p className="text-gray-600 text-sm">Conocé gente nueva y formá parte de nuestra historia</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-club-blue rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Eventos y actividades sociales</h3>
                  <p className="text-gray-600 text-sm">Participá de fiestas, torneos y celebraciones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <article className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">¿Cómo asociarte?</h2>
            
            <div className="space-y-6">
              <div className="bg-club-blue/10 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-club-blue">Contactá a Secretaría</h3>
                    <p className="text-gray-600">Escribinos por WhatsApp</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Para asociarte al club, escribí a nuestra secretaría por WhatsApp. Te van a informar sobre:
                </p>
                
                <ul className="text-sm text-gray-600 space-y-1 mb-6">
                  <li>• Documentación requerida</li>
                  <li>• Valores de cuota según tu categoría</li>
                  <li>• Proceso de inscripción</li>
                  <li>• Horarios de atención</li>
                </ul>
                
                <a
                  href="https://wa.me/5491136391151"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-green-500 text-white px-6 py-4 rounded-md hover:bg-green-600 transition-colors font-medium text-lg"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Escribir a Secretaría
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway text-center">Información Adicional</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-club-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-club-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-club-blue mb-2">Valores Accesibles</h3>
              <p className="text-gray-600 text-sm">Cuotas diferenciadas según categoría y edad</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-club-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-club-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-club-blue mb-2">Proceso Simple</h3>
              <p className="text-gray-600 text-sm">Documentación básica y trámite rápido</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-club-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-club-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-club-blue mb-2">Ubicación Céntrica</h3>
              <p className="text-gray-600 text-sm">Fácil acceso en el corazón de la ciudad</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="text-center">
          <Link
            href="/socios/cuota"
            className="inline-flex items-center justify-center bg-club-yellow text-club-blue px-8 py-4 rounded-md hover:bg-club-yellow/90 transition-colors font-bold text-lg font-raleway"
            aria-label="Ver valores de cuota del club"
          >
            Ver Valores de Cuota
          </Link>
        </section>
        </div>
      </main>
  )
}