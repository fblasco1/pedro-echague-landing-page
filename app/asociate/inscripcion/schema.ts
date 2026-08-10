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
})

/** Datos de una persona (titular o familiar). */
export const personaBaseSchema = z
  .object({
    nombre: z.string().min(1, "Nombre obligatorio"),
    apellido: z.string().min(1, "Apellido obligatorio"),
    dni: z.string().regex(dniRegex, "DNI inválido (7 u 8 dígitos)"),
    nacionalidad: z.string().min(1).default("Argentina"),
    fecha_nacimiento: z.string().min(1, "Fecha de nacimiento obligatoria"),
    genero: z.enum(["Masculino", "Femenino", "Otro", "Prefiero no decir"], {
      required_error: "Elegí un género",
    }),
    email: z.string().email("Email inválido"),
    telefono_movil: z.string().min(8, "Teléfono obligatorio"),
    telefono_fijo: z.string().optional(),
    calle: z.string().min(1, "Calle obligatoria"),
    numero: z.string().optional(),
    piso: z.string().optional(),
    departamento: z.string().optional(),
    provincia: z.string().min(1, "Provincia obligatoria"),
    ciudad: z.string().optional(),
    localidad_barrio: z.string().min(1, "Localidad obligatoria"),
    codigo_postal: z.string().min(1, "Código postal obligatorio"),
    categoria_solicitada: z.enum(["Activo", "Menor", "Cadete", "Jubilado"]),
    rol_en_grupo: z
      .enum(["Titular", "Cónyuge", "Hijo", "Padre", "Madre", "Otro"])
      .optional(),
    sin_actividad: z.boolean().default(false),
    actividades: z.array(actividadSeleccionSchema).default([]),
    // Declaración de salud simplificada (no se persiste aún como DocType; se exige en UX)
    tiene_enfermedad: z.enum(["si", "no"], {
      required_error: "Indicá si tenés alguna enfermedad a declarar",
    }),
    ...adjuntosSchema.shape,
  })
  .superRefine((data, ctx) => {
    if (!data.sin_actividad && data.actividades.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Elegí al menos una actividad o marcá «Socio sin actividad»",
        path: ["actividades"],
      })
    }
  })

export type PersonaForm = z.infer<typeof personaBaseSchema>

export const familiarSchema = personaBaseSchema

export const wizardSchema = z.object({
  titular: personaBaseSchema,
  familiares: z.array(familiarSchema).default([]),
  acepta_estatutos: z
    .boolean({ required_error: "Debés aceptar los estatutos y reglamentos" })
    .refine((v) => v === true, {
      message: "Debés aceptar los estatutos y reglamentos",
    }),
})

export type WizardForm = z.infer<typeof wizardSchema>

export function edadDesdeNacimiento(fecha: string, hoy = new Date()): number {
  const nac = new Date(fecha)
  if (Number.isNaN(nac.getTime())) return 0
  let edad = hoy.getFullYear() - nac.getFullYear()
  const m = hoy.getMonth() - nac.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad -= 1
  return edad
}

export function categoriaPorEdad(fechaNacimiento: string): "Activo" | "Menor" {
  return edadDesdeNacimiento(fechaNacimiento) < 18 ? "Menor" : "Activo"
}

/** Payload listo para `submit_alta_grupo` (sin campos solo-UI). */
export function toSubmitPayload(values: WizardForm) {
  const strip = (p: PersonaForm, rol?: string) => {
    const {
      tiene_enfermedad: _t,
      actividades,
      sin_actividad,
      rol_en_grupo,
      ...rest
    } = p
    return {
      ...rest,
      ...(rol ? { rol_en_grupo: rol } : {}),
      ...(rol_en_grupo && !rol ? { rol_en_grupo } : {}),
      sin_actividad: sin_actividad ? 1 : 0,
      actividades: sin_actividad
        ? []
        : actividades.map((a) => ({
            actividad: a.actividad,
            ...(a.grupo_actividad ? { grupo_actividad: a.grupo_actividad } : {}),
          })),
    }
  }

  return {
    titular: strip(values.titular, "Titular"),
    familiares: values.familiares.map((f) =>
      strip(f, f.rol_en_grupo && f.rol_en_grupo !== "Titular" ? f.rol_en_grupo : "Otro")
    ),
  }
}

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
})
