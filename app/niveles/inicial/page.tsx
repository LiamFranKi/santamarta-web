import { Metadata } from 'next'
import NivelLanding from '@/components/niveles/NivelLanding'
import { PaginaInicial } from '@/components/santamarta/paginas'
import { NIVELES_LANDING } from '@/lib/niveles-landing'
import { getNivelesInversion } from '@/lib/niveles-inversion'
import { getFaqsParaNivel } from '@/lib/faqs'
import { getAdmisionConfigPublica } from '@/lib/admision-config'
import { aplicarMedia, getNivelMedia } from '@/lib/niveles-media'
import { esBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  if (await esBilingue()) {
    return {
      title: 'Inicial · Santa Marta School',
      description: 'Educación inicial bilingüe en Santa Marta School, Comas.',
    }
  }
  return {
    title: 'Educación Inicial',
    description:
      'Educación Inicial en Vanguard Schools. Early Year, Pre Kinder y Kinder con STEAM, juego, piscina patera y dos maestras por aula.',
  }
}

export default async function InicialPage() {
  if (await esBilingue()) return <PaginaInicial />
  const [inversion, faqs, admision, media] = await Promise.all([
    getNivelesInversion(),
    getFaqsParaNivel('inicial'),
    getAdmisionConfigPublica(),
    getNivelMedia('inicial'),
  ])
  return (
    <NivelLanding
      data={aplicarMedia(NIVELES_LANDING.inicial, media)}
      monto={inversion.inicial}
      textoLinea={inversion.textoLinea}
      descuentoHermano={inversion.descuentoHermano}
      faqs={faqs}
      admisionHref={admision.rutaFormulario || '/admision'}
      admisionLabel={admision.etiquetaBoton || 'Admisión'}
    />
  )
}
