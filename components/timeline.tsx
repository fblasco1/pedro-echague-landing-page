"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import Image from "next/image"

// Datos históricos para la línea de tiempo
const timelineData = {
  decades: [
    { id: "1930", label: "1930" },
    { id: "1940", label: "1940" },
    { id: "1950", label: "1950" },
    { id: "1960", label: "1960" },
    { id: "1970", label: "1970" },
    { id: "1980", label: "1980" },
    { id: "1990", label: "1990" },
    { id: "2000", label: "2000" },
    { id: "2010", label: "2010" },
    { id: "2020", label: "2020" },
  ],
  years: {
    "1930": [
      { id: "1930", label: "1930", events: [] },
      { id: "1931", label: "1931", events: [] },
      { id: "1932", label: "1932", events: [] },
      { id: "1933", label: "1933", events: [] },
      {
        id: "1934",
        label: "1934",
        events: [
          {
            text: "Un 17 de octubre, un grupo de 25 jóvenes se juntó después de ganar un torneo de fútbol y decidió darle vida al club que hoy conocemos. Al principio, el nombre de la institución seria Club Nacional Argentino.",
            image: "/images/fundacion-1934.png",
          },
        ],
      },
      { id: "1935", label: "1935", events: [] },
      { id: "1936", label: "1936", events: [
        {
            text: "La primer sede social tuvo lugar en Lobos 3383 (Gregorio de LaFerrere). \n El crecimiento llevo a mudarse a la actual sede y para financiarla nacieron los famosos bailes de carnaval que permitieron seguir construyendo el club.",
            image: "/images/sede-social-bailes.png",
        },
      ] },
      { id: "1937", label: "1937", events: [] },
      { id: "1938", label: "1938", events: [] },
      { id: "1939", label: "1939", events: [] },
    ],
    "1940": [
      {
        id: "1940",
        label: "1940",
        events: [
          {
            text: "Por disposición del gobierno nacional, el club cambió su nombre a 'Institución cultural y deportiva Pedro Echagüe'.",
            image: null,
          },
          {
            text: "Gracias a gestiones ante el Ministerio de Justicia e Instrucción Pública, se sumaron más de 100 libros y nació la biblioteca, que durante años fue un espacio de aprendizaje para los chicos del barrio.",
            image: "/images/biblioteca-1940.png",
          },
        ],
      },
      { id: "1941", label: "1941", events: [] },
      { id: "1942", label: "1942", events: [] },
      {
        id: "1943",
        label: "1943",
        events: [
          {
            text: "La biblioteca llegó a tener más de 2.200 libros y 12.050 lectores, dictándose clases de inglés, mecanografía y taquigrafía.",
            image: null,
          },
        ],
      },
      { id: "1944", label: "1944", events: [] },
      {
        id: "1945",
        label: "1945",
        events: [
          {
            text: "El club dio un paso importante al obtener su personería jurídica, lo que le permitió formalizar su crecimiento.",
            image: null,
          },
        ],
      },
      { id: "1946", label: "1946", events: [] },
      { id: "1947", label: "1947", events: [] },
      { id: "1948", label: "1948", events: [] },
      { id: "1949", label: "1949", events: [] },
    ],
    "1950": Array.from({ length: 10 }, (_, i) => ({
      id: `${1950 + i}`,
      label: `${1950 + i}`,
      events: [],
    })),
    "1960": [
      {
        id: "1960",
        label: "1960",
        events: [
          {
            text: "Una inspección municipal dejó al club sin opción: había que demoler las instalaciones por problemas de seguridad. Durante dos años, el club cerró para reconstruirse desde cero.",
            image: null,
          },
        ],
      },
      { id: "1961", label: "1961", events: [] },
      {
        id: "1962",
        label: "1962",
        events: [
          {
            text: "Reapertura del club tras la reconstrucción. Con los fondos recaudados solo se logró la loza de la planta baja, entrepiso y sótano, pero los socios, a puro esfuerzo y creatividad, levantaron las paredes y le devolvieron vida al edificio.",
            image: "/images/reapertura-1962.png",
          },
        ],
      },
      { id: "1963", label: "1963", events: [] },
      { id: "1964", label: "1964", events: [] },
      { id: "1965", label: "1965", events: [] },
      { id: "1966", label: "1966", events: [] },
      { id: "1967", label: "1967", events: [] },
      {
        id: "1968",
        label: "1968",
        events: [
          {
            text: "El equipo de baloncesto del club logró el tan ansiado ascenso a primera división. Para competir, fue necesario techar la cancha, un gran paso hacia adelante.",
            image: "/images/basquet-1968.png",
          },
        ],
      },
      { id: "1969", label: "1969", events: [] },
    ],
    "1970": [
      {
        id: "1970",
        label: "1970",
        events: [
          {
            text: "Comenzaron a llegar más mejoras: se colocaron cerramientos y se embaldosó la cancha, convirtiéndola en un espacio más cómodo y funcional para los jugadores y los hinchas.",
            image: null,
          },
        ],
      },
      { id: "1971", label: "1971", events: [] },
      { id: "1972", label: "1972", events: [] },
      { id: "1973", label: "1973", events: [] },
      { id: "1974", label: "1974", events: [] },
      { id: "1975", label: "1975", events: [] },
      { id: "1976", label: "1976", events: [] },
      {
        id: "1977",
        label: "1977",
        events: [
          {
            text: "Se inauguró la peña de tango de los sábados por la noche, que se convirtió en un emblema del club y sigue vigente hasta hoy.",
            image: "/images/pena-tango-1977.png",
          },
        ],
      },
      {
        id: "1978",
        label: "1978",
        events: [
          {
            text: "Nacieron los bailes juveniles, conocidos como Sundays Club, que llenaron de música y diversión el club durante ocho años. ¡Incluso Serú Girán, una de las bandas más icónicas del rock argentino, se presentó en Pedro Echagüe!",
            image: "/images/sundays-club-1978.png",
          },
        ],
      },
      { id: "1979", label: "1979", events: [] },
    ],
    "1980": Array.from({ length: 10 }, (_, i) => ({
      id: `${1980 + i}`,
      label: `${1980 + i}`,
      events:
        i === 0
          ? [
              {
                text: "Entre 1980 y 2000, las obras en el club no pararon. Los hijos y familiares de los pioneros tomaron las riendas, comenzando a revestir paredes y pisos.",
                image: null,
              },
            ]
          : [],
    })),
    "1990": Array.from({ length: 10 }, (_, i) => ({
      id: `${1990 + i}`,
      label: `${1990 + i}`,
      events:
        i === 0
          ? [
              {
                text: "A finales de los 80 y principios de los 90, se decidió construir un tercer gimnasio sobre la antigua cancha de baloncesto y la pista de baile, logrando una impresionante superficie de más de 3000 metros cuadrados.",
                image: "/images/gimnasio-1990.png",
              },
              {
                text: "Se fue gestando una escuela de básquet en el ámbito Metropolitano bajo la conducción de Juan Pablo Boadaz, que tuvo su máximo esplendor en los 2000.",
                image: null,
              },
            ]
          : [],
    })),
    "2000": [
      { id: "2000", label: "2000", events: [] },
      { id: "2001", label: "2001", events: [] },
      { id: "2002", label: "2002", events: [
        {
            text: "Campeones Liga Nacional Juvenil 2002",
            image: "/images/campeones-2002.png",
          },
      ] },
      { id: "2003", label: "2003", events: [] },
      {
        id: "2004",
        label: "2004",
        events: [
          {
            text: "Ascenso al TNA (2° División Nacional) de básquet.",
            image: "/images/tna-2004.png",
          },
        ],
      },
      { id: "2005", label: "2005", events: [] },
      { id: "2006", label: "2006", events: [] },
      {
        id: "2007",
        label: "2007",
        events: [
          {
            text: "El equipo de básquet disputó una final por el ascenso a la Liga Nacional de Básquet (LNB).",
            image: "/images/tna-2007.png",
          },
        ],
      },
      {
        id: "2008",
        label: "2008",
        events: [
          {
            text: "El club ganó la Copa Federación por ser el más campeón de FRBCF (actual FeBAMBA).",
            image: "/images/copa-2008.png",
          },
        ],
      },
      { id: "2009", label: "2009", events: [] },
    ],
    "2010": Array.from({ length: 10 }, (_, i) => ({
      id: `${2010 + i}`,
      label: `${2010 + i}`,
      events:
        i === 0
          ? [
              {
                text: "Surgió la camada de 'Los Guerreros' que trajeron títulos nacionales y metropolitanos a nivel formativo y en primera con planteles casi en su totalidad surgidos del semillero de la institución.",
                image: "/images/guerreros.png",
              },
            ]
          : [],
    })),
    "2020": Array.from({ length: 6 }, (_, i) => ({
      id: `${2020 + i}`,
      label: `${2020 + i}`,
      events: [],
    })),
  },
}

export function Timeline() {
  const [selectedDecade, setSelectedDecade] = useState("1930")
  const [selectedYear, setSelectedYear] = useState("1934")
  const [isDarkMode, setIsDarkMode] = useState(true)

  const years = timelineData.years[selectedDecade]
  const currentYearData = years.find((y) => y.id === selectedYear)

  const handlePrevYear = () => {
    const currentIndex = years.findIndex((y) => y.id === selectedYear)
    if (currentIndex > 0) {
      setSelectedYear(years[currentIndex - 1].id)
    } else {
      // Go to previous decade
      const decadeIndex = timelineData.decades.findIndex((d) => d.id === selectedDecade)
      if (decadeIndex > 0) {
        const prevDecade = timelineData.decades[decadeIndex - 1].id
        setSelectedDecade(prevDecade)
        const prevDecadeYears = timelineData.years[prevDecade]
        setSelectedYear(prevDecadeYears[prevDecadeYears.length - 1].id)
      }
    }
  }

  const handleNextYear = () => {
    const currentIndex = years.findIndex((y) => y.id === selectedYear)
    if (currentIndex < years.length - 1) {
      setSelectedYear(years[currentIndex + 1].id)
    } else {
      // Go to next decade
      const decadeIndex = timelineData.decades.findIndex((d) => d.id === selectedDecade)
      if (decadeIndex < timelineData.decades.length - 1) {
        const nextDecade = timelineData.decades[decadeIndex + 1].id
        setSelectedDecade(nextDecade)
        setSelectedYear(timelineData.years[nextDecade][0].id)
      }
    }
  }

  return (
    <div className="mt-6 sm:mt-8 md:mt-12 max-w-5xl mx-auto">
      {/* Línea de tiempo por décadas */}
      <div className="relative">
        <div className="bg-club-blue/30 py-4 sm:py-6 md:py-8 rounded-lg">
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 px-2 sm:px-4 overflow-x-auto">
            {timelineData.decades.map((decade) => (
              <button
                key={decade.id}
                onClick={() => {
                  setSelectedDecade(decade.id)
                  setSelectedYear(timelineData.years[decade.id][0].id)
                }}
                className={`text-base sm:text-lg font-medium ${
                  selectedDecade === decade.id ? "text-club-yellow" : "text-white/60"
                }`}
              >
                {decade.label}
              </button>
            ))}
          </div>

          {/* Línea de tiempo por años - Versión móvil */}
          <div className="mt-6 sm:mt-8 md:mt-12 px-4 sm:px-8 relative block sm:hidden">
            <div className="flex justify-between items-center">
              <button onClick={handlePrevYear} className="bg-transparent text-white z-10">
                <ChevronLeft size={20} />
              </button>

              <div className="text-center">
                <span className="text-white">{selectedYear}</span>
              </div>

              <button onClick={handleNextYear} className="bg-transparent text-white z-10">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Línea de tiempo por años - Versión tablet/desktop */}
          <div className="mt-6 sm:mt-8 md:mt-12 px-4 sm:px-8 relative hidden sm:block">
            <div className="h-0.5 bg-white/20 absolute left-0 right-0 top-1/2 transform -translate-y-1/2"></div>

            <div className="flex justify-between items-center relative">
              <button onClick={handlePrevYear} className="bg-transparent text-white z-10">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="flex-1 flex justify-between items-center relative">
                {years.map((year) => {
                  const hasEvents = year.events && year.events.length > 0
                  return (
                    <button
                      key={year.id}
                      onClick={() => setSelectedYear(year.id)}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <span
                        className={`text-xs sm:text-sm mb-1 sm:mb-2 ${year.id === selectedYear ? "text-white" : "text-white/60"}`}
                      >
                        {year.label}
                      </span>
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                          year.id === selectedYear ? "bg-club-yellow" : hasEvents ? "bg-club-yellow/60" : "bg-white/60"
                        }`}
                      ></div>
                    </button>
                  )
                })}
              </div>

              <button onClick={handleNextYear} className="bg-transparent text-white z-10">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Año seleccionado y eventos */}
          <div className="mt-8 sm:mt-12 md:mt-16 px-4 sm:px-8 flex flex-col items-center">
            <div className="flex items-center">
              <button onClick={handlePrevYear} className="text-white">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-club-yellow mx-4 sm:mx-8">
                {selectedYear}
              </h3>
              <button onClick={handleNextYear} className="text-white">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {currentYearData && currentYearData.events.length > 0 ? (
              <div className="mt-4 sm:mt-6 md:mt-8 w-full max-w-2xl">
                {currentYearData.events.map((event, index) => (
                  <div key={index} className="mb-6 sm:mb-8">
                    <div className="flex items-start mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-white text-sm sm:text-base">{event.text}</p>
                    </div>

                    {event.image && (
                      <div className="mt-3 sm:mt-4 ml-5 relative">
                        <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={`Evento histórico de ${selectedYear}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70 flex items-center">
                            <Camera className="text-white mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs text-white">
                              Archivo histórico Club Pedro Echague - {selectedYear}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 sm:mt-6 md:mt-8 text-white/60 text-sm sm:text-base">
                No hay eventos destacados en este año
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
