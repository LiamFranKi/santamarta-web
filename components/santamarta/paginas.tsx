'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { EQUIPO, RETRATOS } from './copia'
import { useSms } from './SantaMartaMarco'

function Cabecera({ kicker, titulo, children }: { kicker: string; titulo: ReactNode; children?: ReactNode }) {
  const { t } = useSms()
  return (
    <header className="sms-pagina-head sms-wrap">
      <Link className="sms-migas" href="/">{t('volverInicio')}</Link>
      <div className="sms-kicker">{kicker}</div>
      <h1>{titulo}</h1>
      {children}
    </header>
  )
}

export function PaginaNosotros() {
  const { t } = useSms()
  return (
    <article className="sms-pagina">
      <Cabecera kicker={t('dColegioK')} titulo={<>{t('nos1')}<br />{t('nos2')} <em>{t('nos3')}</em></>}>
        <p>{t('nosP1')}</p>
        <p>{t('nosP2')}</p>
      </Cabecera>
      <div className="sms-wrap sms-bloques">
        <section><h2>{t('mision')}</h2><p>{t('misionP')}</p></section>
        <section><h2>{t('vision')}</h2><p>{t('visionP')}</p></section>
        <section><h2>{t('valores')}</h2><p>{t('valoresP')}</p></section>
      </div>
      <div className="sms-wrap sms-pagina-cta">
        <Link className="sms-btn" href="/admision">{t('consultar')} <i>↗</i></Link>
      </div>
    </article>
  )
}

export function PaginaNiveles() {
  const { t } = useSms()
  return (
    <article className="sms-pagina">
      <Cabecera kicker={t('cejaNiveles')} titulo={<>{t('niv1')} <em>{t('niv2')}</em></>}>
        <p>{t('nivTexto')}</p>
      </Cabecera>
      <div className="sms-wrap sms-level-grid">
        <article className="sms-level inicial">
          <div className="sms-level-top"><span className="sms-pill">{t('pillInicial')}</span><span className="sms-symbol" aria-hidden="true">✿</span></div>
          <h3>{t('inicial')}</h3>
          <p>{t('inicialP')}</p>
          <div className="sms-tags"><span>{t('tagArte')}</span><span>{t('tagJuego')}</span></div>
          <Link className="sms-level-link" href="/niveles/inicial">{t('verInicial')} <span>↗</span></Link>
        </article>
        <article className="sms-level primaria">
          <div className="sms-level-top"><span className="sms-pill">{t('pillPrimaria')}</span><span className="sms-symbol" aria-hidden="true">✷</span></div>
          <h3>{t('primaria')}</h3>
          <p>{t('primariaP')}</p>
          <div className="sms-tags"><span>{t('tagIngles')}</span><span>{t('tagRobotica')}</span></div>
          <Link className="sms-level-link" href="/niveles/primaria">{t('verPrimaria')} <span>↗</span></Link>
        </article>
      </div>
    </article>
  )
}

export function PaginaInicial() {
  const { t } = useSms()
  return (
    <article className="sms-pagina">
      <Cabecera kicker={t('dIniK')} titulo={t('dIniT')}>
        <p>{t('dIniP')}</p>
      </Cabecera>
      <div className="sms-wrap sms-prosa">
        <h2>{t('experiencias')}</h2>
        <ul className="sms-lista"><li>{t('i1')}</li><li>{t('i2')}</li><li>{t('i3')}</li><li>{t('i4')}</li></ul>
        <p>{t('iNota')}</p>
        <Link className="sms-btn" href="/admision">{t('consultar')} <i>↗</i></Link>
      </div>
    </article>
  )
}

export function PaginaPrimaria() {
  const { t } = useSms()
  return (
    <article className="sms-pagina">
      <Cabecera kicker={t('dPriK')} titulo={t('dPriT')}>
        <p>{t('dPriP')}</p>
      </Cabecera>
      <div className="sms-wrap sms-prosa">
        <h2>{t('explorar')}</h2>
        <ul className="sms-lista"><li>{t('p1')}</li><li>{t('p2')}</li><li>{t('p3')}</li><li>{t('p4')}</li></ul>
        <p>{t('pNota')}</p>
        <Link className="sms-btn" href="/admision">{t('consultar')} <i>↗</i></Link>
      </div>
    </article>
  )
}

export function PaginaEquipo() {
  const { t } = useSms()
  return (
    <article className="sms-pagina">
      <Cabecera kicker={t('dEqK')} titulo={<>{t('eq1')}<br /><em>{t('eq2')}</em></>}>
        <p>{t('eqTexto')}</p>
      </Cabecera>
      <div className="sms-wrap sms-team-grid">
        {RETRATOS.map((persona) => (
          <article key={persona.nombre}>
            <img src={persona.foto} alt={persona.nombre} />
            <div><h3>{persona.nombre}</h3><span>{t('cargo')}</span></div>
          </article>
        ))}
      </div>
      <div className="sms-wrap sms-prosa">
        <h2>{t('dEqT')}</h2>
        <p>{t('dEqP')}</p>
        <ul className="sms-staff">{EQUIPO.map((nombre) => <li key={nombre}>{nombre}</li>)}</ul>
      </div>
    </article>
  )
}

export function PaginaVida() {
  const { t } = useSms()
  return (
    <article className="sms-pagina">
      <Cabecera kicker={t('cejaVida')} titulo={<>{t('vida1')}<br /><em>{t('vida2')}</em></>}>
        <p>{t('vidaTexto')}</p>
      </Cabecera>
      <div className="sms-wrap sms-features">
        <article><span className="sms-ico y">Aa</span><div><h3>{t('f1t')}</h3><p>{t('f1p')}</p></div></article>
        <article><span className="sms-ico g">♡</span><div><h3>{t('f2t')}</h3><p>{t('f2p')}</p></div></article>
        <article><span className="sms-ico p">✧</span><div><h3>{t('f3t')}</h3><p>{t('f3p')}</p></div></article>
        <article><span className="sms-ico b">⌘</span><div><h3>{t('f4t')}</h3><p>{t('f4p')}</p></div></article>
      </div>
    </article>
  )
}

export function PaginaAdmision() {
  const { t, datos } = useSms()
  const [nivel, setNivel] = useState<'Inicial' | 'Primaria'>('Inicial')
  const wa = `https://wa.me/${datos.whatsapp}?text=${encodeURIComponent(t(nivel === 'Inicial' ? 'waInicial' : 'waPrimaria'))}`
  const segundo = datos.telefonos[1]
  return (
    <article className="sms-pagina">
      <div className="sms-wrap sms-adm">
        <div>
          <Link className="sms-migas" href="/">{t('volverInicio')}</Link>
          <div className="sms-kicker">{t('cejaAdm')}</div>
          <h1>{t('adm1')}<br /><em>{t('adm2')}</em></h1>
          <p>{t('admTexto')}</p>
          <div className="sms-pasos">
            <p><b>01</b> {t('paso1')}</p>
            <p><b>02</b> {t('paso2')}</p>
            <p><b>03</b> {t('paso3')}</p>
          </div>
          <small>{t('admNota')}</small>
        </div>
        <div className="sms-card">
          <div className="sms-kicker">{t('cardKicker')}</div>
          <h3>{t('cardHola')}</h3>
          <p>{t('cardP')}</p>
          <label htmlFor="sms-nivel-pagina">{t('nivel')}</label>
          <select id="sms-nivel-pagina" value={nivel} onChange={(e) => setNivel(e.target.value === 'Primaria' ? 'Primaria' : 'Inicial')}>
            <option value="Inicial">{t('inicial')}</option>
            <option value="Primaria">{t('primaria')}</option>
          </select>
          <a className="sms-btn green" href={wa} target="_blank" rel="noopener noreferrer">{t('wa')} <i>↗</i></a>
          <small>{t('waNota')}</small>
          <div className="sms-divide">{t('oLlama')}</div>
          <a className="sms-phone" href={datos.telefonos[0]?.href}>{datos.telefonos[0]?.visible}</a>
          {segundo ? <a className="sms-phone sec" href={segundo.href}>{t('tambien')}: {segundo.visible}</a> : null}
        </div>
      </div>
    </article>
  )
}

export function TituloSolicitud() {
  const { t } = useSms()
  return <h2 className="sms-solicitud-titulo">{t('solicitudTitulo')}</h2>
}
