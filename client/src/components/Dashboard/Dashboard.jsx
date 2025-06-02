
import AuthLayout from "@/app/(authenticated)/layout"
import Projects from "@/app/(authenticated)/projects/page"

export default function Dashboard() {


  return (
    <AuthLayout>
      <Projects />
    </AuthLayout>
  )
}
