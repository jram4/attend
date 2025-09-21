'use server'

// DEMO MODE: All Supabase-related imports and functions are commented out for demo purposes
// import { createClient } from '@/lib/supabase/server'
// import { GAMES } from '@/lib/game-config'
// import { getGradeFromEmail } from '@/lib/grade-logic'

export async function checkInUser(_gameId: string) {
  // DEMO MODE: Live Supabase check-in logic is commented out for demo purposes
  // const supabase = await createClient()

  // // Get the current authenticated user
  // const { data: { user }, error: userError } = await supabase.auth.getUser()

  // if (userError || !user) {
  //   return {
  //     status: 'error',
  //     message: 'You must be logged in to check in.'
  //   } as const
  // }

  // // Find the game configuration
  // const game = GAMES.find(g => g.id === gameId)

  // if (!game) {
  //   return {
  //     status: 'error',
  //     message: 'Game not found.'
  //   } as const
  // }

  // // Validate time window
  // const now = new Date()
  // const checkInStart = new Date(game.checkInStart)
  // const checkInEnd = new Date(game.checkInEnd)

  // if (now < checkInStart || now > checkInEnd) {
  //   return {
  //     status: 'error',
  //     message: 'The check-in window is not open.'
  //   } as const
  // }

  // // Get the user's grade from their email
  // const userGrade = getGradeFromEmail(user.email!)

  // try {
  //   // Insert the attendance record
  //   const { error: insertError } = await supabase
  //     .from('attendance')
  //     .insert({
  //       user_id: user.id,
  //       user_email: user.email,
  //       user_grade: userGrade,
  //       game_id: gameId
  //     })

  //   if (insertError) {
  //     throw insertError
  //   }

  //   return {
  //     status: 'success',
  //     message: 'You are checked in!'
  //   } as const
  // } catch (error: unknown) {
  //   // Handle unique constraint violation (user already checked in)
  //   if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
  //     return {
  //       status: 'already-checked-in',
  //       message: 'You have already checked in for this game.'
  //     } as const
  //   }

  //   // Handle other database errors
  //   return {
  //     status: 'error',
  //     message: 'An error occurred while checking in. Please try again.'
  //   } as const
  // }

  // DEMO MODE: Return null to trigger demo mode in CheckInClient
  return null
}
