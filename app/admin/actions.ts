'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_COOKIE_NAME = 'admin-auth'
const ADMIN_COOKIE_VALUE = 'authenticated'
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 hours in seconds

export async function adminLogin(formData: FormData) {
  try {
    const password = formData.get('password') as string
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      throw new Error('Admin password not configured')
    }

    if (!password || password !== adminPassword) {
      throw new Error('Invalid password')
    }

    // Set secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'strict'
    })

    redirect('/admin')
  } catch (error) {
    console.error('Admin login error:', error)
    // On error, redirect back to admin with error
    redirect('/admin?error=auth')
  }
}

export async function adminLogout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(ADMIN_COOKIE_NAME)
    redirect('/admin')
  } catch (error) {
    console.error('Admin logout error:', error)
    redirect('/admin')
  }
}
