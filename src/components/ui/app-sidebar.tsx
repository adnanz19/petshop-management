import { User, Cat, Warehouse, CalendarCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
    </Sidebar>
  )
}