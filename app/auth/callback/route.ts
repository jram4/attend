// app/auth/callback/route.ts

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  // Use the explicit site URL in production, or localhost for development.
  const redirectTo = new URL(next || '/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  // Handle errors: redirect to the home page with an error message
  redirectTo.searchParams.set('error', 'auth_callback_error')
  return NextResponse.redirect(redirectTo)
}
