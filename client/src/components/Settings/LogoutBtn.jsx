"use client"

import { logout } from '@/lib/authService'
import { clearAuth } from '@/store/authSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const LogoutBtn = ({ token }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await logout(token)
        dispatch(clearAuth())
        router.push("/") // ⬅️ Redirect to homepage
    }
  return (
    <button onClick={handleLogout} className='bg-accent px-4 py-2 rounded cursor-pointer'>Log out</button>
  )
}

export default LogoutBtn