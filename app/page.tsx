import Link from 'next/link'
import { ScreenshotDisplay } from './components/screenshot-display'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The Horde Attendance System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Track student attendance at school games and fuel grade-level competition.
            A secure, mobile-first platform that makes checking in fast and fair.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Student Check-in Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">🎯</div>
                <div>
                  <h2 className="text-2xl font-bold">Student Check-In</h2>
                  <p className="text-blue-100">Quick and secure attendance tracking</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Scan QR Code</h3>
                    <p className="text-gray-600 text-sm">Arrive at the game venue and scan the provided QR code</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sign In with School</h3>
                    <p className="text-gray-600 text-sm">Secure OAuth authentication using your school credentials</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-semibold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">You're Checked In!</h3>
                    <p className="text-gray-600 text-sm">Your attendance is recorded and contributes to your grade's score</p>
                  </div>
                </div>
              </div>

              {/* Screenshot placeholder */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                <ScreenshotDisplay
                  src="/checkin.png"
                  alt="Student check-in interface"
                  fallbackIcon="📱"
                  fallbackText="Check-in screenshot"
                  fallbackSubtext="Add /public/checkin.png"
                />
              </div>
            </div>
          </div>

          {/* Admin Dashboard Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-purple-600 text-white p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">📊</div>
                <div>
                  <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                  <p className="text-purple-100">Real-time attendance analytics</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-sm">📈</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Leaderboard</h3>
                    <p className="text-gray-600 text-sm">Track attendance counts by grade level in real-time</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-sm">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visual Analytics</h3>
                    <p className="text-gray-600 text-sm">Charts and graphs showing attendance trends and statistics</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-sm">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Secure Access</h3>
                    <p className="text-gray-600 text-sm">Password-protected route for organizers only</p>
                  </div>
                </div>
              </div>

              {/* Screenshot placeholder */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                <ScreenshotDisplay
                  src="/admin.png"
                  alt="Admin dashboard interface"
                  fallbackIcon="📊"
                  fallbackText="Admin dashboard screenshot"
                  fallbackSubtext="Add /public/admin.png"
                />
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Access Admin Dashboard
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why It Matters Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Attendance Matters</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This system powers a grade-level competition that increases student engagement and school spirit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fair Competition</h3>
              <p className="text-gray-600 text-sm">
                Secure authentication ensures only legitimate students can check in, making the competition fair and verifiable.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">
                Mobile-first design with minimal steps means students can check in quickly without disrupting the game experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">
                Industry-standard OAuth authentication protects student privacy while ensuring data integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
