'use client'

import { useState } from 'react'
import { upsertVideo, deleteVideo, toggleVideo } from './actions'

function getYtId(url: string) {
  return url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/)?.[1] ?? null
}

const CAT_LABEL: Record<string, string> = { geral: 'Geral', dica: 'Dica', motivacao: 'Motivação', plano: 'Plano' }

export default function VideosAdminClient({ videos }: { videos: any[] }) {
  const [form, setForm] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true)
    await upsertVideo(new FormData(e.currentTarget))
    setLoading(false); setForm(null)
  }

  const emptyForm = { title: '', description: '', youtube_url: '', category: 'geral', is_active: true, sort_order: 0 }

  return (
    <>
      <button onClick={() => setForm(emptyForm)}
        className="px-4 py-2 bg-[#1E90FF] text-white text-sm font-semibold rounded-xl hover:bg-[#4A90D9] transition-colors">
        + Adicionar vídeo
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(v => {
          const ytId = getYtId(v.youtube_url)
          return (
            <div key={v.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
              {ytId && (
                <div className="aspect-video bg-[#1A1A1A]">
                  <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4 space-y-2">
                <p className="text-sm font-medium text-white line-clamp-2">{v.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#888888]">{CAT_LABEL[v.category]}</span>
                  <button onClick={() => toggleVideo(v.id, v.is_active)}
                    className={`text-xs px-2 py-0.5 rounded-full border ${v.is_active ? 'text-green-400 border-green-500/20' : 'text-zinc-500 border-zinc-600'}`}>
                    {v.is_active ? 'Ativo' : 'Inativo'}
                  </button>
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => setForm(v)} className="flex-1 px-3 py-1.5 bg-[#1A1A1A] text-[#888888] border border-[#2A2A2A] text-xs rounded-lg hover:text-white transition-colors">Editar</button>
                  <button onClick={() => confirm('Excluir?') && deleteVideo(v.id)} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-xs rounded-lg hover:bg-red-500/20 transition-colors">Excluir</button>
                </div>
              </div>
            </div>
          )
        })}
        {videos.length === 0 && <p className="text-[#888888] text-sm col-span-3">Nenhum vídeo cadastrado.</p>}
      </div>

      {form !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setForm(null)} />
          <div className="relative w-full max-w-lg bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
            <button onClick={() => setForm(null)} className="absolute top-4 right-4 text-[#888888] hover:text-white text-xl">✕</button>
            <h2 className="text-2xl text-white mb-5">{form.id ? 'Editar' : 'Novo'} Vídeo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {form.id && <input type="hidden" name="id" value={form.id} />}
              {[
                { label: 'Título', name: 'title', value: form.title, required: true },
                { label: 'URL YouTube', name: 'youtube_url', value: form.youtube_url, required: true, type: 'url' },
                { label: 'Descrição', name: 'description', value: form.description },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">{f.label}</label>
                  <input name={f.name} type={f.type ?? 'text'} defaultValue={f.value ?? ''} required={f.required}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]" />
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-[#888888] uppercase tracking-wider mb-1.5">Categoria</label>
                  <select name="category" defaultValue={form.category}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E90FF]">
                    {Object.entries(CAT_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
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
