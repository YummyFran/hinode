import { getAuthUser } from "@/lib/authService";
import { cookies } from "next/headers";
import Landing from "@/components/Landing/Landing";
import Dashboard from "@/components/Dashboard/Dashboard";

export default async function Home() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('auth_token')?.value
  const {success} = await getAuthUser(token)
  
  return (
    <div className="min-h-screen">
      {success ?
        <Dashboard token={token} /> :
        <Landing />
      }
    </div>
  );
}
