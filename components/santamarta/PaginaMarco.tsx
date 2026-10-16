'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { type ClaveSms } from './copia'
import { useSms } from './SantaMartaMarco'

export default function PaginaMarco({
  kicker,
  titulo,
  texto,
  children,
}: {
  kicker: ClaveSms
  titulo: ClaveSms
  texto?: ClaveSms
  children: ReactNode
}) {
  const { t } = useSms()
  return (
    <article className="sms-pagina">
      <header className="sms-pagina-head sms-wrap">
        <Link className="sms-migas" href="/">{t('volverInicio')}</Link>
        <div className="sms-kicker">{kicker && t(kicker)}</div>
        <h1>{t(titulo)}</h1>
        {texto ? <p>{t(texto)}</p> : null}
      </header>
      <div className="sms-sin-hero">{children}</div>
    </article>
  )
}
