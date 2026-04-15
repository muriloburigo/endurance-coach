'use server'
import { createAdminClient } from '~/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upsertTestimonial(formData: FormData) {
  const db = createAdminClient()
  const id = formData.get('id') as string | null
  const payload = {
    name: formData.get('name') as string,
    content: formData.get('content') as string,
    achievement: formData.get('achievement') as string || null,
    photo_url: formData.get('photo_url') as string || null,
    plan_title: formData.get('plan_title') as string || null,
    is_active: formData.get('is_active') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
  }
  if (id) { await db.from('testimonials').update(payload).eq('id', id) }
  else { await db.from('testimonials').insert(payload) }
  revalidatePath('/admin/depoimentos'); revalidatePath('/')
}

export async function deleteTestimonial(id: string) {
  await createAdminClient().from('testimonials').delete().eq('id', id)
  revalidatePath('/admin/depoimentos'); revalidatePath('/')
}

export async function toggleTestimonial(id: string, current: boolean) {
  await createAdminClient().from('testimonials').update({ is_active: !current }).eq('id', id)
  revalidatePath('/admin/depoimentos'); revalidatePath('/')
}
