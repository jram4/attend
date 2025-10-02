// lib/hooks/use-attendance-data.ts
'use client'

import { useEffect, useState, useRef } from 'react'

export type AttendanceRow = {
  created_at: string
  game_id: string
  user_grade: string | null
}

interface UseAttendanceDataOptions {
  pollingInterval?: number
  enabled?: boolean
}

export function useAttendanceData({
  pollingInterval = 10000,
  enabled = true,
}: UseAttendanceDataOptions) {
  const [data, setData] = useState<AttendanceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isBackgroundRefresh, setIsBackgroundRefresh] = useState(false)
  const hasFetchedOnce = useRef(false)

  useEffect(() => {
    if (!enabled) return

    async function fetchData(isBackground = false) {
      try {
        if (!isBackground) {
          setLoading(true)
        } else {
          setIsBackgroundRefresh(true)
        }

        // Always fetch ALL data
        const response = await fetch('/api/admin/attendance?gameId=all', {
          method: 'GET',
          credentials: 'include',
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
        hasFetchedOnce.current = true
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
        setIsBackgroundRefresh(false)
      }
    }

    // Initial fetch
    fetchData(false)

    // Set up polling (background fetches)
    const interval = setInterval(() => {
      if (hasFetchedOnce.current) {
        fetchData(true)
      }
    }, pollingInterval)

    return () => clearInterval(interval)
  }, [pollingInterval, enabled])

  return { data, loading, error, lastUpdated, isBackgroundRefresh }
}