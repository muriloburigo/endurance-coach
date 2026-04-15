'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '~/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email ou senha incorretos.')
      setLoading(false)
    } else {
      window.location.href = '/admin/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Image src="/logo_combined_dark.png" alt="Guto Fernandes" width={200} height={48} className="h-10 w-auto" />
      </div>
      <div className="w-full max-w-sm bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8">
        <h1 className="text-3xl text-white mb-1">Entrar</h1>
        <p className="text-[#888888] text-sm mb-6">Acesso restrito a administradores.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            placeholder="Email" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-3 text-sm placeholder:text-[#555] focus:outline-none focus:border-[#1E90FF] transition-colors" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            placeholder="Senha" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-white rounded-xl px-4 py-3 text-sm placeholder:text-[#555] focus:outline-none focus:border-[#1E90FF] transition-colors" />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#1E90FF] text-white font-semibold rounded-xl hover:bg-[#4A90D9] transition-colors disabled:opacity-50">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
