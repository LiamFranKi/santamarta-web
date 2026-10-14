import { CONTACTO_WEB_RESPALDO } from '@/lib/contacto'
import type { ContactoInstitucional } from '@/lib/contacto-institucional'
import type { MarcaPublica } from '@/lib/marca-publica'

export type DatosSantaMarta = {
  nombre: string
  marca: string
  logo: string
  intranetUrl: string
  telefonos: { visible: string; href: string; digitos: string }[]
  whatsapp: string
  correo: string
  direccion: string
  facebook: string
  mapa: string
}

const RESPALDO = {
  telefonos: ['975284106', '993779369'],
  correo: 'iep@santamartaschool.edu.pe',
  direccion: 'Jr. Los Pinos 298 (Jorge Chavez / Los Pinos) Km 11 La Libertad, Comas',
}

function esRespaldoVanguard(valor: string, respaldo: string) {
  return valor.trim().toLowerCase() === respaldo.trim().toLowerCase()
}

function moviles(texto: string): string[] {
  const trozos = String(texto || '').match(/\d[\d\s-]{6,}\d/g) || []
  const vistos = new Set<string>()
  const lista: string[] = []
  for (const trozo of trozos) {
    let d = trozo.replace(/\D/g, '')
    if (d.startsWith('51') && d.length >= 11) d = d.slice(-9)
    if (d.length === 9 && !vistos.has(d)) {
      vistos.add(d)
      lista.push(d)
    }
    if (lista.length === 2) break
  }
  return lista
}

function visible(d: string) {
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
}

export function prepararDatosSantaMarta(marca: MarcaPublica, contacto: ContactoInstitucional): DatosSantaMarta {
  const numeros = esRespaldoVanguard(contacto.telefonos, CONTACTO_WEB_RESPALDO.telefonos)
    ? RESPALDO.telefonos
    : (moviles(contacto.telefonos).length ? moviles(contacto.telefonos) : RESPALDO.telefonos)
  const direccion = esRespaldoVanguard(contacto.direccion, CONTACTO_WEB_RESPALDO.direccion)
    ? RESPALDO.direccion
    : contacto.direccion
  const correo = esRespaldoVanguard(contacto.correo, CONTACTO_WEB_RESPALDO.correo)
    ? RESPALDO.correo
    : contacto.correo
  const intranetGuardada = marca.intranetUrl.trim()
  const intranetUrl = /vanguardschools/i.test(intranetGuardada)
    ? 'http://89.117.52.9:8080/'
    : intranetGuardada
  const telefonos = numeros.map((d) => ({
    digitos: d,
    visible: visible(d),
    href: `tel:+51${d}`,
  }))
  const marcaVisible = /martanet|vanguard/i.test(marca.nombre) ? 'Santa Marta' : marca.nombre.replace(/\s*school\s*/i, '').trim() || 'Santa Marta'
  return {
    nombre: marca.nombre,
    marca: marcaVisible,
    logo: marca.propia && marca.logo.startsWith('/api/') ? marca.logo : '/santa-marta/logo.png',
    intranetUrl,
    telefonos,
    whatsapp: `51${telefonos[0].digitos}`,
    correo,
    direccion,
    facebook: 'https://www.facebook.com/santamartaschool',
    mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Santa Marta School ${direccion}`)}`,
  }
}
