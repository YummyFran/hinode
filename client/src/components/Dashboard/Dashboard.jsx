"use client"

import { getAuthUser, logout } from "@/lib/authService"
import { useRouter } from "next/navigation"
import AuthNavbar from "../Navbar/AuthNavbar"
import AuthLayout from "@/app/(authenticated)/layout"

export default function Dashboard({ token }) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout(token)
    router.push("/") // ⬅️ Redirect to homepage
  }

  return (
    <AuthLayout>
      Dashboard
    </AuthLayout>
  )
}
