/* Seed demo rows into public.attendance for past games.
   Hit: /admin/seed?dry=1  (preview only)
        /admin/seed?reset=1  (truncate then insert)
        /admin/seed?game=GAME_ID&game=GAME_ID2  (limit to these)
        /admin/seed?past=0  (include future games too)
        /admin/seed?makeUsers=1  (also create fake auth users + use their IDs)

   NOTE:
   - By default we DO NOT write user_id / user_email to avoid FK issues.
   - If your attendance.user_id is NOT NULL or has a real FK, pass makeUsers=1.
*/

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'node:crypto';
import { adminClient } from '@/lib/supabase/admin';
import { GAMES } from '@/lib/game-config';
import { GRADE_SIZES } from '@/lib/grade-config';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Grade = 'Senior' | 'Junior' | 'Sophomore' | 'Freshman';
const GRADES: Grade[] = ['Senior', 'Junior', 'Sophomore', 'Freshman'];

// ---- small deterministic RNG helpers ----
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seeded(gameId: string) {
  const seed = xmur3(gameId)();
  return mulberry32(seed);
}
function randBetween(rng: () => number, min: number, max: number) {
  return min + (max - min) * rng();
}
function randomTimestamp(rng: () => number, start: Date, end: Date) {
  const t = randBetween(rng, start.getTime(), end.getTime());
  return new Date(Math.floor(t));
}
// Deterministic UUIDv5-ish from a string (no dependency)
function uuidFromString(input: string) {
  const hash = crypto.createHash('sha1').update(input).digest(); // 20 bytes
  const b = Buffer.from(hash.slice(0, 16));
  b[6] = (b[6] & 0x0f) | 0x50; // version 5
  b[8] = (b[8] & 0x3f) | 0x80; // variant
  const hex = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Build a deterministic “student pool” you can reuse across games
type FakeStudent = { user_id: string; user_email: string; user_grade: Grade };
function buildStudentPool(): Record<Grade, FakeStudent[]> {
  const pool = {} as Record<Grade, FakeStudent[]>;
  for (const grade of GRADES) {
    const size = (GRADE_SIZES as Record<Grade, number>)[grade];
    pool[grade] = Array.from({ length: size }, (_, i) => {
      const email = `${grade.toLowerCase()}${i}@school.test`;
      return {
        user_id: uuidFromString(`${grade}:${i}:attend-student`),
        user_email: email,
        user_grade: grade,
      };
    });
  }
  return pool;
}

// Fisher–Yates sample without replacement
function sampleN<T>(arr: T[], n: number, rng: () => number) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.max(0, Math.min(n, a.length)));
}

export async function GET(req: NextRequest) {
  // simple cookie gate (same as your admin page)
  const c = await cookies();
  const authed = c.get('admin-auth')?.value === 'authenticated';
  if (!authed) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const reset = url.searchParams.get('reset') === '1';
  const dry = url.searchParams.get('dry') === '1';
  const includeFuture = url.searchParams.get('past') === '0';
  const selected = url.searchParams.getAll('game'); // allow multiple ?game=...
  const makeUsers = url.searchParams.get('makeUsers') === '1';

  // choose games
  const now = new Date();
  const games = GAMES.filter((g) => (selected.length ? selected.includes(g.id) : true))
    .filter((g) => includeFuture || new Date(g.checkInEnd) < now);

  // Optionally nuke existing rows
  if (reset && !dry) {
    const { error } = await adminClient.from('attendance').delete().neq('id', 0);
    if (error) return NextResponse.json({ error: `reset failed: ${error.message}` }, { status: 500 });
  }

  // If you actually need valid auth.users (FK/NOT NULL), create them
  const pool = buildStudentPool();
  const byId = new Map<string, FakeStudent>();
  if (makeUsers && !dry) {
    for (const grade of GRADES) {
      // small batch to avoid rate limits
      for (const s of pool[grade]) {
        byId.set(s.user_id, s);
        // createUser is idempotent on email; ignore conflicts
        await adminClient.auth.admin.createUser({
          email: s.user_email,
          email_confirm: true,
          user_metadata: { grade: s.user_grade, demo: true },
        });
      }
    }
  }

  // Reasonable baseline attendance rates per grade, with small per-game noise
  const BASE: Record<Grade, number> = {
    Senior: 0.38,
    Junior: 0.35,
    Sophomore: 0.32,
    Freshman: 0.30,
  };

  const results: Array<{ gameId: string; toInsert: number; inserted?: number }> = [];

  for (const game of games) {
    const rng = seeded(game.id);
    const start = new Date(game.checkInStart);
    const end = new Date(game.checkInEnd);

    const rows: any[] = [];

    for (const grade of GRADES) {
      const total = (GRADE_SIZES as Record<Grade, number>)[grade];
      // add ±6% noise, clamp to [0, 95%]
      const rate = Math.max(0, Math.min(0.95, BASE[grade] + (rng() - 0.5) * 0.12));
      const count = Math.floor(total * rate);

      const picks = sampleN(pool[grade], count, rng);
      for (const s of picks) {
        const createdAt = randomTimestamp(rng, start, end).toISOString();
        const baseRow = {
          created_at: createdAt,
          game_id: game.id,
          user_grade: s.user_grade,
        };
        // only attach user fields when makeUsers=1 (to avoid FK issues by default)
        rows.push(
          makeUsers
            ? { ...baseRow, user_id: s.user_id, user_email: s.user_email }
            : baseRow
        );
      }
    }

    let inserted = 0;
    if (!dry) {
      // chunk inserts
      for (let i = 0; i < rows.length; i += 1000) {
        const chunk = rows.slice(i, i + 1000);
        // If user_id FK/UNIQUE exists and we seeded users, dedupe per (user_id, game_id)
        const q = makeUsers
          ? adminClient.from('attendance').upsert(chunk, {
              onConflict: 'user_id,game_id',
              ignoreDuplicates: true,
            })
          : adminClient.from('attendance').insert(chunk);

        const { error } = await q;
        if (error) {
          return NextResponse.json(
            { error: `insert failed for game ${game.id}: ${error.message}` },
            { status: 500 }
          );
        }
        inserted += chunk.length;
      }
    }

    results.push({ gameId: game.id, toInsert: rows.length, inserted: dry ? undefined : inserted });
  }

  return NextResponse.json({
    reset,
    dry,
    makeUsers,
    gamesSeeded: results,
  });
}
