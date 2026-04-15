import Image from 'next/image'
import Link from 'next/link'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#2A2A2A]/60 bg-[#0A0A0A]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/logo_combined_dark.png" alt="Guto Fernandes Endurance Coach" width={180} height={44} className="h-9 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#888888]">
            <Link href="/#planos" className="hover:text-white transition-colors">Planos</Link>
            <Link href="/#como-funciona" className="hover:text-white transition-colors">Como Funciona</Link>
            <Link href="/#videos" className="hover:text-white transition-colors">Vídeos</Link>
            <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>
          <Link href="/#planos"
            className="px-4 py-2 bg-[#1E90FF] text-white text-sm font-semibold rounded-lg hover:bg-[#4A90D9] transition-colors">
            Escolher Plano
          </Link>
        </div>
      </header>
      <main className="pt-[73px]">{children}</main>
      <footer className="border-t border-[#2A2A2A] mt-24 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/logo_combined_dark.png" alt="Guto Fernandes" width={160} height={40} className="h-8 w-auto opacity-70" />
          <p className="text-xs text-[#888888] text-center">
            © {new Date().getFullYear()} Guto Fernandes Endurance Coach. Todos os planos são entregues via Training Peaks.
          </p>
          <div className="flex gap-6 text-xs text-[#888888]">
            <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/como-funciona" className="hover:text-white transition-colors">Como Funciona</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
