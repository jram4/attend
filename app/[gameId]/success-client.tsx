'use client'

type Props = {
  onDone: () => void
}

export default function SuccessClient({ onDone }: Props) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md h-[60vh] rounded-[28px] border border-emerald-200 bg-emerald-50/90 shadow-xl backdrop-blur flex flex-col items-center justify-center text-emerald-800 p-6 text-center">
        <div className="text-7xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">You're Checked In!</h2>
        <p className="text-sm opacity-90 mb-6">Thank you for participating. Enjoy the game!</p>
      </div>
    </div>
  )
}
