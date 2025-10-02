// app/admin/[gameId]/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminClient } from '@/lib/supabase/admin';
import { GameDetailPage } from './game-detail-client';
import { GAMES } from '@/lib/game-config';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ gameId: string }>
}

export type AttendanceRow = {
  created_at: string;
  game_id: string;
  user_grade: string | null;
};

export default async function GameDetailRoute({ params }: PageProps) {
  const { gameId } = await params;
  
  // Check auth
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin-auth')?.value === 'authenticated';

  if (!isAuthenticated) {
    redirect('/admin');
  }

  // Verify game exists
  const game = GAMES.find(g => g.id === gameId);
  if (!game) {
    redirect('/admin');
  }

  // Fetch all attendance data (for background updates)
  const { data, error } = await adminClient
    .from('attendance')
    .select('created_at, game_id, user_grade')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[GameDetailPage] attendance fetch error:', error);
    throw new Error(`Failed to load attendance: ${error.message}`);
  }

  const rows = (data ?? []) as AttendanceRow[];

  return <GameDetailPage rows={rows} game={game} />;
}