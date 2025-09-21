import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3000'
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Validate next parameter to prevent open redirect attacks
      // Only allow relative paths that start with /
      if (next && next.startsWith('/') && !next.startsWith('//')) {
        return NextResponse.redirect(`${origin}${next}`)
      } else {
        return NextResponse.redirect(`${origin}/`)
      }
    }
  }

  // Handle errors - redirect to home with error message
  return NextResponse.redirect(`${origin}/?error=auth_callback_error`)
}
