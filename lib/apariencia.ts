/**
 * Esta web es solo de Santa Marta. La portada nueva va siempre.
 * El color, si está guardado, sale de Configuración de su intranet.
 */
import { getPool } from '@/lib/db'

export type AparienciaPublica = {
  web: string
  color: string
}

export async function obtenerAparienciaPublica(): Promise<AparienciaPublica> {
  const base: AparienciaPublica = { web: 'bilingue', color: '' }
  try {
    const pool = getPool()
    if (!pool) return base
    const [rows] = await pool.query(
      `SELECT clave, valor FROM config WHERE clave IN ('color_primario')`
    )
    for (const row of rows as { clave?: string; valor?: string }[]) {
      const valor = String(row?.valor || '').trim()
      if (row?.clave === 'color_primario' && /^#[0-9a-fA-F]{6}$/.test(valor)) base.color = valor
    }
  } catch {
    /* sin base: se queda el diseño de Santa Marta */
  }
  return base
}
