import { PaginaNiveles } from '@/components/santamarta/paginas'
import { exigirBilingue } from '@/lib/sms'

export const dynamic = 'force-dynamic'

export default async function NivelesPage() {
  await exigirBilingue()
  return <PaginaNiveles />
}
