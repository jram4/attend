import { cookies } from 'next/headers'
import { adminLogin, adminLogout } from './actions'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './dashboard-client'

const ADMIN_COOKIE_NAME = 'admin-auth'
const ADMIN_COOKIE_VALUE = 'authenticated'

interface AdminPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const cookieStore = await cookies()
  const adminCookie = cookieStore.get(ADMIN_COOKIE_NAME)
  const isAuthenticated = adminCookie?.value === ADMIN_COOKIE_VALUE

  // Check for error in URL params
  const params = await searchParams
  const hasError = params.error === 'auth'

  if (!isAuthenticated) {
    // Show login form
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter the admin password to access the dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6">
            {hasError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                Invalid password. Please try again.
              </div>
            )}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Admin password"
              />
            </div>
            <div>
              <button
                formAction={adminLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Fetch attendance data
  const targetGameId = 'homecoming-2024'
  const supabase = await createClient()

  const { data: attendanceData, error } = await supabase
    .from('attendance')
    .select('user_grade')
    .eq('game_id', targetGameId)

  if (error) {
    console.error('Error fetching attendance data:', error)
  }

  // Aggregate data by grade level
  const gradeCounts = {
    'Freshman': 0,
    'Sophomore': 0,
    'Junior': 0,
    'Senior': 0,
  }

  if (attendanceData) {
    attendanceData.forEach((record) => {
      if (record.user_grade && gradeCounts[record.user_grade as keyof typeof gradeCounts] !== undefined) {
        gradeCounts[record.user_grade as keyof typeof gradeCounts]++
      }
    })
  }

  const totalCount = Object.values(gradeCounts).reduce((sum, count) => sum + count, 0)

  // Show dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <DashboardClient
              gradeCounts={gradeCounts}
              totalCount={totalCount}
              gameId={targetGameId}
              adminLogout={adminLogout}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
