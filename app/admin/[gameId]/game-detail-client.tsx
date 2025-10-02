// app/admin/[gameId]/game-detail-client.tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { AttendanceRow } from '../page'
import { StatsCards } from '../components/stats-cards'
import { GradePieChart } from '../components/grade-pie-chart'
import { AttendanceLineChart } from '../components/attendance-line-chart'
import { useAttendanceData } from '@/lib/hooks/use-attendance-data'
import { ArrowLeft, RefreshCw, Wifi, WifiOff, Clock, Home, Plane } from 'lucide-react'
import { GAMES } from '@/lib/game-config'

type Props = {
  rows: AttendanceRow[]
  game: typeof GAMES[number]
}

const GRADES = ['Senior', 'Junior', 'Sophomore', 'Freshman'] as const
type GradeName = typeof GRADES[number]

function normalizeGrade(raw: string | null): GradeName | null {
  const g = (raw ?? '').trim()
  if ((GRADES as readonly string[]).includes(g)) return g as GradeName
  return null
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

function formatGameDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    timeZone: 'America/Chicago'
  })
}

export function GameDetailPage({ rows: initialRows, game }: Props) {
  const [isLiveMode, setIsLiveMode] = useState(true)

  const { data: liveData, loading, error, lastUpdated, isBackgroundRefresh } = useAttendanceData({
    pollingInterval: 10000,
    enabled: isLiveMode,
  })

  const allRows = isLiveMode && liveData.length > 0 ? liveData : initialRows

  const filteredRows = useMemo(() => {
    return allRows.filter(r => r.game_id === game.id)
  }, [allRows, game.id])

  const gradeCounts = useMemo(() => computeGradeCounts(filteredRows), [filteredRows])
  const timeSeriesData = useMemo(() => buildTimeSeries(filteredRows, 10), [filteredRows])
  const totalCount = filteredRows.length

  const showLoading = loading && allRows.length === 0

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="p-4">
          {/* Native-style Back Button Row */}
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/admin"
              className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 active:text-blue-800 transition-colors -ml-2 px-2 py-2 rounded-lg hover:bg-blue-50 active:bg-blue-100"
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
              <span className="font-semibold text-base">Games</span>
            </Link>
            
            {/* Live Mode Toggle */}
            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                isLiveMode 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-slate-200 text-slate-600'
              }`}
              title={isLiveMode ? 'Live updates enabled' : 'Live updates paused'}
            >
              {isLiveMode ? <Wifi size={20} /> : <WifiOff size={20} />}
            </button>
          </div>

          {/* Game Info */}
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={game.opponentLogoUrl} 
              alt="Opponent" 
              className="w-12 h-12 object-contain rounded-lg flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-slate-900 truncate">
                {game.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>{formatGameDate(game.checkInStart)}</span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1">
                  {game.location === 'H' ? (
                    <>
                      <Home size={12} className="text-blue-600" />
                      <span className="text-blue-600 font-medium">Home</span>
                    </>
                  ) : (
                    <>
                      <Plane size={12} className="text-slate-600" />
                      <span className="text-slate-600 font-medium">Away</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
              {isBackgroundRefresh && (
                <span className="text-blue-600">(syncing...)</span>
              )}
            </div>
            
            {error && (
              <div className="text-red-600 text-xs">
                Error loading data
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {showLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-600">
            <RefreshCw size={32} className="animate-spin mb-4 text-slate-400" />
            <p>Loading attendance data...</p>
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
        <button
          onClick={handleRefresh}
          className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>
    </div>
  )
}