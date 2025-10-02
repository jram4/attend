// app/admin/components/overview-page.tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { AttendanceRow } from '../page'
import { useAttendanceData } from '@/lib/hooks/use-attendance-data'
import { RefreshCw, Wifi, WifiOff, Clock, ChevronRight, Home, Plane } from 'lucide-react'
import { GAMES } from '@/lib/game-config'

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

function formatGameDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    timeZone: 'America/Chicago'
  })
}

function formatLastUpdated(date: Date | null): string {
  if (!date) return 'Never'
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

interface GameStats {
  gameId: string
  gameName: string
  date: string
  location: 'H' | 'A'
  opponentLogo: string
  totalAttendance: number
  gradeBreakdown: Record<GradeName, number>
}

export function OverviewPage({ rows: initialRows, adminLogout }: Props) {
  const [isLiveMode, setIsLiveMode] = useState(true)

  const { data: liveData, loading, error, lastUpdated, isBackgroundRefresh } = useAttendanceData({
    pollingInterval: 10000,
    enabled: isLiveMode,
  })

  const allRows = isLiveMode && liveData.length > 0 ? liveData : initialRows

  // Calculate stats per game
  const gameStats = useMemo(() => {
    const statsMap = new Map<string, GameStats>()
    
    // Initialize with game config
    GAMES.forEach(game => {
      statsMap.set(game.id, {
        gameId: game.id,
        gameName: game.name,
        date: game.checkInStart,
        location: game.location,
        opponentLogo: game.opponentLogoUrl,
        totalAttendance: 0,
        gradeBreakdown: { Senior: 0, Junior: 0, Sophomore: 0, Freshman: 0 }
      })
    })

    // Count attendance
    allRows.forEach(row => {
      const stats = statsMap.get(row.game_id)
      if (stats) {
        stats.totalAttendance++
        const grade = normalizeGrade(row.user_grade)
        if (grade) {
          stats.gradeBreakdown[grade]++
        }
      }
    })

    // Convert to array and sort by date (oldest first)
    return Array.from(statsMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [allRows])

  const totalAttendance = allRows.length
  const showLoading = loading && allRows.length === 0

  const handleRefresh = () => {
    window.location.reload()
  }

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
                <p className="text-5xl font-bold mt-1">{totalAttendance}</p>
                <p className="text-xs opacity-75 mt-2">Across {gameStats.length} games</p>
              </div>
            </div>

            {/* Game Cards */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900 px-1">Games</h3>
              
              {gameStats.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No games found
                </div>
              ) : (
                gameStats.map((game) => (
                  <Link
                    key={game.gameId}
                    href={`/admin/${game.gameId}`}
                    className="block bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4">
                      {/* Opponent Logo */}
                      <div className="flex-shrink-0">
                        <img 
                          src={game.opponentLogo} 
                          alt="Opponent" 
                          className="w-12 h-12 object-contain rounded-lg"
                        />
                      </div>

                      {/* Game Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 truncate">
                          {game.gameName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-600">
                            {formatGameDate(game.date)}
                          </span>
                          <span className="text-slate-300">•</span>
                          <div className="flex items-center gap-1">
                            {game.location === 'H' ? (
                              <>
                                <Home size={12} className="text-blue-600" />
                                <span className="text-xs text-blue-600 font-medium">Home</span>
                              </>
                            ) : (
                              <>
                                <Plane size={12} className="text-slate-600" />
                                <span className="text-xs text-slate-600 font-medium">Away</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Grade breakdown mini */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-2xl font-bold text-slate-900">
                            {game.totalAttendance}
                          </span>
                          <span className="text-xs text-slate-500">students</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="text-slate-400 flex-shrink-0" size={20} />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
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