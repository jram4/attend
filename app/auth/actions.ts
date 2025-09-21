'use server'

// import { createClient } from '@/lib/supabase/server' // Commented out for demo mode
// import { revalidatePath } from 'next/cache' // Commented out for demo mode
// import { redirect } from 'next/navigation' // Commented out for demo mode
// import { headers } from 'next/headers' // Commented out for demo mode

export async function signIn(_gameId: string) {
  // DEMO MODE: Live Supabase authentication calls are commented out for demo purposes
  // const supabase = await createClient()
  // const origin = (await headers()).get('origin')

  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'azure',
  //   options: {
  //     redirectTo: `${origin}/auth/callback?next=/${gameId}`,
  //   },
  // })

  // if (error) {
  //   throw error
  // }

  // if (data.url) {
  //   redirect(data.url)
  // }
}

export async function signOut() {
  // DEMO MODE: Live Supabase sign-out calls are commented out for demo purposes
  // const supabase = await createClient()

  // const { error } = await supabase.auth.signOut()

  // if (error) {
  //   throw error
  // }

  // revalidatePath('/', 'layout')
  // redirect('/')
}
