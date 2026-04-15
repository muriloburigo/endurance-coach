'use client'

import { useState } from 'react'
import { upsertTestimonial, deleteTestimonial, toggleTestimonial } from './actions'

export default function DepoimentosClient({ testimonials }: { testimonials: any[] }) {
  const [form, setForm] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const empty = { name: '', content: '', achievement: '', photo_url: '', plan_title: '', is_active: true, sort_order: 0 }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true)
    await upsertTestimonial(new FormData(e.currentTarget))
    setLoading(false); setForm(null)
  }

  return (
    <>
      <button onClick={() => setForm(empty)}
        className="px-4 py-2 bg-[#1E90FF] text-white text-sm font-semibold rounded-xl hover:bg-[#4A90D9] transition-colors">
        + Adicionar depoimento
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              {t.photo_url
                ? <img src={t.photo_url} className="w-9 h-9 rounded-full object-cover" alt={t.name} />
                : <div className="w-9 h-9 rounded-full bg-[#1E90FF]/20 border border-[#1E90FF]/30 flex items-center justify-center text-[#1E90FF] text-sm font-bold">{t.name[0]}</div>
              }
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                {t.achievement && <p className="text-[#1E90FF] text-xs">🏅 {t.achievement}</p>}
              </div>
              <button onClick={() => toggleTestimonial(t.id, t.is_active)}
                className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${t.is_active ? 'text-green-400 border-green-500/20' : 'text-zinc-500 border-zinc-600'}`}>
                {t.is_active ? 'Ativo' : 'Inativo'}
              </button>
            </div>
            <p className="text-[#888888] text-sm line-clamp-3">"{t.content}"</p>
            {t.plan_title && <p className="text-xs text-[#555555]">Plano: {t.plan_title}</p>}
            <div className="flex gap-2 pt-1">
              <button onClick={() => setForm(t)} className="flex-1 px-3 py-1.5 bg-[#1A1A1A] text-[#888888] border border-[#2A2A2A] text-xs rounded-lg hover:text-white transition-colors">Editar</button>
              <button onClick={() => confirm('Excluir?') && deleteTestimonial(t.id)} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-xs rounded-lg hover:bg-red-500/20 transition-colors">Excluir</button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-[#888888] text-sm">Nenhum depoimento cadastrado.</p>}
      </div>

      {form !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setForm(null)} />
          <div className="relative w-full max-w-lg bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setForm(null)} className="absolute top-4 right-4 text-[#888888] hover:text-white text-xl">✕</button>
            <h2 className="text-2xl text-white mb-5">{form.id ? 'Editar' : 'Novo'} Depoimento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {form.id && <input type="hidden" name="id" value={form.id} />}
              {[
                { label: 'Nome', name: 'name', value: form.name, required: true },
                { label: 'Conquista (ex: Completou a SP City em 2024)', name: 'achievement', value: form.achievement },
                { label: 'Plano usado', name: 'plan_title', value: form.plan_title },
                { label: 'URL da foto (opcional)', name: 'photo_url', value: form.photo_url, type: 'url' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">{f.label}</label>
                  <input name={f.name} type={f.type ?? 'text'} defaultValue={f.value ?? ''} required={f.required}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Depoimento</label>
                <textarea name="content" defaultValue={form.content} rows={4} required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Status</label>
                  <select name="is_active" defaultValue={String(form.is_active)}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]">
                    <option value="true">Ativo</option><option value="false">Inativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Ordem</label>
                  <input name="sort_order" type="number" defaultValue={form.sort_order ?? 0}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading}
                  className="px-6 py-2.5 bg-[#1E90FF] text-white text-sm font-semibold rounded-xl hover:bg-[#4A90D9] disabled:opacity-50 transition-colors">
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
                <button type="button" onClick={() => setForm(null)}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-[#888888] text-sm rounded-xl border border-[#2A2A2A] hover:text-white transition-colors">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
