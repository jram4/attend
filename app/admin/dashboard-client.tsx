'use client';

import { useMemo, useState } from 'react';
import type { AttendanceRow } from './page';
import { StatsCards } from './components/stats-cards';
import { GradePieChart } from './components/grade-pie-chart';
import { AttendanceLineChart } from './components/attendance-line-chart';

type Props = {
  rows: AttendanceRow[];
  adminLogout: () => Promise<void>;
};

// canonical grades we chart; others (e.g., Unknown) are ignored in charts
const GRADES = ['Senior', 'Junior', 'Sophomore', 'Freshman'] as const;
type GradeName = typeof GRADES[number];

function normalizeGrade(raw: string | null): GradeName | null {
  const g = (raw ?? '').trim();
  if ((GRADES as readonly string[]).includes(g)) return g as GradeName;
  return null; // treat anything else as "not charted"
}

function uniqueGames(rows: AttendanceRow[]): string[] {
  const s = new Set<string>();
  rows.forEach(r => s.add(r.game_id));
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

function computeGradeCounts(rows: AttendanceRow[]): Record<GradeName, number> {
  const counts: Record<GradeName, number> = { Senior: 0, Junior: 0, Sophomore: 0, Freshman: 0 };
  rows.forEach(r => {
    const g = normalizeGrade(r.user_grade);
    if (g) counts[g] += 1;
  });
  return counts;
}

/**
 * Build a per-grade time series across the window covered by the filtered rows.
 * Buckets into 10-minute intervals by local time and labels with HH:MM.
 */
function buildTimeSeries(rows: AttendanceRow[], binMinutes = 10) {
  if (!rows.length) return [] as Array<{ time: string } & Record<GradeName, number>>;

  const binMs = binMinutes * 60 * 1000;
  const times = rows.map(r => new Date(r.created_at).getTime());
  const start = Math.floor(Math.min(...times) / binMs) * binMs;
  const end = Math.ceil(Math.max(...times) / binMs) * binMs;

  // initialize bins
  const bins: Array<{ time: string } & Record<GradeName, number>> = [];
  const indexByTs = new Map<number, number>();
  let idx = 0;
  for (let t = start; t <= end; t += binMs) {
    indexByTs.set(t, idx++);
    const label = new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bins.push({ time: label, Senior: 0, Junior: 0, Sophomore: 0, Freshman: 0 });
  }

  rows.forEach(r => {
    const ts = new Date(r.created_at).getTime();
    const bucketStart = Math.floor(ts / binMs) * binMs;
    const i = indexByTs.get(bucketStart);
    if (i === undefined) return;
    const g = normalizeGrade(r.user_grade);
    if (g) bins[i][g] += 1;
  });

  return bins;
}

export function AdminDashboardClient({ rows, adminLogout }: Props) {
  // default to "All Games"; user can drill into a specific one
  const [selectedGame, setSelectedGame] = useState<string>('all');

  const games = useMemo(() => uniqueGames(rows), [rows]);

  const filteredRows = useMemo(() => {
    if (selectedGame === 'all') return rows;
    return rows.filter(r => r.game_id === selectedGame);
  }, [rows, selectedGame]);

  const gradeCounts = useMemo(() => computeGradeCounts(filteredRows), [filteredRows]);
  const timeSeriesData = useMemo(() => buildTimeSeries(filteredRows, 10), [filteredRows]);

  const totalCount = filteredRows.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 leading-tight">Dashboard</h1>
        <h2 className="text-lg font-medium text-slate-600">THE HORDE</h2>
      </div>

      {/* Game Selection */}
      <div className="mb-6">
        <label htmlFor="game-select" className="block text-sm font-medium text-slate-700 mb-2">
          Select Game
        </label>
        <select
          id="game-select"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="block w-full px-4 py-3 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="all">All games</option>
          {games.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-600">
          <p>No attendance data yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <StatsCards gradeCounts={gradeCounts} totalCount={totalCount} />
          <div className="space-y-6">
            <GradePieChart gradeCounts={gradeCounts} />
            <AttendanceLineChart data={timeSeriesData} />
          </div>
        </div>
      )}

      {/* Logout Button - Fixed at bottom */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => adminLogout()}
          className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}