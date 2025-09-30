// lib/hooks/use-attendance-data.ts
'use client'

import { useEffect, useState } from 'react'

export type AttendanceRow = {
  created_at: string
  game_id: string
  user_grade: string | null
}

interface UseAttendanceDataOptions {
  gameId: string | 'all'
  pollingInterval?: number
  enabled?: boolean
}

export function useAttendanceData({
  gameId,
  pollingInterval = 10000,
  enabled = true,
}: UseAttendanceDataOptions) {
  const [data, setData] = useState<AttendanceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    if (!enabled) return

    async function fetchData() {
      try {
        const url = `/api/admin/attendance?gameId=${encodeURIComponent(gameId)}`
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include', // Important for cookies
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized')
          }
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()
        setData(result.data ?? [])
        setLastUpdated(new Date(result.timestamp))
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchData()

    // Set up polling
    const interval = setInterval(fetchData, pollingInterval)

    return () => clearInterval(interval)
  }, [gameId, pollingInterval, enabled])

  return { data, loading, error, lastUpdated }
}