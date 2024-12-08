"use client"

import * as React from "react"
import {
  Box,
  GalleryVerticalEnd,
  Plus,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {TeamSwitcher} from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Gabrielly Alves Figueira",
    email: "m@example.com",
    avatar: "https://gravatar.com/avatar/a46df0fa2bbb73a7d9470d148db8f7b9?s=400&d=robohash&r=x",
  },
  teams: [
    {
      name: "Família Alves Figueira",
      logo: GalleryVerticalEnd,
      plan: "Family",
    },
  ],
  navMain: [
    {
      title: "Estoque",
      url: "/dashboard/inventory",
      icon: Box,
      isActive: true,
      items: [
        {
          title: "Criar Item",
          url: "/dashboard/inventory/create-inventory-item",
        },
        {
          title: "Modificar Quantidade",
          url: "/dashboard/inventory/modify-quantity",
        },{
          title: "Deletar Item",
          url: "/dashboard/inventory/delete",
        },
      ],
    },
    {
      title: "Em breve",
      url: "#",
      icon: Plus,
      items: [],
    },
  ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <TeamSwitcher teams={data.teams}/>
      </SidebarHeader>
      <SidebarContent  className="bg-white">
        <NavMain items={data.navMain}/>
      </SidebarContent>
      <SidebarFooter  className="bg-white">
        <NavUser user={data.user}/>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
