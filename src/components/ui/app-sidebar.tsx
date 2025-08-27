"use client"

import { User, Cat, Warehouse, CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Manajemen Pelanggan",
    url: "/dashboard/customer",
    icon: User,
  },
  {
    title: "Manajemen Hewan",
    url: "/dashboard/animal",
    icon: Cat,
  },
  {
    title: "Manajemen Stok Barang",
    url: "/dashboard/inventory",
    icon: Warehouse,
  },
  {
    title: "Booking Layanan",
    url: "/dashboard/booking",
    icon: CalendarCheck,
  }
]

export default function AppSidebar() {
const router = useRouter();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="destructive" onClick={() => signOut(auth).then(() => router.push("/login"))}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}