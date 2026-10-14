import { Metadata } from 'next'
import AdmissionForm from '@/components/sections/AdmissionForm'
import { PaginaAdmision, TituloSolicitud } from '@/components/santamarta/paginas'
import { getAdmisionConfigPublica } from '@/lib/admision-config'
import { esBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  if (await esBilingue()) {
    return {
      title: 'Admisión · Santa Marta School',
      description: 'Solicita información de admisión para inicial o primaria en Santa Marta School.',
    }
  }
  const cfg = await getAdmisionConfigPublica()
  return {
    title: `Admisión ${cfg.anio}`,
    description: `Formulario de admisión y ratificación para el año ${cfg.anio} en Vanguard Schools. Regístrate y nos comunicaremos contigo.`,
  }
}

export default async function AdmisionPage() {
  if (await esBilingue()) {
    return (
      <>
        <PaginaAdmision />
        <div id="formulario" className="sms-formulario">
          <TituloSolicitud />
          <AdmissionForm soloInicialPrimaria />
        </div>
      </>
    )
  }
  const cfg = await getAdmisionConfigPublica()

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-amber-500 via-orange-500 via-amber-600 via-orange-600 to-amber-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <br />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{cfg.tituloPagina}</h1>
            <p className="text-xl md:text-2xl text-white/90 md:whitespace-nowrap">
              Forma parte de la familia Vanguard Schools
            </p>
          </div>
        </div>
      </section>

      <AdmissionForm />
    </div>
  )
}
