// app/page.tsx

import Link from 'next/link'
import { ScreenshotDisplay } from './components/screenshot-display'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            The Horde Attendance System
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Track student attendance at school games and fuel grade-level competition.
            A secure, mobile-first platform that makes checking in fast and fair.
          </p>

          {/* --- NEW: Prominent Links for Google Verification --- */}
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="inline-flex items-center px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Student Check-in Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-[#00275D] to-[#003B7E] text-white p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">🎯</div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Student Check-In</h2>
                  <p className="text-white/90 font-medium">Quick and secure attendance tracking</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#E6EAF2] rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[#00275D] font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Scan QR Code</h3>
                    <p className="text-slate-600 text-sm">Arrive at the game venue and scan the provided QR code</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#E6EAF2] rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[#00275D] font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Sign In with School</h3>
                    <p className="text-slate-600 text-sm">Secure OAuth authentication using your school credentials</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-emerald-600 font-semibold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">You're Checked In!</h3>
                    <p className="text-slate-600 text-sm">Your attendance is recorded and contributes to your grade's score</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border-2 border-dashed border-slate-200">
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">📊</div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
                  <p className="text-purple-100 font-medium">Real-time attendance analytics</p>
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
                    <h3 className="font-semibold text-slate-900">Live Leaderboard</h3>
                    <p className="text-slate-600 text-sm">Track attendance counts by grade level in real-time</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-sm">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Visual Analytics</h3>
                    <p className="text-slate-600 text-sm">Charts and graphs showing attendance trends and statistics</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-sm">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Secure Access</h3>
                    <p className="text-slate-600 text-sm">Password-protected route for organizers only</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border-2 border-dashed border-slate-200">
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
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
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
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-slate-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Why Attendance Matters</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              This system powers a grade-level competition that increases student engagement and school spirit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Fair Competition</h3>
              <p className="text-slate-600 text-sm">
                Secure authentication ensures only legitimate students can check in, making the competition fair and verifiable.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E6EAF2] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600 text-sm">
                Mobile-first design with minimal steps means students can check in quickly without disrupting the game experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Secure & Private</h3>
              <p className="text-slate-600 text-sm">
                Industry-standard OAuth authentication protects student privacy while ensuring data integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- NEW: Footer Section for Google Verification --- */}
      <footer className="bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500">
          <div className="flex justify-center gap-6 mb-2">
            <Link href="/privacy-policy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:joshuarobertramirez@gmail.com" className="hover:text-slate-800 transition-colors">
              Contact Us
            </a>
          </div>
          <p>
            &copy; {new Date().getFullYear()} The Horde Attendance System. A student-led project at The Episcopal School of Dallas.
          </p>
        </div>
      </footer>
    </div>
  );
}