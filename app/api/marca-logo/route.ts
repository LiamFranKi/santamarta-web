/**
 * Logo de la portada. Lo lee del Logo a color (o el blanco) de Configuración
 * y lo pide a la intranet de esta misma instalación, no al archivo fijo de otro colegio.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function nombreLogo(valor: unknown): string {
  const name = String(valor || '').split(/[/\\]/).pop() || ''
  if (!/^[\w.\-]+\.(png|jpe?g)$/i.test(name)) return ''
  return name
}

function origenIntranet(): string {
  const raw = String(process.env.INTRANET_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '')
  return raw.replace(/\/api$/, '')
}

export async function GET(req: NextRequest) {
  const pedido = req.nextUrl.searchParams.get('cual')
  const cual = pedido === 'blanco' ? 'logo_blanco' : pedido === 'icono' ? 'icono_app' : 'logo_colegio'
  const pool = getPool()
  if (!pool) return new NextResponse('Sin logo', { status: 404 })
  let name = ''
  try {
    const [rows] = await pool.query(`SELECT valor FROM config WHERE clave = ? LIMIT 1`, [cual])
    name = nombreLogo((rows as { valor?: string }[])[0]?.valor)
    if (!name && (cual === 'logo_blanco' || cual === 'icono_app')) {
      const [color] = await pool.query(`SELECT valor FROM config WHERE clave = 'logo_colegio' LIMIT 1`)
      name = nombreLogo((color as { valor?: string }[])[0]?.valor)
    }
  } catch {
    return new NextResponse('Sin logo', { status: 404 })
  }
  if (!name) return new NextResponse('Sin logo', { status: 404 })
  try {
    const res = await fetch(`${origenIntranet()}/uploads/colegio/${encodeURIComponent(name)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return new NextResponse('Sin logo', { status: 404 })
    const buf = new Uint8Array(await res.arrayBuffer())
    const tipo = name.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg'
    return new NextResponse(buf, {
      headers: {
        'Content-Type': tipo,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    })
  } catch {
    return new NextResponse('Sin logo', { status: 404 })
  }
}
