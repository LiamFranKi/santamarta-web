import { PaginaNosotros } from '@/components/santamarta/paginas'
import { exigirBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'

export default async function NosotrosPage() {
  await exigirBilingue()
  return <PaginaNosotros />
}
