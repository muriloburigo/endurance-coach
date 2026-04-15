'use client'

import { useState } from 'react'
import type { Plan } from '~/lib/types'
import { LEVEL_LABEL, DISTANCE_LABEL, LEVEL_COLOR } from '~/lib/types'
import { upsertPlan, deletePlan, togglePlanActive } from './actions'

export default function PlanosAdminClient({ plans }: { plans: Plan[] }) {
  const [editing, setEditing] = useState<Plan | null>(null)
  const [search, setSearch] = useState('')

  const filtered = plans.filter(p =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.distance.includes(search) || p.level.includes(search)
  )

  return (
    <>
      <div className="flex gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar plano..."
          className="flex-1 max-w-xs bg-[#141414] border border-[#2A2A2A] text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#1E90FF]" />
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2A2A2A]">
          <p className="text-sm text-[#888888]">{filtered.length} plano{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              {['Plano', 'Nível', 'Distância', 'Duração', 'Link TP', 'Preço', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs text-[#888888] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]/50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-[#1A1A1A]/40 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-white">{p.title}</p>
                  {p.subtitle && <p className="text-xs text-[#888888]">{p.subtitle}</p>}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${LEVEL_COLOR[p.level]}`}>
                    {LEVEL_LABEL[p.level]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#888888]">{DISTANCE_LABEL[p.distance]}</td>
                <td className="px-4 py-3 text-sm text-[#888888]">{p.duration_weeks} sem</td>
                <td className="px-4 py-3">
                  {p.training_peaks_url
                    ? <span className="text-green-400 text-xs">✓ Configurado</span>
                    : <span className="text-amber-400 text-xs">⚠ Pendente</span>}
                </td>
                <td className="px-4 py-3 text-sm text-[#888888]">{p.price_display ?? '—'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => togglePlanActive(p.id, p.is_active)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-colors ${
                      p.is_active ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-700/50 text-zinc-500 border-zinc-600'
                    }`}>
                    {p.is_active ? 'Ativo' : 'Inativo'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(p)}
                      className="px-3 py-1 bg-[#1A1A1A] text-[#888888] border border-[#2A2A2A] text-xs rounded-lg hover:text-white hover:border-[#3A3A3A] transition-colors">
                      Editar
                    </button>
                    <button onClick={() => confirm('Excluir este plano?') && deletePlan(p.id)}
                      className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs rounded-lg hover:bg-red-500/20 transition-colors">
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && <PlanEditModal plan={editing} onClose={() => setEditing(null)} />}
    </>
  )
}

function PlanEditModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await upsertPlan(new FormData(e.currentTarget))
    setLoading(false)
    onClose()
  }

  const field = (label: string, name: string, value?: string | number | null, type = 'text', required = false) => (
    <div>
      <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">{label}</label>
      <input name={name} type={type} defaultValue={value ?? ''} required={required}
        className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]" />
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#888888] hover:text-white text-xl">✕</button>
        <h2 className="text-2xl text-white mb-5">Editar Plano</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={plan.id} />
          <div className="grid grid-cols-2 gap-4">
            {field('Título', 'title', plan.title, 'text', true)}
            {field('Subtítulo', 'subtitle', plan.subtitle)}
            {field('Slug', 'slug', plan.slug, 'text', true)}
            {field('Preço (exibição)', 'price_display', plan.price_display, 'text')}
          </div>

          <div>
            <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Descrição</label>
            <textarea name="description" defaultValue={plan.description ?? ''} rows={3}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF] resize-none" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Nível</label>
              <select name="level" defaultValue={plan.level}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]">
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Distância</label>
              <select name="distance" defaultValue={plan.distance}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]">
                <option value="5k">5K</option>
                <option value="10k">10K</option>
                <option value="21k">Meia Maratona</option>
                <option value="42k">Maratona</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Duração (sem)</label>
              <select name="duration_weeks" defaultValue={plan.duration_weeks}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]">
                <option value={12}>12</option>
                <option value={16}>16</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {field('Sessões/semana', 'sessions_per_week', plan.sessions_per_week, 'number')}
            {field('Horas/semana (mín)', 'weekly_hours_min', plan.weekly_hours_min, 'number')}
            {field('Horas/semana (máx)', 'weekly_hours_max', plan.weekly_hours_max, 'number')}
          </div>

          {field('Link Training Peaks', 'training_peaks_url', plan.training_peaks_url, 'url')}

          <div>
            <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Destaques (JSON array)</label>
            <textarea name="highlights" defaultValue={JSON.stringify(plan.highlights ?? [])} rows={3}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF] resize-none font-mono text-xs" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Status</label>
              <select name="is_active" defaultValue={String(plan.is_active)}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]">
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
            {field('Ordem', 'sort_order', plan.sort_order, 'number')}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="px-6 py-2.5 bg-[#1E90FF] text-white text-sm font-semibold rounded-xl hover:bg-[#4A90D9] disabled:opacity-50 transition-colors">
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-2.5 bg-[#1A1A1A] text-[#888888] text-sm rounded-xl hover:text-white border border-[#2A2A2A] transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
