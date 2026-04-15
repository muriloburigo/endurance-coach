'use server'
import { createAdminClient } from '~/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upsertVideo(formData: FormData) {
  const db = createAdminClient()
  const id = formData.get('id') as string | null
  const payload = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    youtube_url: formData.get('youtube_url') as string,
    category: formData.get('category') as string,
    is_active: formData.get('is_active') === 'true',
    sort_order: Number(formData.get('sort_order')) || 0,
  }
  if (id) { await db.from('videos').update(payload).eq('id', id) }
  else { await db.from('videos').insert(payload) }
  revalidatePath('/admin/videos'); revalidatePath('/')
}

export async function deleteVideo(id: string) {
  await createAdminClient().from('videos').delete().eq('id', id)
  revalidatePath('/admin/videos'); revalidatePath('/')
}

export async function toggleVideo(id: string, current: boolean) {
  await createAdminClient().from('videos').update({ is_active: !current }).eq('id', id)
  revalidatePath('/admin/videos'); revalidatePath('/')
}
