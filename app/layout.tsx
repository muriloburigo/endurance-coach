import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guto Fernandes — Endurance Coach | Planilhas de Corrida',
  description: 'Planilhas de treino para corrida do 5K à maratona. Desenvolvidas por Guto Fernandes e entregues no Training Peaks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
