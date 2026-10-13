/**
 * Nombre, logo y dirección de la intranet para la portada.
 * Salen de Configuración de la intranet de ESTA instalación.
 * Si no hay nada guardado, la web de Vanguard sigue como está.
 */
import { getPool } from '@/lib/db'

export type MarcaPublica = {
  nombre: string
  logo: string
  logoPie: string
  intranetUrl: string
  tituloPagina: string
  lema: string
  lemaVerde: string
  favicon: string
  propia: boolean
}

const NOMBRE_RESPALDO = 'Vanguard Schools'
const LOGO_RESPALDO = '/LOGO6.png'
const FAVICON_RESPALDO = '/favicon-ico.png'
const LOGO_PIE_RESPALDO = '/LOGO7.png'
const INTRANET_RESPALDO = 'https://sistema.vanguardschools.edu.pe/'

function urlOk(valor: unknown): string {
  const v = String(valor || '').trim()
  if (!v) return ''
  try {
    const u = new URL(v)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return ''
    const ruta = u.pathname === '/' ? '' : u.pathname.replace(/\/$/, '')
    return `${u.origin}${ruta}${u.search}`
  } catch {
    return ''
  }
}

function nombreLogo(valor: unknown): string {
  const name = String(valor || '').split(/[/\\]/).pop() || ''
  if (!/^[\w.\-]+\.(png|jpe?g)$/i.test(name)) return ''
  return name
}

export async function obtenerMarcaPublica(): Promise<MarcaPublica> {
  const marca: MarcaPublica = {
    nombre: NOMBRE_RESPALDO,
    logo: LOGO_RESPALDO,
    logoPie: LOGO_PIE_RESPALDO,
    intranetUrl: INTRANET_RESPALDO,
    tituloPagina: '',
    lema: '',
    lemaVerde: '',
    favicon: FAVICON_RESPALDO,
    propia: false,
  }
  try {
    const pool = getPool()
    if (!pool) return marca
    const colegioId = parseInt(process.env.WEB_COLEGIO_ID || '1', 10) || 1
    const [cfgRows] = await pool.query(
      `SELECT clave, valor FROM config
       WHERE clave IN ('web_intranet_url', 'web_titulo', 'web_lema', 'web_lema_verde', 'logo_colegio', 'logo_blanco', 'icono_app', 'texto_intranet')`
    )
    const map: Record<string, string> = {}
    for (const row of cfgRows as { clave?: string; valor?: string }[]) {
      if (row?.clave) map[row.clave] = String(row.valor || '').trim()
    }
    const [colRows] = await pool.query(
      `SELECT titulo_intranet, nombre FROM colegios WHERE id = ? LIMIT 1`,
      [colegioId]
    )
    const col = (colRows as { titulo_intranet?: string; nombre?: string }[])[0]
    const titulo = String(col?.titulo_intranet || '').trim()
    const nombreTabla = String(col?.nombre || '').trim()
    const texto = String(map.texto_intranet || '').trim()
    const nombre = titulo || nombreTabla || texto
    if (nombre) {
      marca.nombre = nombre
      marca.propia = nombre !== NOMBRE_RESPALDO
    }
    const frase = (valor: string) => String(valor || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 140)
    marca.tituloPagina = frase(map.web_titulo)
    marca.lema = frase(map.web_lema)
    marca.lemaVerde = frase(map.web_lema_verde)

    const origenPropio = urlOk(map.web_intranet_url) || urlOk(process.env.INTRANET_PUBLIC_URL)
    const intranet = origenPropio || INTRANET_RESPALDO.replace(/\/$/, '')
    marca.intranetUrl = intranet.endsWith('/') ? intranet : `${intranet}/`

    const archivo = nombreLogo(map.logo_colegio)
    const blanco = nombreLogo(map.logo_blanco)
    const icono = nombreLogo(map.icono_app)
    if (archivo) {
      marca.logo = '/api/marca-logo'
      marca.logoPie = blanco ? '/api/marca-logo?cual=blanco' : '/api/marca-logo'
    }
    if (icono) marca.favicon = '/api/marca-logo?cual=icono'
    else if (archivo) marca.favicon = '/api/marca-logo'
  } catch {
    /* sin base: se queda la marca actual */
  }
  return marca
}
