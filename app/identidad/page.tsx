import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Timeline } from "@/components/timeline"
import { getAllActividades } from "@/lib/sanity/actividades"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Identidad",
  description: "Conocé la historia y valores del Club Pedro Echagüe. Más de 90 años de tradición deportiva y cultural. Nuestra misión, visión y los valores que nos definen como comunidad.",
  keywords: [
    "identidad",
    "historia",
    "club pedro echagüe",
    "valores del club",
    "misión",
    "visión",
    "tradición deportiva",
    "historia del club",
    "comunidad",
    "cultura deportiva",
    "escudos históricos",
    "fundación 1934"
  ],
  openGraph: {
    title: "Identidad | Club Pedro Echagüe",
    description: "Conocé la historia y valores del Club Pedro Echagüe. Más de 90 años de tradición deportiva y cultural.",
    type: "website",
    url: "https://www.icdpedroechague.com.ar/identidad",
    images: [
      {
        url: "/images/logo-historico-1.png",
        width: 1200,
        height: 630,
        alt: "Identidad del Club Pedro Echagüe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Identidad | Club Pedro Echagüe",
    description: "Conocé la historia y valores del Club Pedro Echagüe. Más de 90 años de tradición.",
    images: ["/images/logo-historico-1.png"],
  },
  alternates: {
    canonical: "https://www.icdpedroechague.com.ar/identidad",
  },
}

// Datos de los escudos históricos
const escudosHistoricos = [
  {
    id: 1,
    periodo: "Hasta 2014",
    imagen: "/images/logo-historico-2.png",
    descripcion: "Antigua versión del escudo.",
  },
  {
    id: 2,
    periodo: "Hasta 2014",
    imagen: "/images/logo-historico-3.png",
    descripcion: "Antigua versión del escudo.",
  },
  {
    id: 3,
    periodo: "2014-Act.",
    imagen: "/images/logo-historico-1.png",
    descripcion: "Escudo que se sigue utilizando en la actualidad en indumentaria y merchandising.",
  },
]

export default async function IdentidadPage() {
  // Traer actividades desde Sanity
  const actividades = await getAllActividades()
  // Filtrar solo federadas y con logo
  const actividadesFederadas = actividades.filter(
    (a) => a.logo?.asset?.url
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header actividades={actividades} />

      {/* Header específico para Identidad */}
      <PageHeader
        title="IDENTIDAD"
        backgroundImage=""
        hashtag="ELCLUBDEFLORES"
        backLink="/"
      />

      <main className="container py-12 px-4 md:px-6">
        {/* Historia del club */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">
            Nuestra Historia
          </h2>
          <div className="prose prose-blue">
            <p className="text-club-dark/80 font-roboto">
              El Club Pedro Echagüe fue fundado el 17 de octubre de 1934 por un
              grupo de 25 jóvenes que, tras ganar un
              torneo de fútbol, decidieron crear un espacio para la práctica deportiva y cultural en el barrio de
              Flores.
            </p>
            <p className="text-club-dark/80 font-roboto mt-4">
              Originalmente llamado Club Nacional Argentino, en 1940 cambió su nombre a "Institución cultural y
              deportiva Pedro Echagüe" por disposición del gobierno nacional, en honor al reconocido escritor y
              dramaturgo argentino.
            </p>
            <p className="text-club-dark/80 font-roboto mt-4">
              A lo largo de sus más de 90 años de historia, el club ha sido testigo de importantes transformaciones,
              superando desafíos como la reconstrucción completa del edificio en la década del '60 y consolidándose
              como un referente deportivo y cultural en la zona sur de la Ciudad de Buenos Aires.
            </p>
          </div>


          {/* Timeline de la historia */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-club-blue mb-6 font-raleway">
              Línea de tiempo histórica
            </h3>
            <div className="bg-club-blue rounded-lg overflow-hidden">
              <Timeline />
            </div>
          </div>
        </section>

        {/* Escudo y colores */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">
            Escudo y Colores
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden order-2 md:order-1">
              <Image
                src="/logo.svg"
                alt="Escudo del Club Pedro Echagüe"
                fill
                className="object-contain p-8"
              />
            </div>
            <div className="prose prose-blue order-1 md:order-2">
              <p className="text-club-dark/80 font-roboto">
                Los colores institucionales del Club Pedro Echagüe son el azul y el amarillo, que representan los
                valores de lealtad, perseverancia y optimismo que caracterizan a nuestra institución.
              </p>
              <p className="text-club-dark/80 font-roboto mt-4">
                El escudo, símbolo de nuestra identidad, ha evolucionado a lo largo de los años manteniendo siempre los
                colores característicos y elementos que representan las actividades deportivas y culturales del club.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-club-blue rounded-full"></div>
                  <span className="text-sm mt-2 text-club-dark/80 font-roboto">
                    Azul
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-club-yellow rounded-full"></div>
                  <span className="text-sm mt-2 text-club-dark/80 font-roboto">
                    Amarillo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Escudos históricos */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-club-blue mb-6 font-raleway">
              Evolución del Escudo
            </h3>
            <p className="text-club-dark/80 font-roboto mb-8">
              A lo largo de su historia, el escudo del Club Pedro Echagüe ha experimentado diversas transformaciones,
              manteniendo siempre la esencia de sus colores y su identidad. Aquí presentamos la evolución histórica de
              nuestro emblema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {escudosHistoricos.map((escudo) => (
                <div
                  key={escudo.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center"
                >
                  <div className="relative w-48 h-48 mb-4">
                    <Image
                      src={escudo.imagen || "/placeholder.svg"}
                      alt={`Escudo histórico ${escudo.periodo}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                    {escudo.periodo}
                  </h4>
                  <p className="text-sm text-club-dark/70 font-roboto text-center">
                    {escudo.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logos de actividades federadas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">
            Logos de Actividades Federadas
          </h2>
          <p className="text-club-dark/80 font-roboto mb-8">
            Cada actividad federada del Club Pedro Echagüe cuenta con su propio logo distintivo, manteniendo la
            identidad visual del club pero adaptándose a las características de cada disciplina.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {actividadesFederadas.map((actividad) => (
              <div key={actividad._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="relative aspect-square mb-4">
                  {actividad.logo?.asset?.url ? (
                    <Image
                      src={actividad.logo.asset.url}
                      alt={`Logo de ${actividad.title}`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      Sin logo
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                  {actividad.title}
                </h3>

              </div>
            ))}
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-club-blue mb-6 font-raleway">
            Valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-club-blue/20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                Amistad
              </h3>
              <p className="text-club-dark/80 font-roboto">
                Vínculo que une a quienes transitan el club y le da sentido de comunidad a cada encuentro.
              </p>
            </div>
            <div className="bg-white border border-club-blue/20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                Solidaridad
              </h3>
              <p className="text-club-dark/80 font-roboto">
                Compromiso activo con los demás y con el crecimiento colectivo.
              </p>
            </div>
            <div className="bg-white border border-club-blue/20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                Familia
              </h3>
              <p className="text-club-dark/80 font-roboto">
                El club como espacio compartido donde se transmiten y construyen valores a través del tiempo.
              </p>
            </div>
            <div className="bg-white border border-club-blue/20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                Compromiso
              </h3>
              <p className="text-club-dark/80 font-roboto">
                Entrega genuina en cada acción, dentro y fuera de la cancha.
              </p>
            </div>
            <div className="bg-white border border-club-blue/20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                Identidad
              </h3>
              <p className="text-club-dark/80 font-roboto">
                Orgullo por la historia y el presente del club, con raíces profundas en el barrio.
              </p>
            </div>
            <div className="bg-white border border-club-blue/20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-club-blue mb-2 font-raleway">
                Trabajo en equipo
              </h3>
              <p className="text-club-dark/80 font-roboto">
                Entendemos que todo logro es el resultado del esfuerzo colectivo.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white">
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
  )
}
