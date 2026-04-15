'use server'
import { createAdminClient } from '~/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upsertPlan(formData: FormData) {
  const db = createAdminClient()
  const id = formData.get('id') as string | null

  const payload = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string || null,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string || null,
    level: formData.get('level') as string,
    distance: formData.get('distance') as string,
    duration_weeks: Number(formData.get('duration_weeks')),
    sessions_per_week: Number(formData.get('sessions_per_week')) || null,
    weekly_hours_min: Number(formData.get('weekly_hours_min')) || null,
    weekly_hours_max: Number(formData.get('weekly_hours_max')) || null,
    training_peaks_url: formData.get('training_peaks_url') as string || null,
    price_display: formData.get('price_display') as string || null,
    is_active: formData.get('is_active') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
    highlights: (() => {
      try { return JSON.parse(formData.get('highlights') as string) } catch { return [] }
    })(),
  }

  if (id) {
    await db.from('plans').update(payload).eq('id', id)
  } else {
    await db.from('plans').insert(payload)
  }
  revalidatePath('/admin/planos')
  revalidatePath('/')
}

export async function deletePlan(id: string) {
  const db = createAdminClient()
  await db.from('plans').delete().eq('id', id)
  revalidatePath('/admin/planos')
  revalidatePath('/')
}

export async function togglePlanActive(id: string, current: boolean) {
  const db = createAdminClient()
  await db.from('plans').update({ is_active: !current }).eq('id', id)
  revalidatePath('/admin/planos')
  revalidatePath('/')
}
