'use server'
import { createAdminClient } from '~/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleConverted(id: string, current: boolean) {
  const db = createAdminClient()
  await db.from('leads').update({ converted: !current }).eq('id', id)
  revalidatePath('/admin/leads')
}

export async function deleteLead(id: string) {
  const db = createAdminClient()
  await db.from('leads').delete().eq('id', id)
  revalidatePath('/admin/leads')
}
