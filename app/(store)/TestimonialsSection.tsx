import type { Testimonial } from '~/lib/types'

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map(t => (
        <div key={t.id} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-[#1E90FF] text-xl">"</p>
          <p className="text-white text-sm leading-relaxed flex-1">{t.content}</p>
          {t.achievement && (
            <p className="text-[#1E90FF] text-xs font-semibold uppercase tracking-wider">🏅 {t.achievement}</p>
          )}
          {t.plan_title && (
            <p className="text-[#888888] text-xs">Plano: {t.plan_title}</p>
          )}
          <div className="flex items-center gap-3 pt-2 border-t border-[#2A2A2A]">
            {t.photo_url ? (
              <img src={t.photo_url} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#1E90FF]/20 border border-[#1E90FF]/30 flex items-center justify-center text-[#1E90FF] text-sm font-bold">
                {t.name[0].toUpperCase()}
              </div>
            )}
            <p className="text-white text-sm font-semibold">{t.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
