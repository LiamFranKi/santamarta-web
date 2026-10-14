import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Levels from '@/components/sections/Levels'
import AdmissionProcess from '@/components/sections/AdmissionProcess'
import VideoSection from '@/components/sections/VideoSection'
import AvisoLibroReclamaciones from '@/components/AvisoLibroReclamaciones'
import SantaMartaInicio from '@/components/santamarta/SantaMartaInicio'
import { obtenerAparienciaPublica } from '@/lib/apariencia'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const apariencia = await obtenerAparienciaPublica()
  if (apariencia.web === 'bilingue') return <SantaMartaInicio />
  return (
    <>
      <Hero plantilla={apariencia.web} />
      <About />
      <Levels />
      <AdmissionProcess />
      <VideoSection />
      <AvisoLibroReclamaciones />
    </>
  )
}

