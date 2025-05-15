import Image from "next/image"

export function HeroBocaStyle() {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[100vh] sm:h-[80vh] md:h-[100vh] w-full">
        <Image
          src="/portada.jpg"
          alt="Club Pedro Echagüe"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-club-blue/90" />
      </div>

      {/* Bottom Text Banner - Más pequeño */}
      <div className="absolute bottom-0 left-0 right-0 bg-club-blue py-6 sm:py-3">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-club-yellow font-raleway tracking-tight">
            CLUB PEDRO ECHAGÜE
          </h1>
          <p className="text-base sm:text-lg text-white font-roboto mt-0">El club de Flores desde 1934</p>
        </div>
      </div>
    </div>
  )
}
