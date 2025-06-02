import AuthNavbar from "@/components/Navbar/AuthNavbar";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AuthNavbar />
      <main className="flex-1 overflow-y-auto min-h-screen ml-64">{children}</main>
    </div>
  )
}
