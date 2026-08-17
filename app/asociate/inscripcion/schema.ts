import { z } from "zod"

const dniRegex = /^\d{7,8}$/

export const actividadSeleccionSchema = z.object({
  actividad: z.string().min(1),
  grupo_actividad: z.string().optional(),
})

export const adjuntosSchema = z.object({
  dni_frente: z.string().min(1, "Subí el frente del DNI"),
  dni_dorso: z.string().min(1, "Subí el dorso del DNI"),
  foto_perfil: z.string().min(1, "Subí una foto de perfil"),
  ficha_medica: z.string().min(1, "Subí la ficha médica (PDF o imagen)"),
  comprobante_jubilado: z.string().optional().default(""),
})

export const tutorFieldsSchema = z.object({
  dni_tutor: z.string().optional().default(""),
  nombre_tutor: z.string().optional().default(""),
  apellido_tutor: z.string().optional().default(""),
  fecha_nacimiento_tutor: z.string().optional().default(""),
  nacionalidad_tutor: z.string().optional().default("Argentina"),
  genero_tutor: z
    .enum(["Masculino", "Femenino", "Otro", "Prefiero no decir", ""])
    .optional()
    .default(""),
  rol_tutor: z.enum(["Padre", "Madre", "Tutor", ""]).optional().default(""),
  email_tutor: z.string().optional().default(""),
  telefono_movil_tutor: z.string().optional().default(""),
  telefono_fijo_tutor: z.string().optional().default(""),
  calle_tutor: z.string().optional().default(""),
  numero_tutor: z.string().optional().default(""),
  piso_tutor: z.string().optional().default(""),
  departamento_tutor: z.string().optional().default(""),
  provincia_tutor: z.string().optional().default(""),
  ciudad_tutor: z.string().optional().default(""),
  localidad_barrio_tutor: z.string().optional().default(""),
  codigo_postal_tutor: z.string().optional().default(""),
  dni_frente_tutor: z.string().optional().default(""),
  dni_dorso_tutor: z.string().optional().default(""),
  foto_perfil_tutor: z.string().optional().default(""),
})

export function edadDesdeNacimiento(fecha: string, hoy = new Date()): number {
  const nac = new Date(fecha)
  if (Number.isNaN(nac.getTime())) return 0
  let edad = hoy.getFullYear() - nac.getFullYear()
  const m = hoy.getMonth() - nac.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad -= 1
  return edad
}

export type CategoriaSolicitada = "Activo" | "Menor" | "Adherente" | "Jubilado"

/** Actividades permitidas para Adherente (deben coincidir con el catálogo Frappe). */
export const ACTIVIDADES_ADHERENTE = [
  "Gimnasio Fitness",
  "Funcional",
  "Yoga",
  "Crossfit",
] as const

export function esActividadAdherente(valueOrLabel: string): boolean {
  const key = valueOrLabel.trim().toLowerCase()
  return ACTIVIDADES_ADHERENTE.some((a) => a.toLowerCase() === key)
}

export function categoriaPorEdad(fechaNacimiento: string): "Activo" | "Menor" {
  return edadDesdeNacimiento(fechaNacimiento) < 18 ? "Menor" : "Activo"
}

/** Categorías elegibles según edad (Adherente en ambos; Jubilado solo adulto). */
export function categoriasDisponibles(fechaNacimiento: string): CategoriaSolicitada[] {
  if (!fechaNacimiento || !/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
    return ["Activo", "Adherente", "Jubilado"]
  }
  return edadDesdeNacimiento(fechaNacimiento) < 18
    ? ["Menor", "Adherente"]
    : ["Activo", "Adherente", "Jubilado"]
}

export function esMenorPersona(p: {
  categoria_solicitada?: string
  fecha_nacimiento?: string
}): boolean {
  if (p.categoria_solicitada === "Menor") return true
  if (p.fecha_nacimiento) return edadDesdeNacimiento(p.fecha_nacimiento) < 18
  return false
}

function requireTutorFields(
  data: z.infer<typeof tutorFieldsSchema> & { fecha_nacimiento?: string },
  ctx: z.RefinementCtx,
  pathPrefix: (string | number)[] = []
) {
  const issue = (path: string, message: string) =>
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message,
      path: [...pathPrefix, path],
    })

  if (!data.dni_tutor || !dniRegex.test(data.dni_tutor)) {
    issue("dni_tutor", "DNI del tutor inválido")
  }
  if (!data.nombre_tutor?.trim()) issue("nombre_tutor", "Nombre del tutor obligatorio")
  if (!data.apellido_tutor?.trim()) issue("apellido_tutor", "Apellido del tutor obligatorio")
  if (!data.fecha_nacimiento_tutor) {
    issue("fecha_nacimiento_tutor", "Fecha de nacimiento del tutor")
  } else if (edadDesdeNacimiento(data.fecha_nacimiento_tutor) < 18) {
    issue("fecha_nacimiento_tutor", "El tutor debe ser mayor de 18 años")
  }
  if (!data.genero_tutor) issue("genero_tutor", "Género del tutor obligatorio")
  if (!data.rol_tutor) issue("rol_tutor", "Indicá el vínculo (Padre/Madre/Tutor)")
  if (!data.email_tutor || !/.+@.+\..+/.test(data.email_tutor)) {
    issue("email_tutor", "Email del tutor inválido")
  }
  if (!data.telefono_movil_tutor || data.telefono_movil_tutor.length < 8) {
    issue("telefono_movil_tutor", "Teléfono del tutor obligatorio")
  }
  if (!data.nacionalidad_tutor?.trim()) {
    issue("nacionalidad_tutor", "Nacionalidad del tutor obligatoria")
  }
  if (!data.calle_tutor?.trim()) issue("calle_tutor", "Calle del tutor obligatoria")
  if (!data.numero_tutor?.trim()) issue("numero_tutor", "Número del tutor obligatorio")
  if (!data.ciudad_tutor?.trim()) issue("ciudad_tutor", "Ciudad del tutor obligatoria")
  if (!data.provincia_tutor?.trim()) issue("provincia_tutor", "Provincia del tutor obligatoria")
  if (!data.localidad_barrio_tutor?.trim()) {
    issue("localidad_barrio_tutor", "Barrio / localidad del tutor obligatorio")
  }
  if (!data.codigo_postal_tutor?.trim()) issue("codigo_postal_tutor", "CP del tutor obligatorio")
  if (!data.dni_frente_tutor) issue("dni_frente_tutor", "Subí el DNI frente del tutor")
  if (!data.dni_dorso_tutor) issue("dni_dorso_tutor", "Subí el DNI dorso del tutor")
  if (!data.foto_perfil_tutor) issue("foto_perfil_tutor", "Subí la foto del tutor")
}

const personaCoreShape = {
  nombre: z.string().min(1, "Nombre obligatorio"),
  apellido: z.string().min(1, "Apellido obligatorio"),
  dni: z.string().regex(dniRegex, "DNI inválido (7 u 8 dígitos)"),
  nacionalidad: z.string().min(1, "Nacionalidad obligatoria").default("Argentina"),
  fecha_nacimiento: z
    .string()
    .min(1, "Fecha de nacimiento obligatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Usá el formato DD/MM/AAAA"),
  genero: z.enum(["Masculino", "Femenino", "Otro", "Prefiero no decir"], {
    required_error: "Elegí un género",
  }),
  email: z.string().email("Email inválido"),
  telefono_movil: z.string().min(8, "Teléfono obligatorio"),
  telefono_fijo: z.string().optional(),
  calle: z.string().min(1, "Calle obligatoria"),
  numero: z.string().min(1, "Número obligatorio"),
  piso: z.string().optional(),
  departamento: z.string().optional(),
  provincia: z.string().min(1, "Provincia obligatoria"),
  ciudad: z.string().min(1, "Ciudad obligatoria"),
  localidad_barrio: z.string().min(1, "Barrio / localidad obligatorio"),
  codigo_postal: z.string().min(1, "Código postal obligatorio"),
  categoria_solicitada: z.enum(["Activo", "Menor", "Adherente", "Jubilado"], {
    required_error: "Elegí una categoría",
  }),
  rol_en_grupo: z
    .enum(["Titular", "Cónyuge", "Hijo", "Padre", "Madre", "Otro"])
    .optional(),
  sin_actividad: z.boolean().default(false),
  actividades: z.array(actividadSeleccionSchema).default([]),
  tiene_enfermedad: z.enum(["si", "no"], {
    required_error: "Indicá si tenés alguna enfermedad a declarar",
  }),
  ...adjuntosSchema.shape,
  ...tutorFieldsSchema.shape,
}

/** Persona sin exigir tutor en el schema base (se exige a nivel wizard). */
export const personaBaseSchema = z.object(personaCoreShape).superRefine((data, ctx) => {
  const permitidas = categoriasDisponibles(data.fecha_nacimiento)
  if (!permitidas.includes(data.categoria_solicitada)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Esa categoría no está disponible para esta edad",
      path: ["categoria_solicitada"],
    })
  }

  if (data.categoria_solicitada === "Adherente") {
    const permitidas = data.actividades.filter(
      (a) => esActividadAdherente(a.actividad)
    )
    if (!data.sin_actividad && permitidas.length === 0 && data.actividades.length > 0) {
      // Eligió solo deportes no permitidos
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Adherente solo puede elegir Gimnasio Fitness, Funcional, Yoga o Crossfit",
        path: ["actividades"],
      })
    } else if (!data.sin_actividad && permitidas.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Elegí una actividad permitida o marcá «Socio sin actividad»",
        path: ["actividades"],
      })
    }
    return
  }

  if (data.categoria_solicitada === "Jubilado" && !data.comprobante_jubilado?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Subí el comprobante de jubilación o recibo de haberes",
      path: ["comprobante_jubilado"],
    })
  }

  if (!data.sin_actividad && data.actividades.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Elegí al menos una actividad o marcá «Socio sin actividad»",
      path: ["actividades"],
    })
  }
})

export type PersonaForm = z.infer<typeof personaBaseSchema>

/** Titular: si es menor, el bloque tutor es obligatorio en el paso 1. */
export const titularSchema = personaBaseSchema.superRefine((data, ctx) => {
  if (esMenorPersona(data)) {
    requireTutorFields(data, ctx)
  }
})

export const familiarSchema = personaBaseSchema

export const wizardSchema = z
  .object({
    titular: titularSchema,
    familiares: z.array(familiarSchema).default([]),
    acepta_estatutos: z
      .boolean({ required_error: "Debés aceptar los estatutos y reglamentos" })
      .refine((v) => v === true, {
        message: "Debés aceptar los estatutos y reglamentos",
      }),
  })
  .superRefine((data, ctx) => {
    const titularAdulto = !esMenorPersona(data.titular)
    data.familiares.forEach((fam, idx) => {
      if (esMenorPersona(fam) && !titularAdulto) {
        requireTutorFields(fam, ctx, ["familiares", idx])
      }
    })
  })

export type WizardForm = z.infer<typeof wizardSchema>

/** Payload listo para `submit_alta_grupo` (sin campos solo-UI). */
export function toSubmitPayload(values: WizardForm) {
  const strip = (p: PersonaForm, rol?: string, omitTutor = false) => {
    const {
      tiene_enfermedad: _t,
      actividades,
      sin_actividad,
      rol_en_grupo,
      ...rest
    } = p

    const out: Record<string, unknown> = {
      ...rest,
      ...(rol ? { rol_en_grupo: rol } : {}),
      ...(rol_en_grupo && !rol ? { rol_en_grupo } : {}),
      sin_actividad:
        sin_actividad ||
        (rest.categoria_solicitada === "Adherente" &&
          !actividades.some((a) => esActividadAdherente(a.actividad)))
          ? 1
          : 0,
      actividades:
        sin_actividad
          ? []
          : actividades
              .filter((a) =>
                rest.categoria_solicitada === "Adherente"
                  ? esActividadAdherente(a.actividad)
                  : true
              )
              .map((a) => ({
                actividad: a.actividad,
                ...(a.grupo_actividad ? { grupo_actividad: a.grupo_actividad } : {}),
              })),
    }

    if (rest.categoria_solicitada !== "Jubilado") {
      delete out.comprobante_jubilado
    }

    if (omitTutor || !esMenorPersona(p)) {
      for (const key of Object.keys(out)) {
        if (key.endsWith("_tutor") || key === "rol_tutor") {
          delete out[key]
        }
      }
    }

    return out
  }

  const titularAdulto = !esMenorPersona(values.titular)

  return {
    titular: strip(values.titular, "Titular"),
    familiares: values.familiares.map((f) =>
      strip(
        f,
        f.rol_en_grupo && f.rol_en_grupo !== "Titular" ? f.rol_en_grupo : "Otro",
        !!(titularAdulto && esMenorPersona(f))
      )
    ),
  }
}

export const emptyTutorFields = (): z.infer<typeof tutorFieldsSchema> => ({
  dni_tutor: "",
  nombre_tutor: "",
  apellido_tutor: "",
  fecha_nacimiento_tutor: "",
  nacionalidad_tutor: "Argentina",
  genero_tutor: "",
  rol_tutor: "",
  email_tutor: "",
  telefono_movil_tutor: "",
  telefono_fijo_tutor: "",
  calle_tutor: "",
  numero_tutor: "",
  piso_tutor: "",
  departamento_tutor: "",
  provincia_tutor: "Ciudad Autónoma de Buenos Aires",
  ciudad_tutor: "",
  localidad_barrio_tutor: "",
  codigo_postal_tutor: "",
  dni_frente_tutor: "",
  dni_dorso_tutor: "",
  foto_perfil_tutor: "",
})

export const emptyPersona = (): PersonaForm => ({
  nombre: "",
  apellido: "",
  dni: "",
  nacionalidad: "Argentina",
  fecha_nacimiento: "",
  genero: "Masculino",
  email: "",
  telefono_movil: "",
  telefono_fijo: "",
  calle: "",
  numero: "",
  piso: "",
  departamento: "",
  provincia: "Ciudad Autónoma de Buenos Aires",
  ciudad: "",
  localidad_barrio: "",
  codigo_postal: "",
  categoria_solicitada: "Activo",
  sin_actividad: false,
  actividades: [],
  tiene_enfermedad: "no",
  dni_frente: "",
  dni_dorso: "",
  foto_perfil: "",
  ficha_medica: "",
  comprobante_jubilado: "",
  ...emptyTutorFields(),
})
