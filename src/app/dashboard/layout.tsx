"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/ui/app-sidebar"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login") // redirect kalau belum login
      }
      setLoading(false)
    })
    return () => unsub()
  }, [router])

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
