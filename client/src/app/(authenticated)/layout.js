import AuthNavbar from "@/components/Navbar/AuthNavbar";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AuthNavbar />
      <main className="flex-1 overflow-y-auto p-4 h-[200vh] ml-64">{children}</main>
    </div>
  )
}
