import { createAdminClient } from '~/lib/supabase/server'

export default async function DashboardPage() {
  const db = createAdminClient()

  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString()

  const [
    { count: totalLeads },
    { count: leadsToday },
    { count: leadsYesterday },
    { count: converted },
    { data: byPlan },
    { data: byDay },
    { data: recentLeads },
  ] = await Promise.all([
    db.from('leads').select('*', { count: 'exact', head: true }),
    db.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', `${today}T00:00:00`),
    db.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', `${yesterday}T00:00:00`).lt('created_at', `${today}T00:00:00`),
    db.from('leads').select('*', { count: 'exact', head: true }).eq('converted', true),
    db.from('leads').select('plan_title').gte('created_at', thirtyDaysAgo).not('plan_title', 'is', null),
    db.from('leads').select('created_at').gte('created_at', thirtyDaysAgo).order('created_at', { ascending: true }),
    db.from('leads').select('email, plan_title, converted, created_at').order('created_at', { ascending: false }).limit(10),
  ])

  // Aggregate by plan
  const planCounts: Record<string, number> = {}
  ;(byPlan ?? []).forEach((l: any) => {
    if (l.plan_title) planCounts[l.plan_title] = (planCounts[l.plan_title] ?? 0) + 1
  })
  const topPlans = Object.entries(planCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)

  // Aggregate by day (last 14 days)
  const dayCounts: Record<string, number> = {}
  ;(byDay ?? []).forEach((l: any) => {
    const d = new Date(l.created_at).toISOString().slice(0, 10)
    dayCounts[d] = (dayCounts[d] ?? 0) + 1
  })
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(Date.now() - (13 - i) * 86400000).toISOString().slice(0, 10)
    return { date: d, count: dayCounts[d] ?? 0 }
  })
  const maxCount = Math.max(...last14.map(d => d.count), 1)

  const kpis = [
    { label: 'Total de leads', value: totalLeads ?? 0, sub: 'desde o início' },
    { label: 'Leads hoje', value: leadsToday ?? 0, sub: `${leadsYesterday ?? 0} ontem` },
    { label: 'Convertidos', value: converted ?? 0, sub: 'marcados como compra' },
    { label: 'Taxa conversão', value: totalLeads ? `${Math.round(((converted ?? 0) / totalLeads) * 100)}%` : '—', sub: 'leads → compra' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-white mb-1">Dashboard</h1>
        <p className="text-[#888888] text-sm">Acompanhe intenções de compra e conversões.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
            <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{k.value}</p>
            <p className="text-xs text-white font-medium">{k.label}</p>
            <p className="text-xs text-[#888888] mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart últimos 14 dias */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Leads por dia (últimas 2 semanas)</h3>
          <div className="flex items-end gap-1 h-32">
            {last14.map(d => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full bg-[#1E90FF]/20 group-hover:bg-[#1E90FF]/40 transition-colors rounded-t"
                  style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: d.count > 0 ? '4px' : '2px' }}
                />
                <span className="text-[8px] text-[#888888] hidden group-hover:block absolute -bottom-5 whitespace-nowrap">
                  {d.date.slice(5)} · {d.count}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[#555555] mt-2">
            <span>{last14[0]?.date.slice(5)}</span>
            <span>{last14[last14.length - 1]?.date.slice(5)}</span>
          </div>
        </div>

        {/* Top planos */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Planos mais clicados (30 dias)</h3>
          {topPlans.length === 0 ? (
            <p className="text-[#888888] text-sm">Nenhum dado ainda.</p>
          ) : (
            <div className="space-y-2">
              {topPlans.map(([name, count]) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white truncate">{name}</span>
                      <span className="text-[#888888] ml-2 shrink-0">{count}</span>
                    </div>
                    <div className="h-1.5 bg-[#2A2A2A] rounded-full">
                      <div className="h-full bg-[#1E90FF] rounded-full" style={{ width: `${(count / (topPlans[0][1])) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2A2A2A]">
          <h3 className="text-sm font-semibold text-white">Leads recentes</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              {['Email', 'Plano', 'Status', 'Data'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs text-[#888888] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/50">
            {(recentLeads ?? []).map((l: any) => (
              <tr key={l.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                <td className="px-5 py-3 text-sm text-white">{l.email}</td>
                <td className="px-5 py-3 text-sm text-[#888888]">{l.plan_title ?? '—'}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.converted ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-[#1E90FF]/10 text-[#1E90FF] border border-[#1E90FF]/20'}`}>
                    {l.converted ? 'Convertido' : 'Lead'}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-[#888888]">
                  {new Date(l.created_at).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
            {(recentLeads ?? []).length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-[#888888] text-sm">Nenhum lead ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
