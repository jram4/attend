import { createClient } from '@/lib/supabase/server'
import SuccessClient from '../success-client'

export const dynamic = 'force-dynamic'

export default async function CheckedInPage({
  params,
}: {
  params: { gameId: string }
}) {
  const supabase = createClient()

  console.log('Supabase client created:', !!supabase)
  console.log('Supabase auth exists:', !!supabase?.auth)

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="text-7xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication failed
          </h1>
          <p className="text-lg text-gray-700">
            Please try again.
          </p>
        </div>
      </div>
    )
  }

  // Console log user details for verification
  console.log('User ID:', user.id)
  console.log('User Email:', user.email)
  console.log('User Full Name:', user.user_metadata?.full_name)

  // Extract user name (prefer full_name, fallback to email)
  const userName = user.user_metadata?.full_name || user.email || 'User'

  return <SuccessClient userName={userName} />
}
