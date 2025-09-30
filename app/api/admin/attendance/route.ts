// app/api/admin/attendance/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { adminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Check admin auth
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('admin-auth')?.value === 'authenticated'

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const gameId = searchParams.get('gameId')

  try {
    let query = adminClient
      .from('attendance')
      .select('created_at, game_id, user_grade')
      .order('created_at', { ascending: false })

    // Filter by game if specified
    if (gameId && gameId !== 'all') {
      query = query.eq('game_id', gameId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ 
      data: data ?? [],
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[API] attendance fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance data' },
      { status: 500 }
    )
  }
}