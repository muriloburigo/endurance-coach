import { createAdminClient } from '~/lib/supabase/server'
import LeadsClient from './LeadsClient'

export default async function LeadsPage() {
  const db = createAdminClient()
  const { data: leads } = await db.from('leads').select('*').order('created_at', { ascending: false })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-1">Leads</h1>
        <p className="text-[#888888] text-sm">Emails capturados com intenção de compra. Marque como convertido quando confirmar a compra no Training Peaks.</p>
      </div>
      <LeadsClient leads={leads ?? []} />
    </div>
  )
}
