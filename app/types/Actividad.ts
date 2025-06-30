export interface ScheduleItem {
  category: string
  tira: string
  days: string
  fee: string
}

export interface CoachRole {
  position: string
  teams: string
}

export interface Coach {
  firstName: string
  lastName: string
  roles: CoachRole[]
  image?: { asset: { url: string } }
}

export interface EventItem {
  title: string
  date: string
  location: string
}

export interface Actividad {
  _id: string
  title: string
  slug: { current: string }
  description: string
  longDescription?: string
  imageSrc?: { asset: { url: string } }
  logo?: { asset: { url: string } } // Nuevo campo logo
  fotoPortada?: { asset: { url: string } } // Nuevo campo foto de portada
  tipo: 'federada' | 'recreativa' | 'cultural'
  categories: string[]
  horarios?: ScheduleItem[]
  coaches?: Coach[]
  events?: EventItem[]
  gallery?: { asset: { url: string } }[]
}
