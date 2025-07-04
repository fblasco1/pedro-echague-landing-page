import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Timeline } from "@/components/timeline"
import { getAllActividades } from "@/lib/sanity/actividades"

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
          <div className="grid md:grid-cols-2 gap-8 items-center">
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
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Historia del Club Pedro Echagüe"
                fill
                className="object-cover"
              />
            </div>
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

      <footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-white/70 md:text-left font-roboto">
            © {new Date().getFullYear()} Club Pedro Echagüe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-white/70 hover:text-white font-roboto"
            >
              Política de Privacidad
            </Link>
            <Link
              href="#"
              className="text-sm text-white/70 hover:text-white font-roboto"
            >
              Términos de Servicio
            </Link>
            <Link
              href="#"
              className="text-sm text-white/70 hover:text-white font-roboto"
            >
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
