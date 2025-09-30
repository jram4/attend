// app/admin/dashboard-client.tsx
'use client'

import { useMemo, useState } from 'react'
import type { AttendanceRow } from './page'
import { StatsCards } from './components/stats-cards'
import { GradePieChart } from './components/grade-pie-chart'
import { AttendanceLineChart } from './components/attendance-line-chart'
import { useAttendanceData } from '@/lib/hooks/use-attendance-data'
import { RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react'

type Props = {
  rows: AttendanceRow[]
  adminLogout: () => Promise<void>
}

const GRADES = ['Senior', 'Junior', 'Sophomore', 'Freshman'] as const
type GradeName = typeof GRADES[number]

function normalizeGrade(raw: string | null): GradeName | null {
  const g = (raw ?? '').trim()
  if ((GRADES as readonly string[]).includes(g)) return g as GradeName
  return null
}

function uniqueGames(rows: AttendanceRow[]): string[] {
  const s = new Set<string>()
  rows.forEach(r => s.add(r.game_id))
  return Array.from(s).sort((a, b) => a.localeCompare(b))
}

function computeGradeCounts(rows: AttendanceRow[]): Record<GradeName, number> {
  const counts: Record<GradeName, number> = { Senior: 0, Junior: 0, Sophomore: 0, Freshman: 0 }
  rows.forEach(r => {
    const g = normalizeGrade(r.user_grade)
    if (g) counts[g] += 1
  })
  return counts
}

function buildTimeSeries(rows: AttendanceRow[], binMinutes = 10) {
  if (!rows.length) return [] as Array<{ time: string } & Record<GradeName, number>>

  const binMs = binMinutes * 60 * 1000
  const times = rows.map(r => new Date(r.created_at).getTime())
  const start = Math.floor(Math.min(...times) / binMs) * binMs
  const end = Math.ceil(Math.max(...times) / binMs) * binMs

  const bins: Array<{ time: string } & Record<GradeName, number>> = []
  const indexByTs = new Map<number, number>()
  let idx = 0
  for (let t = start; t <= end; t += binMs) {
    indexByTs.set(t, idx++)
    const label = new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    bins.push({ time: label, Senior: 0, Junior: 0, Sophomore: 0, Freshman: 0 })
  }

  rows.forEach(r => {
    const ts = new Date(r.created_at).getTime()
    const bucketStart = Math.floor(ts / binMs) * binMs
    const i = indexByTs.get(bucketStart)
    if (i === undefined) return
    const g = normalizeGrade(r.user_grade)
    if (g) bins[i][g] += 1
  })

  return bins
}

function formatLastUpdated(date: Date | null): string {
  if (!date) return 'Never'
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function AdminDashboardClient({ rows: initialRows, adminLogout }: Props) {
  const [selectedGame, setSelectedGame] = useState<string>('all')
  const [isLiveMode, setIsLiveMode] = useState(true)

  // Use live data if enabled, otherwise use initial server data
  const { data: liveData, loading, error, lastUpdated } = useAttendanceData({
    gameId: selectedGame,
    pollingInterval: 10000, // 10 seconds
    enabled: isLiveMode,
  })

  // Handle loading and data selection logic
  const isInitialLoading = isLiveMode && loading
  const rows = isLiveMode && !loading ? liveData : initialRows
  const games = useMemo(() => uniqueGames(initialRows), [initialRows])

  const filteredRows = useMemo(() => {
    if (selectedGame === 'all') return rows
    return rows.filter(r => r.game_id === selectedGame)
  }, [rows, selectedGame])

  const gradeCounts = useMemo(() => computeGradeCounts(filteredRows), [filteredRows])
  const timeSeriesData = useMemo(() => buildTimeSeries(filteredRows, 10), [filteredRows])
  const totalCount = filteredRows.length

  // Calculate rate of new check-ins
  const [previousCount, setPreviousCount] = useState(totalCount)
  const [checkInRate, setCheckInRate] = useState(0)

  useMemo(() => {
    if (totalCount !== previousCount) {
      const rate = totalCount - previousCount
      setCheckInRate(rate)
      setPreviousCount(totalCount)
      
      // Reset rate after 3 seconds
      setTimeout(() => setCheckInRate(0), 3000)
    }
  }, [totalCount, previousCount])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <h2 className="text-sm font-medium text-slate-600">THE HORDE</h2>
            </div>
            
            {/* Live Mode Toggle */}
            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`p-2 rounded-lg transition-colors ${
                isLiveMode 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-slate-200 text-slate-600'
              }`}
              title={isLiveMode ? 'Live updates enabled' : 'Live updates paused'}
            >
              {isLiveMode ? <Wifi size={20} /> : <WifiOff size={20} />}
            </button>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
            </div>
            
            {checkInRate > 0 && (
              <div className="animate-pulse bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                +{checkInRate} new
              </div>
            )}
            
            {error && (
              <div className="text-red-600 text-xs">
                Error loading data
              </div>
            )}
          </div>

          {/* Game Selection */}
          <div className="mt-3">
            <select
              id="game-select"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              disabled={isInitialLoading}
            >
              <option value="all">
                All games ({isInitialLoading ? '...' : rows.length})
              </option>
              {games.map((g) => {
                const count = isInitialLoading ? '...' : rows.filter(r => r.game_id === g).length
                return (
                  <option key={g} value={g}>
                    {g} ({count})
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isInitialLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-600">
            <RefreshCw size={32} className="animate-spin mb-4 text-slate-400" />
            <p>Loading attendance data...</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-600">
            <p>No attendance data yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Total Count Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <p className="text-sm font-medium opacity-90">Total Check-ins</p>
                <p className="text-5xl font-bold mt-1">{totalCount}</p>
              </div>
            </div>

            <StatsCards gradeCounts={gradeCounts} totalCount={totalCount} />
            
            <div className="space-y-4">
              <GradePieChart gradeCounts={gradeCounts} />
              <AttendanceLineChart data={timeSeriesData} />
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button
            onClick={() => adminLogout()}
            className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}