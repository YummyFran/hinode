"use client"

import { getAuthUser, logout } from "@/lib/authService"
import { useRouter } from "next/navigation"

export default function Dashboard({ token }) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout(token)
    router.push("/") // ⬅️ Redirect to homepage
  }

  return (
    <div>
        Dashboard
        <button onClick={handleLogout} className="bg-accent-gradient py-2 px-4">Log out</button>
        <button onClick={async () => console.log(await getAuthUser(token))} className="bg-accent-gradient py-2 px-4">Log user</button>
    </div>
  )
}
