'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/store/authSlice'

export default function ReduxHydrate({ user, token }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuth({ user, token }))
  }, [dispatch, user, token])

  return null
}
