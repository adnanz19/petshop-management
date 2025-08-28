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
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
      <SidebarHeader className="flex items-center justify-center mt-4">
        <Image src="/logopetshop.svg" alt="Logo" width={200} height={100} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Logout</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>
                Apa kamu yakin ingin logout?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Batal</Button>
              </DialogClose>
              <Button variant="destructive" onClick={() => signOut(auth).then(() => router.push("/login"))}>
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  )
}