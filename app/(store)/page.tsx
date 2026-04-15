import { createAdminClient } from '~/lib/supabase/server'
import type { Plan, Testimonial, Video } from '~/lib/types'
import PlanosSection from './PlanosSection'
import TestimonialsSection from './TestimonialsSection'
import VideosSection from './VideosSection'
import FaqSection from './FaqSection'
import ComoFuncionaSection from './ComoFuncionaSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const db = createAdminClient()

  const [{ data: plans }, { data: testimonials }, { data: videos }] = await Promise.all([
    db.from('plans').select('*').eq('is_active', true).order('sort_order'),
    db.from('testimonials').select('*').eq('is_active', true).order('sort_order'),
    db.from('videos').select('*').eq('is_active', true).order('sort_order'),
  ])

  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0D1A2E] to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(30,144,255,0.08),transparent_70%)]" />

        {/* Decorative distance */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-extrabold text-white/[0.025] leading-none select-none pointer-events-none"
          style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}>
          42K
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E90FF]/10 border border-[#1E90FF]/20 rounded-full text-[#1E90FF] text-xs font-semibold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 bg-[#1E90FF] rounded-full animate-pulse" />
              Corrida · Training Peaks
            </div>

            <h1 className="text-6xl md:text-8xl text-white mb-6">
              Seu Próximo<br />
              <span className="text-[#1E90FF]">Desafio</span><br />
              Começa Hoje
            </h1>

            <p className="text-[#888888] text-xl leading-relaxed mb-10 font-light max-w-xl">
              Planilhas de treino estruturadas para corrida, do 5K à maratona.
              Desenvolvidas por Guto Fernandes e entregues direto no seu Training Peaks.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#planos"
                className="px-8 py-4 bg-[#1E90FF] text-white text-base font-semibold rounded-xl hover:bg-[#4A90D9] transition-all hover:scale-105 active:scale-100">
                Escolher meu plano →
              </a>
              <a href="#como-funciona"
                className="px-8 py-4 bg-[#141414] text-[#888888] text-base font-semibold rounded-xl border border-[#2A2A2A] hover:text-white hover:border-[#3A3A3A] transition-colors">
                Como funciona
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-[#2A2A2A]">
              {[
                { value: '24', label: 'Planos de treino' },
                { value: '3', label: 'Níveis de experiência' },
                { value: '4', label: 'Distâncias' },
                { value: '12-16', label: 'Semanas de preparação' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</p>
                  <p className="text-xs text-[#888888] uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANOS ───────────────────────────────── */}
      <section id="planos" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#1E90FF] text-sm uppercase tracking-[0.2em] font-semibold mb-3">Escolha seu desafio</p>
            <h2 className="text-5xl text-white mb-4">Planos de Treino</h2>
            <p className="text-[#888888] text-lg max-w-xl">
              Do primeiro 5K à maratona sub-3h15. Encontre o plano ideal para o seu nível e objetivo.
            </p>
          </div>
          <PlanosSection plans={(plans ?? []) as Plan[]} />
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────── */}
      <ComoFuncionaSection />

      {/* ── DEPOIMENTOS ─────────────────────────── */}
      {(testimonials ?? []).length > 0 && (
        <section id="depoimentos" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-[#1E90FF] text-sm uppercase tracking-[0.2em] font-semibold mb-3">Quem já foi</p>
              <h2 className="text-5xl text-white">Histórias Reais</h2>
            </div>
            <TestimonialsSection testimonials={testimonials as Testimonial[]} />
          </div>
        </section>
      )}

      {/* ── VIDEOS ───────────────────────────────── */}
      {(videos ?? []).length > 0 && (
        <section id="videos" className="py-24 px-6 bg-[#141414]/50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-[#1E90FF] text-sm uppercase tracking-[0.2em] font-semibold mb-3">Com Guto Fernandes</p>
              <h2 className="text-5xl text-white">Vídeos & Dicas</h2>
              <p className="text-[#888888] text-lg mt-3">
                Conteúdo exclusivo sobre treino, planilhas e a jornada do corredor.
              </p>
            </div>
            <VideosSection videos={videos as Video[]} />
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────── */}
      <FaqSection />

      {/* ── FINAL CTA ────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#0D1A2E] to-[#141414] border border-[#1E90FF]/20 rounded-3xl p-12">
            <h2 className="text-5xl text-white mb-4">Pronto para correr?</h2>
            <p className="text-[#888888] text-lg mb-8">
              Escolha seu plano, crie sua conta no Training Peaks e comece a treinar ainda esta semana.
            </p>
            <a href="#planos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E90FF] text-white text-base font-semibold rounded-xl hover:bg-[#4A90D9] transition-all hover:scale-105">
              Ver todos os planos →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
