import { createAdminClient } from '~/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, plan_id } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const db = createAdminClient()

    // Fetch plan details
    const { data: plan } = await db
      .from('plans')
      .select('id, title, slug, training_peaks_url')
      .eq('id', plan_id)
      .eq('is_active', true)
      .single()

    if (!plan) {
      return NextResponse.json({ error: 'Plano não encontrado' }, { status: 404 })
    }

    // Save lead
    await db.from('leads').insert({
      email: email.toLowerCase().trim(),
      plan_id: plan.id,
      plan_title: plan.title,
      plan_slug: plan.slug,
      ip_address: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? null,
      user_agent: req.headers.get('user-agent') ?? null,
      referrer: req.headers.get('referer') ?? null,
    })

    return NextResponse.json({
      url: plan.training_peaks_url ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
