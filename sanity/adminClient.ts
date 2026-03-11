import { createClient } from '@sanity/client'

/**
 * Cliente de Sanity con permiso de escritura.
 * Solo usar en API routes del admin (server-side).
 * Requiere SANITY_API_TOKEN en .env.local (token con permisos de escritura en sanity.io/manage).
 */
export const adminClient = createClient({
  projectId: 'ogwkpe02',
  dataset: 'production',
  apiVersion: '2025-06-18',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || '',
})
