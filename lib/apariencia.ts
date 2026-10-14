/**
 * Plantilla de la portada. "actual" es el diseño que ya está publicado.
 * Sale de Configuración → Apariencia de la intranet (tabla config).
 */
import { getPool } from '@/lib/db'

export type AparienciaPublica = {
  web: string
  color: string
}

const WEBS = new Set(['actual', 'barra', 'sobre-banner', 'editorial', 'tarjetas', 'sobrio', 'bilingue'])

export async function obtenerAparienciaPublica(): Promise<AparienciaPublica> {
  const base: AparienciaPublica = { web: 'actual', color: '' }
  if (process.env.SMS_PREVIEW === '1') return { web: 'bilingue', color: '' }
  try {
    const pool = getPool()
    if (!pool) return base
    const [rows] = await pool.query(
      `SELECT clave, valor FROM config WHERE clave IN ('web_plantilla', 'color_primario')`
    )
    for (const row of rows as { clave?: string; valor?: string }[]) {
      const valor = String(row?.valor || '').trim()
      if (row?.clave === 'web_plantilla' && WEBS.has(valor)) base.web = valor
      if (row?.clave === 'color_primario' && /^#[0-9a-fA-F]{6}$/.test(valor)) base.color = valor
    }
  } catch {
    /* sin base: se queda la portada actual */
  }
  return base
}
