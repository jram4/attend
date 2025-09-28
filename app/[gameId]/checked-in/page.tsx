// app/[gameId]/checked-in/page.tsx

import { createClient } from '@/lib/supabase/server'
import SuccessClient from '../success-client'
import { checkInUser } from '../actions'

export const dynamic = 'force-dynamic'

export default async function CheckedInPage({
  params,
}: {
  params: { gameId: string }
}) {
  // --- THE FIX IS HERE ---
  // Destructure gameId from params immediately.
  const { gameId } = params;

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-gray-600">You are not signed in. Please return to the check-in page.</p>
      </div>
    )
  }

  // ATTEMPT TO CHECK THE USER IN using the destructured variable
  const checkInResult = await checkInUser(gameId) // Use gameId here

  // Handle errors from the check-in action
  if (checkInResult.status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100 flex flex-col items-center justify-center text-center p-4">
        <div className="text-7xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-red-800 mb-2">Check-in Failed</h1>
        <p className="text-lg text-red-700">{checkInResult.message}</p>
      </div>
    )
  }

  // If successful or already checked in, show the success screen
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there'

  return <SuccessClient userName={userName} />
}
