import { Metadata } from 'next'
import Contact from '@/components/sections/Contact'
import PaginaMarco from '@/components/santamarta/PaginaMarco'
import { esBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Teléfonos, correo y dirección de Santa Marta School.',
}

export default async function ContactoPage() {
  const cuerpo = (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <br />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Contáctanos
            </h1>
            <p className="text-xl md:text-2xl text-white/90 md:whitespace-nowrap">
              Estamos aquí para responder todas tus preguntas y ayudarte en el proceso de admisión
            </p>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  )
  if (!(await esBilingue())) return cuerpo
  return <PaginaMarco kicker="pContactoK" titulo="pContactoT" texto="pContactoP">{cuerpo}</PaginaMarco>
}

