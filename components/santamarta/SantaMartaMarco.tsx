'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fraunces, Outfit } from 'next/font/google'
import { COPIA, type ClaveSms, type IdiomaSms } from './copia'
import type { DatosSantaMarta } from '@/lib/santamarta-datos'
import './santamarta.css'

const sans = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sms-sans',
  display: 'swap',
})
const serif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-sms-serif',
  display: 'swap',
})

type Ctx = {
  lang: IdiomaSms
  setLang: (idioma: IdiomaSms) => void
  t: (clave: ClaveSms) => string
  datos: DatosSantaMarta
}

const SmsCtx = createContext<Ctx | null>(null)

export function useSms() {
  const valor = useContext(SmsCtx)
  if (!valor) throw new Error('Santa Marta')
  return valor
}

function urlMatricula(intranetUrl: string) {
  const base = String(intranetUrl || '').replace(/\/+$/, '')
  if (!base || /vanguardschools/i.test(base)) return 'http://89.117.52.9:8080/matricula_online'
  return `${base}/matricula_online`
}

const REDES = [
  { nombre: 'Facebook', href: 'https://www.facebook.com/santamartaschool' },
  { nombre: 'Instagram', href: 'https://www.instagram.com/santamartaschool' },
  { nombre: 'X', href: 'https://x.com/santamartaschool' },
  { nombre: 'YouTube', href: 'https://www.youtube.com/@santamartaschool1765' },
] as const

function IconoRed({ nombre }: { nombre: string }) {
  if (nombre === 'Facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 8.5V6.8c0-.6.4-.8.8-.8h1.7V3.5h-2.3C12.2 3.5 11 4.9 11 7.1v1.4H8.7v2.6H11V20h2.9v-8.9h2.3l.3-2.6h-2.6z" /></svg>
  }
  if (nombre === 'Instagram') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" /></svg>
  }
  if (nombre === 'X') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.6 10.4 21.4 3h-1.6l-5.9 6.4L8.7 3H3l7.1 10.1L3 21h1.6l6.2-6.8L15.1 21H21l-6.4-10.6Zm-2.2 2.4-.7-1L5.2 4.2h2.4l4.6 6.5.7 1 6.1 8.6h-2.4l-4.2-5.9Z" /></svg>
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 12.2s0-3.1-.4-4.5c-.2-.9-.9-1.6-1.8-1.8C19.2 5.5 12 5.5 12 5.5s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9.1 1 12.2 1 12.2s0 3.1.4 4.5c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.5.4-4.5ZM9.8 15.5V8.9l6.1 3.3-6.1 3.3Z" /></svg>
}

function IconosRedes() {
  return (
    <div className="sms-redes">
      {REDES.map((red) => (
        <a key={red.nombre} className="sms-red" href={red.href} target="_blank" rel="noopener noreferrer" aria-label={red.nombre}>
          <IconoRed nombre={red.nombre} />
        </a>
      ))}
    </div>
  )
}

function marcado(pathname: string, href: string) {
  if (href === '/niveles') return pathname === '/niveles' || pathname.startsWith('/niveles/')
  return pathname === href
}

export default function SantaMartaMarco({
  datos,
  children,
}: {
  datos: DatosSantaMarta
  children: React.ReactNode
}) {
  const [lang, setLangState] = useState<IdiomaSms>('es')
  const [menu, setMenu] = useState(false)
  const [ayuda, setAyuda] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    try {
      if (localStorage.getItem('sms-language') === 'en') setLangState('en')
    } catch { /* el idioma sigue en español */ }
  }, [])

  const setLang = (idioma: IdiomaSms) => {
    setLangState(idioma)
    try { localStorage.setItem('sms-language', idioma) } catch { /* sigue el cambio en esta visita */ }
  }

  const t = (clave: ClaveSms) => COPIA[lang][clave]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t('tituloDoc')
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t('descripcionDoc'))
  }, [lang])

  useEffect(() => { setMenu(false); setAyuda(false) }, [pathname])

  const cerrarMenu = () => setMenu(false)

  return (
    <SmsCtx.Provider value={{ lang, setLang, t, datos }}>
      <div className={`sms ${sans.variable} ${serif.variable}`}>
        <a className="sms-skip" href="#contenido">{t('skip')}</a>
        <div className="sms-top">
          <div className="sms-wrap">
            <span className="sms-lugar">{t('frase')} <b>{t('lugar')}</b></span>
            <a className="sms-intra" href={datos.intranetUrl} target="_blank" rel="noopener noreferrer">{t('intranet')} ↗</a>
            <IconosRedes />
            <div className="sms-lang" role="group" aria-label="Idioma / Language">
              <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>Español</button>
              <span aria-hidden="true">/</span>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
            </div>
          </div>
        </div>
        <header className="sms-header">
          <div className="sms-wrap sms-nav">
            <Link href="/" className="sms-brand" onClick={cerrarMenu}>
              <img src={datos.logo} alt="Santa Marta School" />
              <span className="sms-wordmark">{datos.marca}<small>{t('school')}</small></span>
            </Link>
            <button
              type="button"
              className="sms-menu"
              aria-expanded={menu}
              aria-controls="sms-nav"
              aria-label={menu ? t('menuCerrar') : t('menuAbrir')}
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? '×' : '☰'}
            </button>
            <nav id="sms-nav" className={`sms-links${menu ? ' open' : ''}`} aria-label={lang === 'en' ? 'Main' : 'Principal'}>
              <Link className={marcado(pathname, '/nosotros') ? 'is-on' : ''} href="/nosotros" onClick={cerrarMenu}>{t('navColegio')}</Link>
              <div className="sms-drop">
                <Link className={marcado(pathname, '/niveles') ? 'is-on' : ''} href="/niveles" onClick={cerrarMenu}>{t('navNiveles')}</Link>
                <div className="sms-drop-panel">
                  <Link href="/niveles/inicial" onClick={cerrarMenu}>{t('inicial')}</Link>
                  <Link href="/niveles/primaria" onClick={cerrarMenu}>{t('primaria')}</Link>
                </div>
              </div>
              <Link className={marcado(pathname, '/equipo') ? 'is-on' : ''} href="/equipo" onClick={cerrarMenu}>{t('navEquipo')}</Link>
              <Link className={marcado(pathname, '/vida') ? 'is-on' : ''} href="/vida" onClick={cerrarMenu}>{t('navVida')}</Link>
              <div className="sms-drop sms-drop-der">
                <button type="button" className="sms-drop-btn" aria-haspopup="true">{t('navMas')} ▾</button>
                <div className="sms-drop-panel">
                  <div className="sms-drop-k">{t('masFamilias')}</div>
                  <Link href="/visita-guiada" onClick={cerrarMenu}>{t('navVisita')}</Link>
                  <Link href="/contacto" onClick={cerrarMenu}>{t('navContacto')}</Link>
                  <Link href="/preguntas-frecuentes" onClick={cerrarMenu}>{t('navFaq')}</Link>
                  <Link href="/lista-utiles" onClick={cerrarMenu}>{t('navUtiles')}</Link>
                  <Link href="/documentos" onClick={cerrarMenu}>{t('navDocumentos')}</Link>
                  <Link href="/calendarizacion" onClick={cerrarMenu}>{t('navCalendario')}</Link>
                  <Link href="/libro-de-reclamaciones" onClick={cerrarMenu}>{t('reclamaciones')}</Link>
                  <Link href="/sugerencias" onClick={cerrarMenu}>{t('navSugerencias')}</Link>
                  <a href={urlMatricula(datos.intranetUrl)}>{t('navMatricula')}</a>
                  <div className="sms-drop-k">{t('masColegio')}</div>
                  <Link href="/convenios" onClick={cerrarMenu}>{t('navConvenios')}</Link>
                  <Link href="/trabaja-con-nosotros" onClick={cerrarMenu}>{t('navTrabaja')}</Link>
                </div>
              </div>
              <Link className={`sms-btn small${marcado(pathname, '/admision') ? ' is-on' : ''}`} href="/admision" onClick={cerrarMenu}>{t('navAdmision')} <i>↗</i></Link>
            </nav>
          </div>
        </header>
        <main id="contenido">{children}</main>
        <footer className="sms-footer">
          <div className="sms-wrap sms-foot-grid">
            <div>
              <Link href="/" className="sms-brand">
                <img src={datos.logo} alt="" />
                <span className="sms-wordmark">{datos.marca}<small>{t('school')}</small></span>
              </Link>
              <p>{t('pieMarca')}</p>
            </div>
            <div>
              <h3>{t('descubre')}</h3>
              <Link href="/nosotros">{t('navColegio')}</Link>
              <Link href="/niveles">{t('inicial')} y {t('primaria')}</Link>
              <Link href="/equipo">{t('navEquipo')}</Link>
              <Link href="/vida">{t('navVida')}</Link>
            </div>
            <div>
              <h3>{t('familias')}</h3>
              <Link href="/admision">{t('navAdmision')}</Link>
              <Link href="/visita-guiada">{t('navVisita')}</Link>
              <Link href="/contacto">{t('navContacto')}</Link>
              <Link href="/lista-utiles">{t('navUtiles')}</Link>
              <Link href="/documentos">{t('navDocumentos')}</Link>
              <Link href="/libro-de-reclamaciones">{t('reclamaciones')}</Link>
              <a href={urlMatricula(datos.intranetUrl)}>{t('navMatricula')}</a>
              <a href={datos.intranetUrl}>{t('intranetEscolar')}</a>
            </div>
            <div>
              <h3>{t('conversemos')}</h3>
              <a href={`mailto:${datos.correo}`}>{datos.correo}</a>
              <a href={datos.telefonos[0]?.href}>{datos.telefonos[0]?.visible}</a>
              <IconosRedes />
            </div>
          </div>
          <div className="sms-wrap sms-foot-bottom">
            <span>© {t('derechos')}</span>
            <span>{t('pieFrase')}</span>
          </div>
        </footer>
        {ayuda ? (
          <aside className="sms-panel">
            <button type="button" className="sms-x" aria-label={t('cerrarAyuda')} onClick={() => setAyuda(false)}>×</button>
            <strong className="sms-serif">{t('martitaHola')}</strong>
            <p>{t('martitaP')}</p>
            <Link href="/niveles" onClick={() => setAyuda(false)}>{t('martitaNiveles')} ↗</Link>
            <Link href="/admision" onClick={() => setAyuda(false)}>{t('martitaAdm')} ↗</Link>
            <a href={`https://wa.me/${datos.whatsapp}?text=${encodeURIComponent(t('waContacto'))}`} target="_blank" rel="noopener noreferrer">{t('martitaWa')} ↗</a>
            <small>{t('martitaGuia')}</small>
          </aside>
        ) : null}
        <button type="button" className="sms-martita" aria-expanded={ayuda} onClick={() => setAyuda((v) => !v)}>
          <img src="/santa-marta/martita.png?v=3" alt="" />
          <span>{t('martitaBtn')}</span>
        </button>
      </div>
    </SmsCtx.Provider>
  )
}
