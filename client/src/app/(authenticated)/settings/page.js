import LogoutBtn from '@/components/Settings/LogoutBtn'
import { cookies } from 'next/headers'
import React from 'react'

const Settings = async () => {

    const cookieStore = cookies()
    const token = (await cookieStore).get('auth_token')?.value

  return (
    <>
        Settings
        <LogoutBtn token={token} />
    </>
  )
}

export default Settings