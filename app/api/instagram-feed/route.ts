import { NextResponse } from "next/server"

// API de Instagram desactivada temporalmente
export async function GET() {
  return new Response(
    JSON.stringify({ error: "API desactivada temporalmente" }),
    {
      status: 503,
      headers: { "Content-Type": "application/json" },
    }
  )
}
