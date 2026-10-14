import { PaginaVida } from '@/components/santamarta/paginas'
import { exigirBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'

export default async function VidaPage() {
  await exigirBilingue()
  return <PaginaVida />
}
