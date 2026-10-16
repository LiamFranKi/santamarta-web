import { Metadata } from 'next'
import WorkWithUsForm from '@/components/sections/WorkWithUsForm'
import PaginaMarco from '@/components/santamarta/PaginaMarco'
import { esBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Trabaja con Nosotros',
  description: 'Envía tu currículum y postula al equipo de Santa Marta School.',
}

export default async function TrabajaConNosotrosPage() {
  const cuerpo = (
    <div className="pt-20">
      {/* Banner superior */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <br />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Trabaja con Nosotros
            </h1>
            <p className="text-xl md:text-2xl text-white/90 md:whitespace-nowrap">
              Comparte tu experiencia y forma parte de Santa Marta School
            </p>
          </div>
        </div>
      </section>

      <WorkWithUsForm />
    </div>
  )
  if (!(await esBilingue())) return cuerpo
  return <PaginaMarco kicker="pTraK" titulo="pTraT" texto="pTraP">{cuerpo}</PaginaMarco>
}



