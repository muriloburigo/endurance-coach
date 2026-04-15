# Endurance Coach

Plataforma de venda de planilhas de treino (Training Peaks) para corrida e triathlon.

## Stack
- Next.js 16 App Router
- Supabase (Auth + DB) com RLS
- Tailwind CSS v4 (`@theme inline` em globals.css)
- TypeScript
- lucide-react para ícones

## Convenções
- `createClient()` → client SSR com cookies (auth-aware)
- `createAdminClient()` → service role, sem RLS, só em server actions/route handlers
- Server Actions com `'use server'` para mutações
- Alias de import: `~/`

## Rotas
- `(store)/` → loja pública (catálogo, produto, checkout)
- `(auth)/` → login, cadastro
- `admin/` → área administrativa
- `api/` → route handlers

## Variáveis de ambiente
Ver `.env.example`
