export default function ComoFuncionaSection() {
  const steps = [
    {
      num: '01',
      title: 'Escolha seu plano',
      desc: 'Filtre por nível, distância e duração. Encontre o plano feito para você.',
      icon: '🎯',
    },
    {
      num: '02',
      title: 'Informe seu e-mail',
      desc: 'Digite seu e-mail para registrar sua intenção e ser redirecionado.',
      icon: '✉️',
    },
    {
      num: '03',
      title: 'Crie sua conta no Training Peaks',
      desc: 'Conta básica gratuita. É onde seus treinos ficarão organizados no calendário.',
      icon: '📋',
    },
    {
      num: '04',
      title: 'Finalize a compra',
      desc: 'Checkout seguro diretamente no Training Peaks. Cartão de crédito ou PayPal.',
      icon: '💳',
    },
    {
      num: '05',
      title: 'Plano no seu calendário',
      desc: 'Em minutos, todos os treinos aparecem organizados no seu calendário do Training Peaks.',
      icon: '📅',
    },
    {
      num: '06',
      title: 'Comece a treinar!',
      desc: 'Acesse pelo app ou web. Sincroniza com Garmin, Apple Watch, Wahoo e muito mais.',
      icon: '🏃',
    },
  ]

  return (
    <section id="como-funciona" className="py-24 px-6 bg-[#141414]/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center">
          <p className="text-[#1E90FF] text-sm uppercase tracking-[0.2em] font-semibold mb-3">Simples assim</p>
          <h2 className="text-5xl text-white mb-4">Como Funciona</h2>
          <p className="text-[#888888] text-lg max-w-xl mx-auto">
            Do clique à primeira corridinha em 6 passos. Sem complicação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#1E90FF]/30 transition-colors">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && i % 3 !== 2 && (
                <div className="hidden lg:block absolute top-9 -right-3 w-6 border-t border-dashed border-[#2A2A2A] z-10" />
              )}
              <div className="flex items-start gap-4">
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <p className="text-[10px] text-[#1E90FF] font-bold uppercase tracking-widest mb-1">{step.num}</p>
                  <h3 className="text-xl text-white mb-2">{step.title}</h3>
                  <p className="text-[#888888] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/como-funciona" className="text-[#1E90FF] text-sm hover:text-[#4A90D9] transition-colors">
            Ver guia completo com dicas para configurar o Training Peaks →
          </a>
        </div>
      </div>
    </section>
  )
}
