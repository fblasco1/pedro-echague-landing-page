import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000 // 24h

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET || process.env.SANITY_API_TOKEN || 'fallback-dev-secret'
  return secret
}

export function createAdminToken(): string {
  const expiry = String(Date.now() + SESSION_DURATION_MS)
  const signature = createHmac('sha256', getSecret()).update(expiry).digest('hex')
  return `${expiry}.${signature}`
}

export function verifyAdminToken(token: string): boolean {
  if (!token || !token.includes('.')) return false
  const [expiry, signature] = token.split('.')
  if (!expiry || !signature) return false
  if (Date.now() > Number(expiry)) return false
  const expected = createHmac('sha256', getSecret()).update(expiry).digest('hex')
  try {
    return timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return !!token && verifyAdminToken(token)
}

export async function requireAdminSession(): Promise<void> {
  const ok = await getAdminSession()
  if (!ok) redirect('/admin/login')
}

export { COOKIE_NAME }
