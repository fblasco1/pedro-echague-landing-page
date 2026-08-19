"use client"

import type { ReactNode } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const WHATSAPP = "https://wa.me/5491136391151"

const PREGUNTAS: { q: string; a: ReactNode }[] = [
  {
    q: "¿Ya soy socio apenas mando el formulario?",
    a: "No, al enviarlo quedás pre-asociado. Secretaría recibe tu pedido, revisa que esté todo bien y te contactamos para validar documentos, coordinar el pago y darte el alta definitiva. Recordá que ser socio te hace parte del club, pero no incluye el acceso automático a los deportes; para eso necesitás abonar el arancel de la actividad correspondiente.",
  },
  {
    q: "¿Qué documentos tengo que subir?",
    a: "Vas a necesitar una foto de tu DNI (frente y dorso), una foto de perfil y tu ficha médica o apto físico. Si te asociás como jubilado, sumá tu comprobante de haberes. Para los menores, necesitamos también los datos y documentos del adulto responsable.",
  },
  {
    q: "¿Puedo asociar a toda mi familia junta?",
    a: "¡Obvio! En el mismo formulario cargás tus datos primero y después podés sumar a tu cónyuge e hijos. Secretaría revisa a cada uno, y acordate que en el grupo familiar hay descuento en la cuota social a partir del segundo integrante.",
  },
  {
    q: "¿Puedo pagar la cuota online?",
    a: "Por ahora no. Esta página es solo para pre-asociarte y agilizar el trámite. El pago lo vas a hacer en el club o por los medios que te pase Secretaría cuando hablemos con vos.",
  },
  {
    q: "Ya soy socio del club, ¿me sirve esta página?",
    a: (
      <>
        No, esta campaña es solo para los que quieren sumarse por primera vez. Si
        ya sos socio y tenés dudas sobre tu cuota o las disciplinas,{" "}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-club-yellow hover:underline"
        >
          <svg
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.67.96.98-3.58-.24-.38A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.03 2.82 1.18 3.02c.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
          </svg>
          escribinos al WhatsApp de Secretaría
        </a>
        .
      </>
    ),
  },
]

export function AsociateFaq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {PREGUNTAS.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`} className="border-white/20">
          <AccordionTrigger className="text-left font-raleway text-base font-semibold text-white hover:no-underline hover:text-club-yellow">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="font-roboto text-white/80 leading-relaxed">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
