'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Confetti from 'react-confetti'

export default function SuccessClient() {
  const [isCelebrating, setIsCelebrating] = useState(true)

  useEffect(() => {
    // Stop confetti after 6 seconds
    const timer = setTimeout(() => {
      setIsCelebrating(false)
    }, 9000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      {isCelebrating && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 0}
          height={typeof window !== 'undefined' ? window.innerHeight : 0}
          numberOfPieces={300}
          recycle={false}
          gravity={0.1}
          colors={['#4299E1', '#F56565', '#63B3ED', '#FC8181', '#E2E8F0', '#ECC94B']}
        />
      )}
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
          Enjoy the game!
        </p>
      </div>
    </div>
    </>
  )
}
