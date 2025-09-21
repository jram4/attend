'use client'

import { useState, useEffect } from 'react'

type Props = { showHeader?: boolean }

// --- Fixed demo game, constants, and helpers (CT accurate) ---
const game = {
  id: 'week-3-vs-stmarks',
  name: 'Week 3 vs. St. Marks School of Dallas',
  start: new Date('2025-09-21T14:00:00-05:00'), // 2:00 PM CT
  end: new Date('2025-09-21T17:00:00-05:00'),   // 5:00 PM CT
}

// Check-in window = 1h before start -> 1h after end
const checkInStart = new Date(game.start.getTime() - 60 * 60 * 1000) // 1:00 PM CT
const checkInEnd = new Date(game.end.getTime() + 60 * 60 * 1000)     // 6:00 PM CT

const ESD_LOGO = 'https://bvmsports.com/wp-content/uploads/2021/12/20181010230955_782_mascotOrig-150x150.png'
const OPPONENT_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/2/2d/StMarksTexas.jpg'
const TZ = 'America/Chicago' as const

function formatFullWindow(start: Date, end: Date) {
  const dateLabel = start.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: TZ,
  })
  const startStr = start.toLocaleTimeString('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const endStr = end.toLocaleTimeString('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${dateLabel} • ${startStr} – ${endStr}`
}

function formatCheckInWindow(start: Date, end: Date) {
  const s = start.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
  const e = end.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
  return `${s} – ${e} CT`
}

function useNow(tickMs = 1000) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), tickMs)
    return () => clearInterval(id)
  }, [tickMs])
  return now
}

function toHMS(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(Math.abs(ms) / 1000))
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function StatusTimer() {
  const now = useNow(1000)
  if (now < checkInStart) {
    return (
      <div className="text-center">
        <div className="text-sm font-semibold text-amber-700 mb-1">Check-in opens in</div>
        <div className="text-4xl font-mono font-extrabold text-amber-600">{toHMS(checkInStart.getTime() - now.getTime())}</div>
      </div>
    )
  }
  if (now >= checkInStart && now <= checkInEnd) {
    return (
      <div className="text-center">
        <div className="text-sm font-semibold text-emerald-700 mb-1">Check-in closes in</div>
        <div className="text-4xl font-mono font-extrabold text-emerald-600">{toHMS(checkInEnd.getTime() - now.getTime())}</div>
      </div>
    )
  }
  return (
    <div className="text-center">
      <div className="text-sm font-semibold text-gray-700 mb-1">Check-in closed</div>
      <div className="text-lg text-gray-600">Thanks for coming!</div>
    </div>
  )
}

interface DemoResult {
  status: 'idle' | 'loading' | 'success' | 'already-checked-in' | 'error'
  message?: string
}

export default function CheckInClient({ showHeader = true }: Props) {
  const [demoResult, setDemoResult] = useState<DemoResult>({ status: 'idle' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header (hide if parent already renders a title) */}
      {showHeader && (
        <header className="mx-auto w-full max-w-md px-5 pt-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 drop-shadow">
              <img src={ESD_LOGO} alt="ESD" className="h-16 w-16 object-contain" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">VS</span>
              <img src={OPPONENT_LOGO} alt="St. Marks" className="h-16 w-16 object-contain" />
            </div>
            <h1 className="mt-3 text-xl font-bold text-gray-900">{game.name}</h1>
            <p className="mt-1 text-sm text-gray-600">{formatFullWindow(game.start, game.end)}</p>
            <div className="mt-2"><StatusTimer /></div>
            <p className="mt-1 text-[11px] text-gray-500">Check-in window: {formatCheckInWindow(checkInStart, checkInEnd)}</p>
          </div>
        </header>
      )}

      {/* Main CTA + States */}
      <main className="flex-1 flex items-center justify-center p-5">
        {demoResult.status === 'idle' && (
          <button
            onClick={() => {
              setDemoResult({ status: 'loading', message: 'Checking you in…' })
              setTimeout(() => setDemoResult({ status: 'success', message: 'You are checked in!' }), 5000)
            }}
            className="relative w-full max-w-md h-[64vh] rounded-[28px] bg-gradient-to-br from-blue-600 to-indigo-700 text-white drop-shadow-2xl shadow-[0_18px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10 border border-white/10 flex flex-col items-center justify-center gap-2 active:translate-y-[1px] active:shadow-[0_10px_24px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 hover:scale-[1.01] transition-transform"
            aria-label="Check In with ESD"
          >
            <span className="pointer-events-none absolute inset-x-6 top-4 h-10 rounded-2xl bg-white/15 blur-md" />
            <span className="text-[13px] font-semibold uppercase tracking-wide text-white/85">Check In</span>
            <span className="text-5xl font-extrabold tracking-tight">With ESD</span>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
              <span>Continue</span>
            </span>
          </button>
        )}

        {demoResult.status === 'loading' && (
          <div className="w-full max-w-md h-[60vh] rounded-[28px] border border-gray-200 bg-white/90 shadow-xl backdrop-blur flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-6" />
            <p className="text-lg font-semibold text-gray-700">{demoResult.message}</p>
          </div>
        )}

        {demoResult.status === 'success' && (
          <div className="w-full max-w-md h-[60vh] rounded-[28px] border border-emerald-200 bg-emerald-50/90 shadow-xl backdrop-blur flex flex-col items-center justify-center text-emerald-800 p-6 text-center">
            <div className="text-7xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">{demoResult.message}</h2>
            <p className="text-sm opacity-90 mb-6">Thank you for participating. Enjoy the game!</p>
            <button
              onClick={() => setDemoResult({ status: 'idle' })}
              className="rounded-xl bg-gray-900 text-white px-5 py-3 text-sm font-semibold shadow-md active:scale-[.99] transition-transform"
            >
              Done
            </button>
          </div>
        )}

        {demoResult.status === 'error' && (
          <div className="w-full max-w-md h-[60vh] rounded-[28px] border border-red-200 bg-red-50/90 shadow-xl backdrop-blur flex flex-col items-center justify-center text-red-800 p-6">
            <div className="text-7xl mb-4">❌</div>
            <h2 className="text-2xl font-bold mb-2">{demoResult.message || 'Something went wrong'}</h2>
            <button
              onClick={() => setDemoResult({ status: 'idle' })}
              className="rounded-xl bg-gray-900 text-white px-5 py-3 text-sm font-semibold shadow-md active:scale-[.99]"
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-md pb-8 text-center text-xs text-gray-500">
        Secure sign-in with your school account.
      </footer>
    </div>
  )
}
