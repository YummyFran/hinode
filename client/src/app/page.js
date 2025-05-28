"use client"

import { useSelector } from 'react-redux'
import Landing from "@/components/Landing/Landing";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function Home() {
  const user = useSelector(state => state.auth.user)
  const success = user?.success
  console.log("user", user)
  return (
    <div className="min-h-screen">
      {success ?
        <Dashboard /> :
        <Landing />
      }
    </div>
  );
}
