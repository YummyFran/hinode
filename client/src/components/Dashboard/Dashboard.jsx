"use client"

import { getAuthUser, logout } from "@/lib/authService"
import { useRouter } from "next/navigation"
import AuthNavbar from "../Navbar/AuthNavbar"
import AuthLayout from "@/app/(authenticated)/layout"
import Projects from "@/app/(authenticated)/projects/page"

export default function Dashboard({ token }) {
  const router = useRouter()

  return (
    <AuthLayout>
      <Projects />
    </AuthLayout>
  )
}
