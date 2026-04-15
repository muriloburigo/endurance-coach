import { createAdminClient } from '~/lib/supabase/server'
import DepoimentosClient from './DepoimentosClient'

export default async function DepoimentosPage() {
  const { data } = await createAdminClient().from('testimonials').select('*').order('sort_order')
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-1">Depoimentos</h1>
        <p className="text-[#888888] text-sm">Gerencie os depoimentos exibidos na loja.</p>
      </div>
      <DepoimentosClient testimonials={data ?? []} />
    </div>
  )
}
