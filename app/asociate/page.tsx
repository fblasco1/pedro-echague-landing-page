import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { Heart, Home, Flag } from "lucide-react"
import { AsociateFaq } from "./faq"

const WHATSAPP = "https://wa.me/5491136391151"

export const metadata: Metadata = {
  title: "Hacete socio del Club Pedro Echagüe | Tu casa en Flores",
  description:
    "Sumate al Club Pedro Echagüe. Iniciá tu pre-asociación online para vos y tu familia. Te acompañamos paso a paso hasta darte el alta definitiva.",
  keywords: [
    "club pedro echagüe",
    "asociarse",
    "pre-asociación",
    "inscripción",
    "socios",
    "cuota social",
    "grupo familiar",
    "secretaría",
  ],
  openGraph: {
    title: "Hacete socio del Club Pedro Echagüe | Tu casa en Flores",
    description:
      "Sumate al Club Pedro Echagüe. Iniciá tu pre-asociación online para vos y tu familia. Te acompañamos paso a paso hasta darte el alta definitiva.",
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
      "Cargá tu información y la de tu grupo familiar si querés sumar a los tuyos. Tené a mano DNI, una foto y la ficha médica. Te toma cinco minutos.",
  },
  {
    n: "02",
    titulo: "Quedás pre-asociado",
    texto:
      "Al enviar el formulario, ya damos el primer paso. Recibimos tu solicitud y te damos un código de seguimiento mientras preparamos todo para tu alta definitiva.",
  },
  {
    n: "03",
    titulo: "Te contactamos",
    texto:
      "Desde Secretaría revisamos tus datos y te escribimos por WhatsApp para coordinar lo que falta.",
  },
  {
    n: "04",
    titulo: "Alta definitiva",
    texto:
      "Con la documentación validada, te damos la bienvenida oficial. En ese momento te confirmamos el valor de la cuota y cómo podés abonarla.",
  },
]

export default function AsociatePage() {
  return (
    <div className="min-h-screen bg-club-blue text-white">
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <Image
          src="/portada.jpg"
          alt=""
          fill
          priority
          className="object-cover z-0"
          style={{ objectPosition: "center 28%" }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-club-blue via-club-blue/70 to-black/30" />
        <div className="relative z-10 container mx-auto px-4 pb-16 pt-28 sm:pb-20">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.25em] text-club-yellow mb-4">
            Campaña de socios
          </p>
          <h1 className="font-raleway text-4xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-4xl">
            Tu club. Tu barrio.
            <br />
            <span className="text-club-yellow">Tu segunda casa.</span>
          </h1>
          <p className="mt-6 max-w-xl font-roboto text-lg text-white/90">
            Más de 90 años de historia en Flores. Empezá tu pre-asociación
            online y sumate a la familia de Echagüe. Te acompañamos en cada paso
            hasta darte el alta.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/asociate/inscripcion"
              className="inline-flex items-center justify-center bg-club-yellow text-club-blue px-8 py-4 rounded-md font-raleway font-bold text-lg hover:bg-club-yellow/90"
            >
              Quiero ser socio
            </Link>
            <a
              href="#como"
              className="inline-flex items-center justify-center border border-white/40 px-8 py-4 rounded-md font-raleway font-bold text-lg hover:bg-white/10"
            >
              Ver cómo es el proceso
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white text-club-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-blue/50 mb-3">
            01 · ¿Por qué ser socio?
          </p>
          <h2 className="font-raleway text-3xl sm:text-5xl font-bold max-w-2xl leading-tight mb-6">
            El orgullo de ser parte del club
          </h2>
          <p className="font-roboto text-lg text-gray-600 max-w-2xl mb-12">
            Echagüe lo hacemos entre todos. Asociarte es mucho más que venir a
            hacer deporte: es hacer crecer tu casa en Flores y bancar los
            colores para las generaciones que vienen.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <article>
              <Heart className="h-8 w-8 text-club-blue mb-3" />
              <h3 className="font-raleway text-xl font-bold mb-2">Pertenencia</h3>
              <p className="font-roboto text-gray-600">
                Ser del club se lleva en la sangre. Es un compromiso de todos
                los días y la mejor forma de involucrarte para que esta gran
                familia siga creciendo.
              </p>
            </article>
            <article>
              <Flag className="h-8 w-8 text-club-blue mb-3" />
              <h3 className="font-raleway text-xl font-bold mb-2">Historia</h3>
              <p className="font-roboto text-gray-600">
                Nacimos en 1934. Asociarte es honrar el esfuerzo de los que
                estuvieron antes y asegurar que el club siga latiendo fuerte en
                el barrio.
              </p>
            </article>
            <article>
              <Home className="h-8 w-8 text-club-blue mb-3" />
              <h3 className="font-raleway text-xl font-bold mb-2">Comunidad</h3>
              <p className="font-roboto text-gray-600">
                Amistad, familia y trabajo en equipo. En Echagüe tiramos todos
                para el mismo lado, hombro con hombro.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="como" className="bg-club-blue text-white py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-yellow mb-3">
            02 · El proceso
          </p>
          <h2 className="font-raleway text-3xl sm:text-5xl font-bold max-w-3xl leading-tight mb-4">
            Cómo sumarte a la familia, paso a paso
          </h2>
          <p className="font-roboto text-lg text-white/80 max-w-2xl mb-12">
            Es fácil: dejás tus datos, quedás pre-asociado y desde Secretaría nos
            ocupamos de contactarte para cerrar tu alta.
          </p>
          <ol className="grid md:grid-cols-2 gap-8">
            {PASOS.map((paso) => (
              <li key={paso.n} className="flex gap-4">
                <span className="font-raleway text-3xl font-bold text-club-yellow shrink-0 w-14">
                  {paso.n}
                </span>
                <div>
                  <h3 className="font-raleway text-xl font-bold mb-2">{paso.titulo}</h3>
                  <p className="font-roboto text-white/75">{paso.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="sumate" className="bg-white text-club-blue py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-blue/50 mb-3">
            03 · Asociate
          </p>
          <h2 className="font-raleway text-3xl sm:text-5xl font-bold leading-tight mb-4">
            Un solo formulario para vos y tu familia
          </h2>
          <p className="font-roboto text-gray-600 mb-6">
            Podés arrancar tu pre-asociación solo o sumar a los tuyos en el mismo
            lugar: primero cargás tus datos y en la siguiente pantalla agregás a
            tu familia.
          </p>
          <p className="font-roboto text-club-blue font-medium mb-8">
            Si se asocian en grupo familiar, tienen descuento en la cuota social
            a partir del segundo integrante.
          </p>
          <Link
            href="/asociate/inscripcion"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-club-yellow text-club-blue px-10 py-4 rounded-md font-raleway font-bold text-lg hover:bg-club-yellow/90"
          >
            Arrancar mi solicitud
          </Link>
          <p className="mt-8 font-roboto text-sm text-gray-600">
            Al hacer clic, iniciás tu pre-asociación. Luego, Secretaría te va a
            escribir por WhatsApp para terminar el proceso y darte el alta
            definitiva.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <Link
              href="/socios/cuota"
              className="font-raleway font-bold text-club-blue hover:underline"
            >
              Ver valores de cuota →
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-raleway font-bold text-club-blue hover:underline"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.67.96.98-3.58-.24-.38A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.03 2.82 1.18 3.02c.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
              </svg>
              Escribir a Secretaría →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-club-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-club-yellow mb-3">
            04 · Preguntas frecuentes
          </p>
          <h2 className="font-raleway text-3xl sm:text-4xl font-bold mb-8">Dudas rápidas</h2>
          <AsociateFaq />
        </div>
      </section>

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
