import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import ChatWidget from '@/components/ChatWidget'
import BannerModalWrapper from '@/components/BannerModalWrapper'
import BannerButton from '@/components/BannerButton'
import { obtenerAparienciaPublica } from '@/lib/apariencia'
import { obtenerMarcaPublica } from '@/lib/marca-publica'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const TITULO_VANGUARD = 'Vanguard Schools - A la Vanguardia de la Tecnología'

export async function generateMetadata(): Promise<Metadata> {
  const marca = await obtenerMarcaPublica()
  const frase = marca.tituloPagina
  const tituloInicio = frase || (marca.propia ? marca.nombre : TITULO_VANGUARD)
  const sufijo = frase || (marca.propia ? marca.nombre : 'Vanguard Schools')
  return {
  title: {
    default: tituloInicio,
    template: `%s | ${sufijo}`,
  },
  description: 'Colegio Vanguard Schools en San Martín de Porres, Lima. Educación Inicial, Primaria y Secundaria con metodología STEAM, inglés intensivo, piscinas temperadas y tecnología de vanguardia. Formamos líderes del mañana.',
  keywords: [
    'colegio Lima',
    'colegio San Martín de Porres',
    'educación inicial',
    'educación primaria',
    'educación secundaria',
    'colegio privado Lima',
    'colegio con inglés',
    'colegio STEAM',
    'colegio tecnología',
    'colegio piscina',
    'colegio Vanguard Schools',
    'mejor colegio SMP',
    'colegio bilingüe Lima',
    'colegio innovación educativa',
  ],
  authors: [{ name: sufijo }],
  creator: sufijo,
  publisher: sufijo,
  metadataBase: new URL('https://www.vanguardschools.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://www.vanguardschools.com',
    siteName: sufijo,
    title: tituloInicio,
    description: 'Colegio Vanguard Schools - Educación Inicial, Primaria y Secundaria con metodología STEAM, inglés intensivo y tecnología de vanguardia en San Martín de Porres, Lima.',
    images: [
      {
        url: '/LOGO6.png',
        width: 1200,
        height: 630,
        alt: 'Vanguard Schools Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tituloInicio,
    description: 'Colegio Vanguard Schools - Educación Inicial, Primaria y Secundaria con metodología STEAM y tecnología de vanguardia.',
    images: ['/LOGO6.png'],
  },
  icons: {
    icon: marca.favicon,
    apple: marca.favicon,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agregar cuando tengas Google Search Console
    // google: 'tu-codigo-de-verificacion',
  },
  }
}

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const apariencia = await obtenerAparienciaPublica()
  const marca = await obtenerMarcaPublica()
  const claseWeb = apariencia.web === 'actual' ? '' : ` web-${apariencia.web}`
  return (
    <html lang="es" className={inter.variable} style={apariencia.color ? { ['--web-color' as string]: apariencia.color } : undefined}>
      <head>
        <link rel="icon" href={marca.favicon} />
        <link rel="apple-touch-icon" href={marca.favicon} />
        <link rel="canonical" href="https://www.vanguardschools.com" />
      </head>
      <body className={`min-h-screen flex flex-col${claseWeb}`}>
        <StructuredData />
        <Header
          plantilla={apariencia.web}
          nombre={marca.nombre}
          logo={marca.logo}
          intranetUrl={marca.intranetUrl}
          propia={marca.propia}
          lema={marca.lema}
          lemaVerde={marca.lemaVerde}
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer nombre={marca.nombre} logo={marca.logoPie} propia={marca.propia} />
        <ChatWidget />
        <BannerButton />
        <BannerModalWrapper />
      </body>
    </html>
  )
}

