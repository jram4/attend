'use client'

import { CheckCircle2 } from 'lucide-react'

export default function SuccessClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Main Icon */}
        <div className="mb-8">
          <CheckCircle2
            size={120}
            className="text-blue-600 drop-shadow-lg"
            strokeWidth={1.5}
          />
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          You're Checked In!
        </h1>

        {/* Secondary Message */}
        <p className="text-lg text-gray-700 mb-4 leading-relaxed max-w-sm">
          Thank you for showing your school spirit. Enjoy the game!
        </p>
      </div>
    </div>
  )
}
