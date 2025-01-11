'use client'
import * as React from "react"
import {
  Box,
  Plus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Family } from "@prisma/client"
import { useSelectFamilyContext } from "@/hooks/context/useSelectFamilyContext"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & { families: Family[] }) {
  const { selectedFamily } = useSelectFamilyContext();

  const data = {
    user: {
      name: "Gabrielly Alves Figueira",
      email: "m@example.com",
      avatar: "https://gravatar.com/avatar/a46df0fa2bbb73a7d9470d148db8f7b9?s=400&d=robohash&r=x",
    },
    navMain: [
      {
        title: "Estoque",
        url: "/dashboard/inventory",
        icon: Box,
        isActive: true,
        items: [
          {
            title: "Criar Item",
            url: `/dashboard/family/${selectedFamily.id}/inventory/create-inventory-item`,
          },
          {
            title: "Modificar Quantidade",
            url: `/dashboard/family/${selectedFamily.id}/inventory/modify-quantity`,
          }, {
            title: "Deletar Item",
            url: `/dashboard/family/${selectedFamily.id}/inventory/delete`,
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <TeamSwitcher families={props.families} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
