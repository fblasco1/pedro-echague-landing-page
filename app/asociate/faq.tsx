"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const PREGUNTAS = [
  {
    q: "¿Quedo asociado apenas envío el formulario?",
    a: "Quedás pre-asociado: Secretaría recibe tu solicitud y la revisa. El alta definitiva la completa el club después de validar la documentación y de que pagues la primera cuota. No hay cobro en esta web.",
  },
  {
    q: "¿Cómo es el proceso, paso a paso?",
    a: "1) Completás la solicitud online (vos o tu familia) y subís DNI, foto y ficha médica. 2) Recibís un código de seguimiento. 3) Secretaría te contacta por WhatsApp o en el club. 4) Pagás la cuota en Secretaría o por transferencia. 5) Te dan el alta y ya podés usar el club y las actividades.",
  },
  {
    q: "¿Qué documentación necesito?",
    a: "DNI (frente y dorso), foto de perfil y ficha médica / apto físico. Si te asociás como Jubilado, también el comprobante de haberes. Los menores necesitan datos y documentos del adulto responsable.",
  },
  {
    q: "¿Puedo asociar a toda la familia?",
    a: "Sí. En el mismo trámite cargás al titular y, si querés, cónyuge e hijos. Cada persona elige sus actividades. Secretaría valida persona por persona.",
  },
  {
    q: "¿Hay pago online?",
    a: "Todavía no. El sitio solo toma la pre-asociación. El pago de la cuota se hace en el club o por los medios que te indique Secretaría cuando te contacte.",
  },
  {
    q: "Ya soy socio, ¿me sirve esta página?",
    a: "Esta campaña es para nuevas asociaciones. Si ya sos socio y tenés una consulta de cuota o actividades, escribinos a Secretaría por WhatsApp.",
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
