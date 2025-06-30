import { NextResponse } from "next/server"
import { getAllActividades } from "@/lib/sanity/actividades"

export async function GET() {
  try {
    const actividades = await getAllActividades()
    return NextResponse.json(actividades)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener actividades" }, { status: 500 })
  }
}
