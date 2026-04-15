'use client'

import { useState } from 'react'
import type { Plan } from '~/lib/types'
import { LEVEL_LABEL, DISTANCE_LABEL, LEVEL_COLOR } from '~/lib/types'
import LeadModal from './LeadModal'

const DISTANCES = ['Todos', '5K', '10K', 'Meia Maratona', 'Maratona'] as const
const LEVELS = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'] as const
const DURATIONS = ['Todos', '12 semanas', '16 semanas'] as const

const DISTANCE_MAP: Record<string, string> = {
  '5K': '5k', '10K': '10k', 'Meia Maratona': '21k', 'Maratona': '42k'
}
const LEVEL_MAP: Record<string, string> = {
  'Iniciante': 'iniciante', 'Intermediário': 'intermediario', 'Avançado': 'avancado'
}

const DISTANCE_BIG: Record<string, string> = {
  '5k': '5K', '10k': '10K', '21k': '21K', '42k': '42K'
}

export default function PlanosSection({ plans }: { plans: Plan[] }) {
  const [distance, setDistance] = useState('Todos')
  const [level, setLevel] = useState('Todos')
  const [duration, setDuration] = useState('Todos')
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  const filtered = plans.filter(p => {
    if (distance !== 'Todos' && p.distance !== DISTANCE_MAP[distance]) return false
    if (level !== 'Todos' && p.level !== LEVEL_MAP[level]) return false
    if (duration !== 'Todos' && p.duration_weeks !== parseInt(duration)) return false
    return true
  })

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-10">
        <FilterGroup label="Distância" options={DISTANCES as unknown as string[]} value={distance} onChange={setDistance} />
        <FilterGroup label="Nível" options={LEVELS as unknown as string[]} value={level} onChange={setLevel} />
        <FilterGroup label="Duração" options={DURATIONS as unknown as string[]} value={duration} onChange={setDuration} />
      </div>

      {/* Count */}
      <p className="text-[#888888] text-sm mb-6">{filtered.length} plano{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(plan => (
          <PlanCard key={plan.id} plan={plan} onSelect={() => setSelectedPlan(plan)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-[#888888]">Nenhum plano encontrado para esses filtros.</div>
      )}

      {selectedPlan && (
        <LeadModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </>
  )
}

function FilterGroup({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map(o => (
          <button key={o} onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              value === o
                ? 'bg-[#1E90FF] text-white'
                : 'bg-[#141414] text-[#888888] border border-[#2A2A2A] hover:text-white hover:border-[#3A3A3A]'
            }`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  const levelClass = LEVEL_COLOR[plan.level]
  const highlights = plan.highlights as string[] ?? []

  return (
    <div className="group bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col hover:border-[#1E90FF]/40 transition-all hover:shadow-[0_0_30px_rgba(30,144,255,0.06)] cursor-default">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${levelClass}`}>
          {LEVEL_LABEL[plan.level]}
        </span>
        <span className="text-xs text-[#888888] bg-[#1A1A1A] px-2.5 py-1 rounded-full border border-[#2A2A2A]">
          {plan.duration_weeks} sem
        </span>
      </div>

      {/* Distance */}
      <div className="mb-2">
        <p className="text-6xl font-extrabold text-white leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {DISTANCE_BIG[plan.distance]}
        </p>
        <p className="text-[#888888] text-sm uppercase tracking-wider mt-1">{DISTANCE_LABEL[plan.distance]}</p>
      </div>

      {/* Title */}
      <h3 className="text-xl text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase' }}>
        {plan.title}
      </h3>
      {plan.subtitle && <p className="text-[#888888] text-xs mb-4">{plan.subtitle}</p>}

      {/* Description */}
      {plan.description && (
        <p className="text-[#888888] text-sm leading-relaxed mb-5 flex-1 line-clamp-3">{plan.description}</p>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <ul className="space-y-1.5 mb-6">
          {highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-[#888888]">
              <span className="text-[#1E90FF] text-base leading-none">✓</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-[#2A2A2A] flex items-center justify-between gap-3">
        {plan.price_display && (
          <span className="text-lg font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {plan.price_display}
          </span>
        )}
        <button
          onClick={onSelect}
          disabled={!plan.training_peaks_url}
          className="flex-1 px-4 py-2.5 bg-[#1E90FF] text-white text-sm font-semibold rounded-xl hover:bg-[#4A90D9] transition-all group-hover:shadow-[0_0_20px_rgba(30,144,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {plan.training_peaks_url ? 'Quero este plano →' : 'Em breve'}
        </button>
      </div>
    </div>
  )
}
