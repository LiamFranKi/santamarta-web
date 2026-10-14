'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RETRATOS, type ClaveSms } from './copia'
import { useSms } from './SantaMartaMarco'

export default function SantaMartaInicio() {
  const { t, datos } = useSms()
  const [nivel, setNivel] = useState<'Inicial' | 'Primaria'>('Inicial')

  const wa = `https://wa.me/${datos.whatsapp}?text=${encodeURIComponent(t(nivel === 'Inicial' ? 'waInicial' : 'waPrimaria'))}`
  const segundo = datos.telefonos[1]

  return (
    <div className="sms-home">
      <section className="sms-hero">
        <div className="sms-wrap sms-hero-grid">
          <div className="sms-hero-copy">
            <div className="sms-kicker"><span className="sms-dot" />{t('cejaHero')}</div>
            <h1>{t('hero1')}<br />{t('hero2')} <em>{t('hero3')}</em></h1>
            <p>{t('heroTexto')}</p>
            <div className="sms-actions">
              <Link className="sms-btn" href="/admision">{t('heroCta')} <i>↗</i></Link>
              <Link className="sms-text" href="/niveles">{t('heroLink')} <span>↓</span></Link>
            </div>
            <div className="sms-hero-foot">
              <span className="sms-sun" aria-hidden="true">✳</span>
              <span>{t('heroPie1')}<br /><strong>{t('heroPie2')}</strong></span>
            </div>
          </div>
          <div className="sms-art">
            <div className="sms-orbit" />
            <span className="sms-spark" aria-hidden="true">✳</span>
            <span className="sms-scribble" aria-hidden="true">✧</span>
            <div className="sms-label"><span className="sms-serif">{t('hello')}!</span>{t('mundo')}</div>
            <img className="sms-children" src="/santa-marta/ninos.webp" alt={t('altNinos')} />
            <div className="sms-note"><span aria-hidden="true">♡</span><div>{t('nota1')}<br /><strong>{t('nota2')}</strong></div></div>
            <div className="sms-caption">{t('caption')}</div>
          </div>
        </div>
      </section>

      <div className="sms-values">
        <div className="sms-wrap">
          <span>{t('v1')} <b>✦</b></span>
          <span>{t('v2')} <b>✦</b></span>
          <span>{t('v3')} <b>✦</b></span>
          <span>{t('v4')}</span>
        </div>
      </div>

      <section className="sms-sec sms-wrap sms-intro" id="nosotros">
        <div>
          <div className="sms-kicker">{t('cejaNosotros')}</div>
          <h2>{t('nos1')}<br />{t('nos2')} <em>{t('nos3')}</em></h2>
        </div>
        <div>
          <p>{t('nosP1')}</p>
          <p>{t('nosP2')}</p>
          <Link className="sms-text" href="/nosotros">{t('nosLink')} <span>↗</span></Link>
        </div>
      </section>

      <section className="sms-sec sms-levels" id="niveles">
        <div className="sms-wrap">
          <div className="sms-head">
            <div>
              <div className="sms-kicker">{t('cejaNiveles')}</div>
              <h2>{t('niv1')} <em>{t('niv2')}</em></h2>
            </div>
            <p>{t('nivTexto')}</p>
          </div>
          <div className="sms-level-grid">
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
        </div>
      </section>

      <section className="sms-sec sms-wrap sms-approach" id="vida">
        <div>
          <div className="sms-kicker">{t('cejaVida')}</div>
          <h2>{t('vida1')}<br /><em>{t('vida2')}</em></h2>
          <p>{t('vidaTexto')}</p>
          <Link className="sms-text" href="/vida">{t('navVida')} <span>↗</span></Link>
          <div className="sms-heart" aria-hidden="true">♡</div>
        </div>
        <div className="sms-features">
          <article><span className="sms-ico y">Aa</span><div><h3>{t('f1t')}</h3><p>{t('f1p')}</p></div></article>
          <article><span className="sms-ico g">♡</span><div><h3>{t('f2t')}</h3><p>{t('f2p')}</p></div></article>
          <article><span className="sms-ico p">✧</span><div><h3>{t('f3t')}</h3><p>{t('f3p')}</p></div></article>
          <article><span className="sms-ico b">⌘</span><div><h3>{t('f4t')}</h3><p>{t('f4p')}</p></div></article>
        </div>
      </section>

      <section className="sms-sec sms-team" id="equipo">
        <div className="sms-wrap">
          <div className="sms-head">
            <div>
              <div className="sms-kicker">{t('cejaEquipo')}</div>
              <h2>{t('eq1')}<br /><em>{t('eq2')}</em></h2>
            </div>
            <p>{t('eqTexto')}</p>
          </div>
          <div className="sms-team-grid">
            {RETRATOS.map((persona) => (
              <article key={persona.nombre}>
                <img src={persona.foto} alt={persona.nombre} />
                <div><h3>{persona.nombre}</h3><span>{t('cargo')}</span></div>
              </article>
            ))}
          </div>
          <div className="sms-team-bottom">
            <span>{t('eqPie')}</span>
            <Link className="sms-text" href="/equipo">{t('verEquipo')} <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="sms-sec sms-wrap sms-adm" id="admision">
        <div>
          <div className="sms-kicker">{t('cejaAdm')}</div>
          <h2>{t('adm1')}<br /><em>{t('adm2')}</em></h2>
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
          <label htmlFor="sms-nivel">{t('nivel')}</label>
          <select id="sms-nivel" value={nivel} onChange={(e) => setNivel(e.target.value === 'Primaria' ? 'Primaria' : 'Inicial')}>
            <option value="Inicial">{t('inicial')}</option>
            <option value="Primaria">{t('primaria')}</option>
          </select>
          <a className="sms-btn green" href={wa} target="_blank" rel="noopener noreferrer">{t('wa')} <i>↗</i></a>
          <small>{t('waNota')}</small>
          <a className="sms-form-link" href="/admision#formulario">{t('formLink')}</a>
          <div className="sms-divide">{t('oLlama')}</div>
          <a className="sms-phone" href={datos.telefonos[0]?.href}>{datos.telefonos[0]?.visible}</a>
          {segundo ? <a className="sms-phone sec" href={segundo.href}>{t('tambien')}: {segundo.visible}</a> : null}
        </div>
      </section>

      <section className="sms-sec sms-wrap sms-faq">
        <div>
          <div className="sms-kicker">{t('cejaFaq')}</div>
          <h2>{t('faq1')}<br /><em>{t('faq2')}</em></h2>
        </div>
        <div>
          {(['q1', 'q2', 'q3', 'q4'] as ClaveSms[]).map((pregunta, i) => (
            <details key={pregunta}>
              <summary>{t(pregunta)}</summary>
              <p>{t(`a${i + 1}` as ClaveSms)}{i === 2 ? ` ${datos.telefonos.map((n) => n.visible).join(' · ')}` : ''}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="sms-visit">
        <div className="sms-wrap">
          <div>
            <div className="sms-kicker">{t('cejaVisita')}</div>
            <h2>{t('vis1')}<br />{t('vis2')}</h2>
            <p>{datos.direccion}</p>
          </div>
          <a className="sms-btn light" href={datos.mapa} target="_blank" rel="noopener noreferrer">{t('comoLlegar')} <i>↗</i></a>
        </div>
      </section>

    </div>
  )
}
