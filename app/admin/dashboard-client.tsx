'use client'

interface GradeCounts {
  Freshman: number
  Sophomore: number
  Junior: number
  Senior: number
}

interface DashboardClientProps {
  gradeCounts: GradeCounts
  totalCount: number
  gameId: string
  adminLogout: (formData: FormData) => Promise<void>
}

export default function DashboardClient({
  gradeCounts,
  totalCount,
  gameId,
  adminLogout
}: DashboardClientProps) {
  // Sort grades by attendance count (highest to lowest)
  const sortedGrades = Object.entries(gradeCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([grade, count]) => ({ grade, count }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Attendance Leaderboard
        </h1>
        <p className="text-lg text-gray-600">
          {gameId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </p>
      </div>

      {/* Total Check-Ins */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="text-5xl font-bold text-blue-600 mb-2">
          {totalCount}
        </div>
        <div className="text-xl text-blue-800 font-medium">
          Total Check-Ins
        </div>
      </div>

      {/* Grade Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            By Grade Level
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedGrades.map(({ grade, count }, index) => (
            <div
              key={grade}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {index + 1}
                  </span>
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {grade}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center">
        <form>
          <button
            formAction={adminLogout}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}
