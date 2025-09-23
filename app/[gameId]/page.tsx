// import { createClient } from '@/lib/supabase/server' // Commented out for demo mode
import { GAMES } from '@/lib/game-config'
import CheckInClient from './check-in-client'
// import { checkInUser } from './actions' // Commented out for demo mode

interface PageProps {
  params: Promise<{ gameId: string }>
}

export default async function GamePage({ params }: PageProps) {
  const { gameId } = await params

  // DEMO MODE: Live Supabase authentication calls are commented out for demo purposes
  // const supabase = await createClient()
  // const { data: { session } } = await supabase.auth.getSession()
  const session = null

  // DEMO MODE: Live check-in calls are commented out for demo purposes
  // let checkInResult = null
  // if (session) {
  //   checkInResult = await checkInUser(gameId)
  // }
  const checkInResult = null

  const game = GAMES.find(g => g.id === gameId)

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Game Not Found</h1>
          <p className="text-gray-600">The requested game could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <CheckInClient
      game={game}
      session={session}
      checkInResult={checkInResult}
      showHeader={true}
    />
  )
}
