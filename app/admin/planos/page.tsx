import { createAdminClient } from '~/lib/supabase/server'
import type { Plan } from '~/lib/types'
import { LEVEL_LABEL, DISTANCE_LABEL } from '~/lib/types'
import PlanosAdminClient from './PlanosAdminClient'

export default async function AdminPlanosPage() {
  const db = createAdminClient()
  const { data: plans } = await db.from('plans').select('*').order('sort_order')
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-1">Planos</h1>
        <p className="text-[#888888] text-sm">Gerencie planos, vincule links do Training Peaks e configure preços.</p>
      </div>
      <PlanosAdminClient plans={(plans ?? []) as Plan[]} />
    </div>
  )
}
