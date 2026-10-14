import { PaginaEquipo } from '@/components/santamarta/paginas'
import { exigirBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'

export default async function EquipoPage() {
  await exigirBilingue()
  return <PaginaEquipo />
}
