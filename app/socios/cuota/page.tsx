import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { getCategoriasSocios } from "@/lib/sanity/cuota"

export default async function ValoresCuotaPage() {
	const categoriasSocios = await getCategoriasSocios()
	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			{/* Nuevo header con componente reutilizable */}
			<PageHeader
				title="SOCIOS VALORES"
				backgroundImage="/placeholder.svg?height=800&width=1600"
				hashtag="ELCLUBDEFLORES"
				backLink="/"
			/>

			{/* Contenido principal */}
			<div className="bg-club-blue text-white py-12 md:py-16 flex-grow">
				<div className="container mx-auto px-4">
					<h2 className="text-xl md:text-2xl font-bold text-club-yellow mb-8 font-raleway">
						Valor cuota social a partir del 01/04/2025
					</h2>

					{/* Tabla de valores */}
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-white/20">
									<th className="py-4 px-4 text-left text-club-yellow font-raleway">
										Categoría
									</th>
									<th className="py-4 px-4 text-left text-club-yellow font-raleway">
										Cuota
									</th>
									<th className="py-4 px-4 text-left text-club-yellow font-raleway">
										Condición
									</th>
								</tr>
							</thead>
							<tbody>
								{categoriasSocios.map((categoria: any, index: number) => (
									<tr
										key={index}
										className={`border-b border-white/10 ${
											index % 2 === 0
												? "bg-club-blue/80"
												: "bg-club-blue"
										}`}
									>
										<td className="py-4 px-4 font-medium font-raleway">
											{categoria.categoria}
										</td>
										<td className="py-4 px-4 font-roboto">
											$
											{categoria.valor.toLocaleString("es-AR")}
										</td>
										<td className="py-4 px-4 text-white/80 font-roboto">
											{categoria.condicion}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Información adicional */}
					<div className="mt-12 bg-club-blue/50 p-6 rounded-lg">
						<h3 className="text-xl font-bold text-club-yellow mb-4 font-raleway">
							Información importante
						</h3>
						<ul className="space-y-2 text-white/90 font-roboto">
							<li className="flex items-start">
								<span className="text-club-yellow mr-2">•</span>
								<span>
									Las cuotas se abonan del 1 al 10 de cada mes.
								</span>
							</li>
							<li className="flex items-start">
								<span className="text-club-yellow mr-2">•</span>
								<span>
									Para mantener la condición de socio activo, es
									necesario estar al día con el pago de la cuota
									social.
								</span>
							</li>
							<li className="flex items-start">
								<span className="text-club-yellow mr-2">•</span>
								<span>Los valores pueden estar sujetos a modificaciones.</span>
							</li>
						</ul>
					</div>

					{/* Botón de asociarse */}
					<div className="mt-12 text-center">
						<Link
							href="/asociate"
							className="inline-block bg-club-yellow text-club-blue font-bold py-3 px-8 rounded-md hover:bg-club-yellow/90 transition-colors font-raleway text-lg"
						>
							ASOCIATE AHORA
						</Link>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="w-full border-t py-6 md:py-0 bg-club-dark text-white">
				<div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
					<p className="text-center text-xs sm:text-sm leading-loose text-white/70 md:text-left font-roboto">
						© {new Date().getFullYear()} Club Pedro Echagüe. Todos los
						derechos reservados.
					</p>
					<div className="flex items-center gap-4">
						<Link
							href="#"
							className="text-xs sm:text-sm text-white/70 hover:text-white font-roboto"
						>
							Política de Privacidad
						</Link>
						<Link
							href="#"
							className="text-xs sm:text-sm text-white/70 hover:text-white font-roboto"
						>
							Términos de Servicio
						</Link>
						<Link
							href="#"
							className="text-xs sm:text-sm text-white/70 hover:text-white font-roboto"
						>
							Contacto
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}
