import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken, COOKIE_NAME } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body
    const expected = process.env.ADMIN_PASSWORD
    if (!expected) {
      return NextResponse.json(
        { error: 'Admin no configurado: falta ADMIN_PASSWORD en .env.local' },
        { status: 500 }
      )
    }
    if (password !== expected) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }
    const token = createAdminToken()
    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Error en el login' }, { status: 500 })
  }
}
