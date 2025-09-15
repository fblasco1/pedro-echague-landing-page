/**
 * Función helper para obtener la URL de imagen de una actividad
 * Incluye fallback a imágenes locales cuando no hay imagen en Sanity
 */
export function getActivityImageUrl(activity: {
  title: string
  fotoPortada?: { asset?: { url?: string } }
  imageSrc?: { asset?: { url?: string } }
}): string {
  // Primero intentar con fotoPortada, luego con imageSrc
  const sanityImageUrl = activity.fotoPortada?.asset?.url || activity.imageSrc?.asset?.url
  
  if (sanityImageUrl && sanityImageUrl.trim() !== '') {
    return sanityImageUrl
  }
  
  // Fallback a imágenes locales basado en el título de la actividad
  const activityImageMap: Record<string, string> = {
    'Patín Artístico': '/images/activities/patin.png',
    'Patín': '/images/activities/patin.png',
    'Básquet': '/images/activities/basquet.png',
    'Basquet': '/images/activities/basquet.png',
    'Fútbol': '/images/activities/baby-futbol.png',
    'Futbol': '/images/activities/baby-futbol.png',
    'Baby Fútbol': '/images/activities/baby-futbol.png',
    'Gimnasio': '/images/activities/fitness.png',
    'Fitness': '/images/activities/fitness.png',
    'Crossfit': '/images/activities/crossfit.png',
    'Vóley': '/images/activities/voley.png',
    'Voley': '/images/activities/voley.png',
    'Taekwondo': '/images/activities/taekwondo.png',
    'Danza': '/images/activities/danza.png',
    'Gimnasia': '/images/activities/gimnasia.png',
    'Iniciación': '/images/activities/iniciacion.png',
    'Jubilados': '/images/activities/jubilados.png',
    'Shuilu': '/images/activities/shuilu.png',
    'Taichi': '/images/activities/taichi.png',
    'Yoga': '/images/activities/yoga.png',
    'Zumba': '/images/activities/zumba.png',
    'Comedia': '/images/activities/comedia.png',
    'GAP': '/images/activities/gap.png',
  }
  
  // Buscar coincidencia exacta o parcial en el título
  const activityTitle = activity.title.toLowerCase()
  for (const [key, imagePath] of Object.entries(activityImageMap)) {
    if (activityTitle.includes(key.toLowerCase())) {
      return imagePath
    }
  }
  
  // Si no se encuentra coincidencia, devolver placeholder
  return '/placeholder.svg'
}

/**
 * Función helper para obtener la URL del logo de una actividad
 */
export function getActivityLogoUrl(activity: {
  logo?: { asset?: { url?: string } }
}): string | undefined {
  return activity.logo?.asset?.url
}
