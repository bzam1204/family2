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
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

// This is sample data.

export function AppSidebar( { ...props } : React.ComponentProps<typeof Sidebar> & { families : Family[] } ) {
  const { selectedFamily } = useSelectFamilyContext();
  const auth = useKindeAuth()

  const data = {
    user : {
      name : auth.user?.given_name ?? "",
      email : auth.user?.email ?? "",
      avatar : auth.user?.picture ?? "",
    },
    navMain : [
      {
        title : "Estoque",
        url : "/dashboard/inventory",
        icon : Box,
        isActive : true,
        items : [
          {
            title : "Itens",
            url : `/dashboard/${ auth?.user?.id }/family/${ selectedFamily.id }/inventory/items`,
          }, {
            title : "Criar Item",
            url : `/dashboard/${ auth?.user?.id }/family/${ selectedFamily.id }/inventory/create-inventory-item`,
          },
          {
            title : "Modificar Quantidade",
            url : `/dashboard/${ auth?.user?.id }/family/${ selectedFamily.id }/inventory/modify-quantity`,
          }, {
            title : "Deletar Item",
            url : `/dashboard/${ auth?.user?.id }/family/${ selectedFamily.id }/inventory/delete`,
          },
          {
            title : "Registro",
            url : `/dashboard/${ auth?.user?.id }/family/${ selectedFamily.id }/inventory/registry`
          }
        ],
      },
      {
        title : "Em breve",
        url : "#",
        icon : Plus,
        items : [],
      },
    ],
  }

  return (
      <Sidebar collapsible="icon" { ...props }>
        <SidebarHeader className="bg-white">
          <TeamSwitcher families={ props.families } />
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <NavMain items={ data.navMain } />
        </SidebarContent>
        <SidebarFooter className="bg-white">
          <NavUser user={ data.user } />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  )
}
