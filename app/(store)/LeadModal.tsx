'use client'

import { useState } from 'react'
import type { Plan } from '~/lib/types'
import { LEVEL_LABEL, DISTANCE_LABEL } from '~/lib/types'

export default function LeadModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan_id: plan.id }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro ao processar'); return }
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Link do Training Peaks ainda não configurado. Tente novamente em breve.')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#888888] hover:text-white transition-colors text-xl">✕</button>

        {/* Plan summary */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 mb-6">
          <p className="text-xs text-[#888888] uppercase tracking-wider mb-1">{LEVEL_LABEL[plan.level]} · {DISTANCE_LABEL[plan.distance]}</p>
          <p className="text-xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase' }}>
            {plan.title}
          </p>
          <p className="text-sm text-[#888888] mt-0.5">{plan.duration_weeks} semanas · {plan.sessions_per_week ?? 4} sessões/semana</p>
        </div>

        <h2 className="text-3xl text-white mb-2">Quase lá!</h2>
        <p className="text-[#888888] text-sm mb-6 leading-relaxed">
          Informe seu e-mail para ser redirecionado ao Training Peaks onde você finaliza a compra com segurança.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-3.5 text-sm placeholder:text-[#555555] focus:outline-none focus:border-[#1E90FF] transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1E90FF] text-white font-semibold rounded-xl hover:bg-[#4A90D9] transition-all disabled:opacity-50 text-base"
          >
            {loading ? 'Aguarde...' : 'Ir para o Training Peaks →'}
          </button>
        </form>

        <p className="text-[#555555] text-xs text-center mt-4">
          Não enviamos spam. Você pode cancelar a qualquer momento.
        </p>
      </div>
    </div>
  )
}
