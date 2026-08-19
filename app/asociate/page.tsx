import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import {
  Check,
  Heart,
  Home,
  Flag,
  IdCard,
  Users,
  Dumbbell,
  Calendar,
} from "lucide-react"
import { AsociateFaq } from "./faq"

const WHATSAPP = "https://wa.me/5491136391151"

export const metadata: Metadata = {
  title: "Sumate | Asociate al Club Pedro Echagüe",
  description:
    "Pre-asociate online al Club Pedro Echagüe. Completá la solicitud, Secretaría revisa tu documentación y te contacta para el alta. Sin pago en la web.",
  keywords: [
    "club pedro echagüe",
    "asociarse",
    "pre-asociación",
    "inscripción",
    "socios",
    "cuota social",
    "secretaría",
  ],
  openGraph: {
    title: "Sumate al Club Pedro Echagüe",
    description:
      "Completá la solicitud online, quedá pre-asociado y Secretaría te acompaña hasta el alta. Sin cobro en el sitio.",
    type: "website",
    locale: "es_AR",
    siteName: "Club Pedro Echagüe",
  },
  alternates: {
    canonical: "https://www.icdpedroechague.com.ar/asociate",
  },
}

const PASOS = [
  {
    n: "01",
    titulo: "Completá la solicitud",
    texto:
      "Cargá tus datos (y los de tu familia, si querés). Subí DNI, foto y ficha médica. Toma pocos minutos.",
  },
  {
    n: "02",
    titulo: "Quedás pre-asociado",
    texto:
      "Al enviar, Secretaría recibe el trámite y vos un código de seguimiento. Todavía no sos socio activo: el club tiene que validar y cerrar el alta.",
  },
  {
    n: "03",
    titulo: "Te contactamos",
    texto:
      "Secretaría revisa la documentación y te escribe por WhatsApp o te espera en el club para coordinar el siguiente paso.",
  },
  {
    n: "04",
    titulo: "Pagás la cuota y te damos el alta",
    texto:
      "El pago es presencial o por transferencia: no se cobra en esta web. Cuando está todo en orden, Secretaría te da el alta y accedés a las actividades.",
  },
]

export default function AsociatePage() {
  return (
    <div className="min-h-screen bg-club-blue text-white">
      {/* 01 · Hero campaña */}
      <section className="relative min-h-[92vh] flex items-end">
        <Image
          src="/portada.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 28%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-club-blue via-club-blue/70 to-black/30" />
        <div className="relative z-10 container mx-auto px-4 pb-16 pt-28 sm:pb-20">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.25em] text-club-yellow mb-4">
            Campaña de socios
          </p>
          <h1 className="font-raleway text-4xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-4xl">
            Somos Flores.
            <br />
            <span className="text-club-yellow">Seamos socios.</span>
          </h1>
          <p className="mt-6 max-w-xl font-roboto text-lg text-white/90">
            Más de 90 años de barrio, deporte y familia. Pre-asociate hoy: el
            club te acompaña hasta el alta. Sin pago online.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#sumate"
              className="inline-flex items-center justify-center bg-club-yellow text-club-blue px-8 py-4 rounded-md font-raleway font-bold text-lg hover:bg-club-yellow/90"
            >
              Asociate ahora →
            </a>
            <a
              href="#como"
              className="inline-flex items-center justify-center border border-white/40 px-8 py-4 rounded-md font-raleway font-bold text-lg hover:bg-white/10"
            >
              Cómo es el proceso
            </a>
          </div>
        </div>
      </section>

      {/* 02 · Por qué */}
      <section className="bg-white text-club-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-blue/50 mb-3">
            02 · ¿Por qué ser socio?
          </p>
          <h2 className="font-raleway text-3xl sm:text-5xl font-bold max-w-2xl leading-tight mb-6">
            Inmortalizá tu lugar en el club
          </h2>
          <p className="font-roboto text-lg text-gray-600 max-w-2xl mb-12">
            El Pedro Echagüe se sostiene entre todos. Asociarte es pertenecer:
            deporte, cultura y una casa en Flores para las generaciones que
            vienen.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <article>
              <Heart className="h-8 w-8 text-club-blue mb-3" />
              <h3 className="font-raleway text-xl font-bold mb-2">Pertenencia</h3>
              <p className="font-roboto text-gray-600">
                Ser del club es un compromiso de todos los días. Involucrarte es
                hacer crecer esta casa.
              </p>
            </article>
            <article>
              <Flag className="h-8 w-8 text-club-blue mb-3" />
              <h3 className="font-raleway text-xl font-bold mb-2">Historia</h3>
              <p className="font-roboto text-gray-600">
                Desde 1934. Honrás lo que heredamos y garantizás que siga
                latiendo en el barrio.
              </p>
            </article>
            <article>
              <Home className="h-8 w-8 text-club-blue mb-3" />
              <h3 className="font-raleway text-xl font-bold mb-2">Comunidad</h3>
              <p className="font-roboto text-gray-600">
                Familia, amistad y trabajo en equipo: al club lo empujamos
                juntos, espalda con espalda.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 03 · Beneficios */}
      <section className="bg-club-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-yellow mb-3">
            03 · Beneficios
          </p>
          <h2 className="font-raleway text-3xl sm:text-5xl font-bold mb-12">
            Ser socio tiene premio
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: IdCard,
                t: "Carnet de socio",
                d: "Tu lugar en el club, con categoría y número, cuando Secretaría complete el alta.",
              },
              {
                icon: Dumbbell,
                t: "Actividades",
                d: "Básquet, fútbol, vóley, gimnasio, patín, danza y más. Elegís al pre-asociarte.",
              },
              {
                icon: Users,
                t: "Grupo familiar",
                d: "Un trámite para titular, cónyuge e hijos. Cada uno con su categoría y deportes.",
              },
              {
                icon: Calendar,
                t: "Vida del club",
                d: "Eventos, torneos y la Casona: el calendario social que sostiene al barrio.",
              },
            ].map((item) => (
              <article
                key={item.t}
                className="border border-white/15 rounded-lg p-6 bg-white/5"
              >
                <item.icon className="h-7 w-7 text-club-yellow mb-4" />
                <h3 className="font-raleway text-lg font-bold mb-2">{item.t}</h3>
                <p className="font-roboto text-sm text-white/75">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · Cómo es el flujo */}
      <section id="como" className="bg-white text-club-blue py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-blue/50 mb-3">
            04 · El proceso
          </p>
          <h2 className="font-raleway text-3xl sm:text-5xl font-bold max-w-3xl leading-tight mb-4">
            Cómo asociarte, paso a paso
          </h2>
          <p className="font-roboto text-lg text-gray-600 max-w-2xl mb-12">
            No hay pago en el sitio. Completás la solicitud, quedás pre-asociado
            y Secretaría cierra el alta con vos.
          </p>
          <ol className="grid md:grid-cols-2 gap-8">
            {PASOS.map((paso) => (
              <li key={paso.n} className="flex gap-4">
                <span className="font-raleway text-3xl font-bold text-club-yellow shrink-0 w-14">
                  {paso.n}
                </span>
                <div>
                  <h3 className="font-raleway text-xl font-bold mb-2">{paso.titulo}</h3>
                  <p className="font-roboto text-gray-600">{paso.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 · Packs */}
      <section id="sumate" className="bg-club-blue py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-yellow mb-3">
            05 · Asociate
          </p>
          <h2 className="font-raleway text-3xl sm:text-5xl font-bold mb-3">Elegí cómo sumarte</h2>
          <p className="font-roboto text-white/80 max-w-2xl mb-10">
            Los dos caminos usan el mismo formulario. En familiar, después de
            tus datos cargás al resto del grupo.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <article className="rounded-lg bg-white text-club-blue p-8 flex flex-col">
              <p className="font-raleway text-xs font-bold uppercase tracking-widest text-club-blue/50 mb-2">
                Para vos
              </p>
              <h3 className="font-raleway text-2xl font-bold mb-4">Individual</h3>
              <ul className="font-roboto text-gray-600 space-y-3 mb-8 flex-1">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 shrink-0 text-club-blue" />
                  Categorías Activo, Adherente, Menor o Jubilado, según edad.
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 shrink-0 text-club-blue" />
                  Elegís actividades o te anotás sin deporte y lo definís con
                  Secretaría.
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 shrink-0 text-club-blue" />
                  Cuota según categoría: los valores vigentes están en el sitio.
                </li>
              </ul>
              <Link
                href="/asociate/inscripcion"
                className="inline-flex items-center justify-center w-full bg-club-yellow text-club-blue px-6 py-4 rounded-md font-raleway font-bold hover:bg-club-yellow/90"
              >
                Quiero asociarme
              </Link>
            </article>
            <article className="rounded-lg border-2 border-club-yellow p-8 flex flex-col bg-white/5">
              <p className="font-raleway text-xs font-bold uppercase tracking-widest text-club-yellow mb-2">
                Para toda la familia
              </p>
              <h3 className="font-raleway text-2xl font-bold mb-4">Familiar</h3>
              <ul className="font-roboto text-white/80 space-y-3 mb-8 flex-1">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 shrink-0 text-club-yellow" />
                  Titular + cónyuge e hijos en un solo trámite.
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 shrink-0 text-club-yellow" />
                  Cada persona con su categoría y sus actividades.
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 shrink-0 text-club-yellow" />
                  Secretaría valida a cada integrante y arma el grupo familiar.
                </li>
              </ul>
              <Link
                href="/asociate/inscripcion"
                className="inline-flex items-center justify-center w-full bg-club-yellow text-club-blue px-6 py-4 rounded-md font-raleway font-bold hover:bg-club-yellow/90"
              >
                Quiero asociar a mi familia
              </Link>
            </article>
          </div>
          <p className="mt-8 max-w-3xl font-roboto text-sm text-white/80 flex gap-2">
            <Check className="h-5 w-5 shrink-0 text-club-yellow" />
            Al enviar la solicitud quedás pre-asociado. Secretaría te contacta
            por WhatsApp para terminar el proceso y darte el alta definitiva. El
            pago de la cuota no se hace en esta página.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/socios/cuota"
              className="font-raleway font-bold text-club-yellow hover:underline"
            >
              Ver valores de cuota →
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="font-raleway font-bold text-white hover:text-club-yellow"
            >
              Escribir a Secretaría →
            </a>
          </div>
        </div>
      </section>

      {/* 06 · FAQ */}
      <section className="bg-club-blue border-t border-white/10 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-yellow mb-3">
            06 · Preguntas frecuentes
          </p>
          <h2 className="font-raleway text-3xl sm:text-4xl font-bold mb-8">Dudas rápidas</h2>
          <AsociateFaq />
        </div>
      </section>
    </div>
  )
}
