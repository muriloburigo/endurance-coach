import { createAdminClient } from '~/lib/supabase/server'
import VideosAdminClient from './VideosAdminClient'

export default async function AdminVideosPage() {
  const { data: videos } = await createAdminClient().from('videos').select('*').order('sort_order')
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-1">Vídeos</h1>
        <p className="text-[#888888] text-sm">Gerencie os vídeos exibidos na loja.</p>
      </div>
      <VideosAdminClient videos={videos ?? []} />
    </div>
  )
}
