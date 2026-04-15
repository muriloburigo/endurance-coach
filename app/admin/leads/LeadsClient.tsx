'use client'

import { useState } from 'react'
import { toggleConverted, deleteLead } from './actions'

export default function LeadsClient({ leads }: { leads: any[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'todos' | 'leads' | 'convertidos'>('todos')

  const filtered = leads.filter(l => {
    const q = search.toLowerCase()
    const matchSearch = !q || l.email?.toLowerCase().includes(q) || l.plan_title?.toLowerCase().includes(q)
    const matchFilter = filter === 'todos' ? true : filter === 'convertidos' ? l.converted : !l.converted
    return matchSearch && matchFilter
  })

  function exportCSV() {
    const rows = [['Email', 'Plano', 'Status', 'Data', 'Referrer']]
    filtered.forEach(l => rows.push([l.email, l.plan_title ?? '', l.converted ? 'Convertido' : 'Lead', new Date(l.created_at).toLocaleDateString('pt-BR'), l.referrer ?? '']))
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv)
    a.download = 'leads.csv'; a.click()
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar email ou plano..."
          className="flex-1 min-w-48 max-w-xs bg-[#141414] border border-[#2A2A2A] text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1E90FF]" />
        <div className="flex gap-1.5">
          {(['todos', 'leads', 'convertidos'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${filter === f ? 'bg-[#1E90FF] text-white' : 'bg-[#141414] text-[#888888] border border-[#2A2A2A] hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={exportCSV}
          className="px-3 py-1.5 bg-[#141414] text-[#888888] border border-[#2A2A2A] text-xs rounded-lg hover:text-white transition-colors ml-auto">
          ↓ Exportar CSV
        </button>
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2A2A2A]">
          <p className="text-sm text-[#888888]">{filtered.length} registro{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              {['Email', 'Plano', 'Status', 'Referrer', 'Data', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs text-[#888888] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/50">
            {filtered.map((l: any) => (
              <tr key={l.id} className="hover:bg-[#1A1A1A]/40 transition-colors">
                <td className="px-5 py-3 text-sm text-white">{l.email}</td>
                <td className="px-5 py-3 text-sm text-[#888888]">{l.plan_title ?? '—'}</td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleConverted(l.id, l.converted)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      l.converted ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' : 'bg-[#1E90FF]/10 text-[#1E90FF] border-[#1E90FF]/20 hover:bg-[#1E90FF]/20'
                    }`}>
                    {l.converted ? '✓ Convertido' : 'Lead'}
                  </button>
                </td>
                <td className="px-5 py-3 text-xs text-[#888888] max-w-[150px] truncate">{l.referrer ?? '—'}</td>
                <td className="px-5 py-3 text-sm text-[#888888]">{new Date(l.created_at).toLocaleDateString('pt-BR')}</td>
                <td className="px-5 py-3">
                  <button onClick={() => confirm('Excluir este lead?') && deleteLead(l.id)}
                    className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs rounded-lg hover:bg-red-500/20 transition-colors">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-[#888888] text-sm">Nenhum lead encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
