// app/[gameId]/success-client.tsx

'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Confetti from 'react-confetti'

interface Props {
  userName: string
}

export default function SuccessClient({ userName }: Props) {
  const [isClient, setIsClient] = useState(false)
  const [isCelebrating, setIsCelebrating] = useState(true)

  // This effect runs only once on the client after the component mounts
  useEffect(() => {
    setIsClient(true) // Set isClient to true once we are in the browser

    const timer = setTimeout(() => {
      setIsCelebrating(false)
    }, 9000)

    return () => clearTimeout(timer)
  }, []) // Empty dependency array ensures it runs only once on mount

  return (
    <>
      {/* Conditionally render Confetti only on the client */}
      {isClient && isCelebrating && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            recycle={false}
            gravity={0.1}
            colors={['#4299E1', '#F56565', '#63B3ED', '#FC8181', '#E2E8F0', '#ECC94B']}
          />
        </div>
      )}
      
      <div className="relative min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex flex-col items-center justify-center px-6 py-12">
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
            You're Checked In,
          </h1>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {userName}!
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