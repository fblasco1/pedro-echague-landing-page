import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NOMBRES_FEDERADAS_PRINCIPALES = [
  "Básquet",
  "Baby Fútbol",
  "Vóley",
  "Taekwondo",
  "Gimnasio Fitness",
  "Patín Artístico",
  "Gimnasia Artística",
];

export function filtrarFederadasPrincipales<T extends { title: string }>(actividades: T[]): T[] {
  return actividades.filter(a => NOMBRES_FEDERADAS_PRINCIPALES.includes(a.title))
}
