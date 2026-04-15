'use client'

import type { Video } from '~/lib/types'

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/)
  return m?.[1] ?? null
}

export default function VideosSection({ videos }: { videos: Video[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map(v => {
        const ytId = getYouTubeId(v.youtube_url)
        return (
          <div key={v.id} className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden group">
            {ytId ? (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-video bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#888888] text-sm">Vídeo indisponível</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-white text-base font-semibold">{v.title}</h3>
              {v.description && <p className="text-[#888888] text-sm mt-1 line-clamp-2">{v.description}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
