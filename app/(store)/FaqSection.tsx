'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Preciso ter experiência com Training Peaks?',
    a: 'Não! O Training Peaks é intuitivo e a conta básica é gratuita. Após a compra, o plano aparece automaticamente no seu calendário. Temos um guia completo para te ajudar na configuração inicial.',
  },
  {
    q: 'Os planos funcionam com o meu relógio GPS?',
    a: 'Sim! O Training Peaks sincroniza com os principais dispositivos: Garmin, Apple Watch, Wahoo, Suunto, Coros, Polar e mais de 100 apps como Strava, Zwift e TrainerRoad.',
  },
  {
    q: 'Qual a diferença entre os planos de 12 e 16 semanas?',
    a: 'Planos de 16 semanas têm uma progressão mais gradual — ideal para quem está voltando ao treino ou prefere mais tempo de adaptação. Os de 12 semanas são mais intensos semana a semana, recomendados para quem já tem uma base de treino.',
  },
  {
    q: 'Posso trocar de plano se escolher errado?',
    a: 'Sim! O Training Peaks tem política de troca dentro de um período após a compra. Também estamos disponíveis por e-mail para te ajudar a escolher o plano certo antes de comprar.',
  },
  {
    q: 'Os treinos são personalizados para mim?',
    a: 'Os planos são estruturados e baseados em zonas de frequência cardíaca ou ritmo (pace). Você configura suas zonas no Training Peaks usando os valores do seu teste de avaliação — incluído nos planos.',
  },
  {
    q: 'Preciso pagar o Training Peaks Premium?',
    a: 'Não! A conta básica (gratuita) é suficiente para seguir todos os planos. O Premium oferece recursos de análise avançada, mas não é obrigatório.',
  },
  {
    q: 'O que acontece depois que o plano termina?',
    a: 'Os treinos ficam no seu calendário para sempre. Você pode recomeçar o mesmo plano, comprar um novo ou usar os dados como referência.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[#1E90FF] text-sm uppercase tracking-[0.2em] font-semibold mb-3">Dúvidas frequentes</p>
          <h2 className="text-5xl text-white">FAQ</h2>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#3A3A3A] transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                <span className={`text-[#1E90FF] text-xl shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[#888888] text-sm leading-relaxed border-t border-[#2A2A2A] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
