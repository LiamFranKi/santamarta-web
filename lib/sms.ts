import { redirect } from 'next/navigation'
import { obtenerAparienciaPublica } from './apariencia'

export async function esBilingue() {
  const apariencia = await obtenerAparienciaPublica()
  return apariencia.web === 'bilingue'
}

export async function exigirBilingue() {
  if (!(await esBilingue())) redirect('/')
}
