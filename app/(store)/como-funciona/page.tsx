import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Como Funciona — Guto Fernandes Endurance Coach' }

export default function ComoFuncionaPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="text-[#1E90FF] text-sm uppercase tracking-[0.2em] font-semibold mb-3">Guia completo</p>
        <h1 className="text-6xl text-white mb-4">Como Funciona</h1>
        <p className="text-[#888888] text-lg leading-relaxed">
          Tudo que você precisa saber para comprar seu plano, configurar o Training Peaks e começar a treinar.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {[
          {
            num: '01', icon: '🎯',
            title: 'Escolha seu plano',
            body: 'Na página inicial, use os filtros de nível (Iniciante, Intermediário ou Avançado), distância (5K, 10K, Meia Maratona ou Maratona) e duração (12 ou 16 semanas). Clique em "Quero este plano" quando encontrar o certo.',
            tip: 'Não tem certeza do nível? Iniciante = corre há menos de 6 meses ou treina irregularmente. Intermediário = treina há mais de 6 meses com regularidade. Avançado = treina há mais de 1 ano com metas específicas de tempo.',
          },
          {
            num: '02', icon: '✉️',
            title: 'Informe seu e-mail',
            body: 'Antes de ser redirecionado ao Training Peaks, pedimos apenas seu e-mail. Isso nos permite enviar dicas de treino e acompanhar seu progresso. Não enviamos spam — prometemos.',
            tip: 'Use o mesmo e-mail que você vai usar no Training Peaks para facilitar o acompanhamento.',
          },
          {
            num: '03', icon: '📋',
            title: 'Crie sua conta no Training Peaks',
            body: 'Você será redirecionado para o Training Peaks. Se ainda não tem conta, clique em "Sign Up" e crie uma conta básica gratuita. Leva menos de 2 minutos.',
            tip: 'A conta Basic do Training Peaks é 100% gratuita e suficiente para todos os planos. Você não precisa do Premium para seguir o programa.',
          },
          {
            num: '04', icon: '💳',
            title: 'Finalize a compra',
            body: 'No Training Peaks, selecione o plano, adicione ao carrinho e finalize com cartão de crédito, débito ou PayPal. O pagamento é processado com segurança diretamente pelo Training Peaks.',
            tip: 'O Training Peaks aceita pagamentos internacionais. Se seu cartão for recusado, tente PayPal ou entre em contato com o suporte do Training Peaks.',
          },
          {
            num: '05', icon: '📅',
            title: 'Plano no seu calendário',
            body: 'Após a confirmação do pagamento, o plano aparece automaticamente no seu calendário do Training Peaks. Os treinos ficam organizados dia a dia, com descrição detalhada de cada sessão.',
            tip: 'Defina a data de início do plano alinhada com a data da sua prova alvo. O Training Peaks calcula automaticamente a semana de pico e o tapering.',
          },
          {
            num: '06', icon: '📱',
            title: 'Configure seu dispositivo',
            body: 'No Training Peaks, vá em "Settings > My Devices" e conecte seu relógio ou app. Os treinos estruturados são enviados automaticamente para seu Garmin, Apple Watch, Wahoo, Suunto ou Coros.',
            tip: 'Se tiver um Garmin, instale o app "TrainingPeaks" na Connect IQ Store. Os treinos estruturados (com intervalos e zonas) aparecem direto no relógio.',
          },
          {
            num: '07', icon: '🏃',
            title: 'Comece a treinar!',
            body: 'Abra o app do Training Peaks toda manhã para ver o treino do dia. Cada sessão tem duração estimada, descrição detalhada, zonas de frequência cardíaca ou pace alvo, e notas do coach.',
            tip: 'Registre cada treino — mesmo os ruins. O Training Peaks usa seus dados para calcular sua forma física (Fitness) e te mostrar quando você está pronto para treinar mais forte.',
          },
        ].map((step, i) => (
          <div key={i} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
            <div className="flex gap-5 p-6">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-[#1E90FF]/10 border border-[#1E90FF]/20 rounded-xl flex items-center justify-center text-xl">
                  {step.icon}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#1E90FF] font-bold uppercase tracking-widest mb-1">{step.num}</p>
                <h2 className="text-2xl text-white mb-2">{step.title}</h2>
                <p className="text-[#888888] text-sm leading-relaxed">{step.body}</p>
              </div>
            </div>
            <div className="mx-6 mb-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 flex gap-2">
              <span className="text-[#1E90FF] text-xs font-bold uppercase tracking-wider shrink-0 mt-0.5">💡 Dica</span>
              <p className="text-[#888888] text-xs leading-relaxed">{step.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Devices */}
      <div className="mt-14 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
        <h2 className="text-3xl text-white mb-3">Dispositivos Compatíveis</h2>
        <p className="text-[#888888] text-sm mb-5">O Training Peaks sincroniza com mais de 100 dispositivos e aplicativos.</p>
        <div className="flex flex-wrap gap-2">
          {['Garmin', 'Apple Watch', 'Wahoo', 'Suunto', 'Coros', 'Polar', 'Zwift', 'Strava', 'TrainerRoad', 'Rouvy', 'Zwift'].map(d => (
            <span key={d} className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-xs text-[#888888]">{d}</span>
          ))}
          <span className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-xs text-[#888888]">+ 90 outros</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <a href="/#planos"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E90FF] text-white font-semibold rounded-xl hover:bg-[#4A90D9] transition-all hover:scale-105">
          Escolher meu plano →
        </a>
      </div>
    </div>
  )
}
