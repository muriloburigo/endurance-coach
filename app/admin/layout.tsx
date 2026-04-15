import { createClient } from '~/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { LayoutDashboard, MousePointerClick, ShoppingBag, Video, MessageSquareQuote, LogOut } from 'lucide-react'

const NAV = [
  { href: '/admin/dashboard',   label: 'Dashboard',    Icon: LayoutDashboard },
  { href: '/admin/leads',       label: 'Leads',        Icon: MousePointerClick },
  { href: '/admin/planos',      label: 'Planos',       Icon: ShoppingBag },
  { href: '/admin/videos',      label: 'Vídeos',       Icon: Video },
  { href: '/admin/depoimentos', label: 'Depoimentos',  Icon: MessageSquareQuote },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <aside className="w-60 bg-[#141414] border-r border-[#2A2A2A] flex flex-col shrink-0">
        <div className="px-5 py-6 border-b border-[#2A2A2A]">
          <Image src="/logo_symbol.png" alt="GF" width={36} height={36} className="h-9 w-auto mb-3" />
          <p className="text-[10px] text-[#888888] uppercase tracking-widest">Painel Admin</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors">
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-[#2A2A2A]">
          <p className="px-3 py-2 text-xs text-[#555555] truncate">{user.email}</p>
          <form action="/api/auth/logout" method="POST">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors">
              <LogOut size={16} className="shrink-0" />Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
