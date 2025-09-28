// app/[gameId]/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { GAMES } from '@/lib/game-config'
import { getGradeFromEmail } from '@/lib/grade-logic'

export async function checkInUser(gameId: string) {
  const supabase = await createClient()

  // 1. Get the current authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Check-in failed: User not authenticated.');
    return {
      status: 'error',
      message: 'You must be logged in to check in.'
    } as const
  }

  // 2. Find the game configuration
  const game = GAMES.find(g => g.id === gameId)
  if (!game) {
    console.error(`Check-in failed: Game not found for id "${gameId}".`);
    return {
      status: 'error',
      message: 'Game not found.'
    } as const
  }

  // 3. (Optional but recommended) Validate the time window
  const now = new Date()
  const checkInStart = new Date(game.checkInStart)
  const checkInEnd = new Date(game.checkInEnd)

  if (now < checkInStart || now > checkInEnd) {
    console.warn(`Check-in attempt outside of window for user ${user.email}.`);
    return {
      status: 'error',
      message: 'The check-in window for this game is not currently open.'
    } as const
  }

  // 4. Determine the user's grade
  const userGrade = await getGradeFromEmail(user.email!)

  // 5. Attempt to insert the attendance record into the database
  try {
    const { error: insertError } = await supabase
      .from('attendance')
      .insert({
        user_id: user.id,
        user_email: user.email,
        user_grade: userGrade,
        game_id: gameId,
      })

    // If there's an error during insert, throw it to be caught below
    if (insertError) {
      throw insertError
    }

    console.log(`Successful check-in for ${user.email} for game ${gameId}.`);
    return {
      status: 'success',
      message: 'You are checked in!'
    } as const

  } catch (error: any) {
    // 6. Handle specific errors, like duplicate check-ins
    // PostgreSQL unique constraint violation code is '23505'
    if (error.code === '23505') {
      console.log(`Duplicate check-in attempt by ${user.email} for game ${gameId}.`);
      return {
        status: 'already-checked-in',
        message: 'You have already checked in for this game.'
      } as const
    }

    // Handle any other database errors
    console.error('Generic database error during check-in:', error);
    return {
      status: 'error',
      message: 'A database error occurred. Please try again.'
    } as const
  }
}
