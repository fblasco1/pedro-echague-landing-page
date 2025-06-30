import Image from "next/image"
import Link from "next/link"

export type FederatedActivity = {
  id: string
  title: string
  logoUrl: string
  link: string
}

export function FederatedActivitiesGrid({ activities }: { activities: FederatedActivity[] }) {
  return (
    <div className="flex flex-col items-center w-full mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
        {activities.map((activity, idx) => (
          <Link
            key={activity.id}
            href={activity.link}
            className="group flex items-center bg-club-yellow text-club-blue rounded-xl shadow-lg px-6 py-4 sm:py-6 md:py-8 transition-transform hover:scale-105 border-2 border-club-yellow min-h-[110px] md:min-h-[120px] lg:min-h-[130px]"
            style={{ minWidth: 320 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center mr-4 md:mr-6" style={{ minWidth: 90 }}>
              <Image
                src={activity.logoUrl}
                width={90}
                height={90}
                alt={activity.title}
                className="object-contain drop-shadow-md"
              />
            </div>
            <span className="block text-lg sm:text-xl md:text-2xl font-bold font-raleway text-left">
              {activity.title}
            </span>
          </Link>
        ))}
        {/* Botón extra para ver todas las actividades */}
        <Link
          key="ver-todas"
          href="/actividades"
          className="group flex flex-col items-center justify-center bg-white text-club-blue border-2 border-club-yellow rounded-xl shadow-lg px-6 py-4 sm:py-6 md:py-8 transition-transform hover:scale-105 min-h-[110px] md:min-h-[120px] lg:min-h-[130px] font-bold text-lg sm:text-xl md:text-2xl font-raleway"
          style={{ minWidth: 320 }}
        >
          <span className="mb-2">Ver todas las actividades</span>
          <span className="text-3xl">→</span>
        </Link>
      </div>
    </div>
  )
}
