import { Metadata } from 'next'
import NivelLanding from '@/components/niveles/NivelLanding'
import { PaginaPrimaria } from '@/components/santamarta/paginas'
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
      title: 'Primaria · Santa Marta School',
      description: 'Educación primaria bilingüe en Santa Marta School, Comas.',
    }
  }
  return {
    title: 'Educación Primaria',
    description:
      'Educación Primaria en Vanguard Schools. 1.° a 6.° con aula invertida, inglés vivencial, tablets, piscinas y canchas sintéticas.',
  }
}

export default async function PrimariaPage() {
  if (await esBilingue()) return <PaginaPrimaria />
  const [inversion, faqs, admision, media] = await Promise.all([
    getNivelesInversion(),
    getFaqsParaNivel('primaria'),
    getAdmisionConfigPublica(),
    getNivelMedia('primaria'),
  ])
  return (
    <NivelLanding
      data={aplicarMedia(NIVELES_LANDING.primaria, media)}
      monto={inversion.primaria}
      textoLinea={inversion.textoLinea}
      descuentoHermano={inversion.descuentoHermano}
      faqs={faqs}
      admisionHref={admision.rutaFormulario || '/admision'}
      admisionLabel={admision.etiquetaBoton || 'Admisión'}
    />
  )
}
