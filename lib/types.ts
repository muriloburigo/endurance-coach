export type PlanLevel = 'iniciante' | 'intermediario' | 'avancado'
export type PlanDistance = '5k' | '10k' | '21k' | '42k'
export type VideoCategory = 'geral' | 'dica' | 'motivacao' | 'plano'

export interface Plan {
  id: string
  title: string
  subtitle?: string
  slug: string
  description?: string
  long_description?: string
  level: PlanLevel
  distance: PlanDistance
  duration_weeks: number
  sessions_per_week?: number
  weekly_hours_min?: number
  weekly_hours_max?: number
  highlights?: string[]
  training_peaks_url?: string
  price_display?: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Lead {
  id: string
  email: string
  name?: string
  plan_id?: string
  plan_title?: string
  plan_slug?: string
  converted: boolean
  notes?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  created_at: string
  plan?: Plan
}

export interface Testimonial {
  id: string
  name: string
  photo_url?: string
  content: string
  achievement?: string
  plan_id?: string
  plan_title?: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Video {
  id: string
  title: string
  description?: string
  youtube_url: string
  category: VideoCategory
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name?: string
  created_at: string
}

export const LEVEL_LABEL: Record<PlanLevel, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export const DISTANCE_LABEL: Record<PlanDistance, string> = {
  '5k':  '5K',
  '10k': '10K',
  '21k': 'Meia Maratona',
  '42k': 'Maratona',
}

export const LEVEL_COLOR: Record<PlanLevel, string> = {
  iniciante:    'text-green-400 bg-green-400/10 border-green-400/20',
  intermediario: 'text-[#1E90FF] bg-[#1E90FF]/10 border-[#1E90FF]/20',
  avancado:     'text-amber-400 bg-amber-400/10 border-amber-400/20',
}
