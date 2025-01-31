"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Family } from "@prisma/client"
import { useSelectFamilyContext } from "@/hooks/context/useSelectFamilyContext"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export function TeamSwitcher({ families } : Readonly<{ families : Family[] }>) {
  const { isMobile } = useSidebar()
  const { handleSelectFamily } = useSelectFamilyContext();

  const selectedFamily = families.length > 0 ? families[0] : { name: "Pessoa Solitária" } as Family

  const [activeTeam, setActiveTeam] = React.useState(selectedFamily)

  const auth = useKindeAuth();

  return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                </div>
                <ChevronsUpDown className="ml-auto"/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Famílias
              </DropdownMenuLabel>
              {families?.map((family) => (
                  <Link key={family.id} href={`/dashboard/${auth?.user?.id}/family/${family.id}`}>
                    <DropdownMenuItem
                        onClick={() => {
                          setActiveTeam(family);
                          handleSelectFamily(family);
                        }}
                        className="gap-2 p-2"
                    >
                      {family.name}
                    </DropdownMenuItem>
                  </Link>
              ))}
              <DropdownMenuSeparator/>
              <Link href={`${auth?.user?.id}/family/create`}>
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4"/>
                  </div>
                  <div className="font-medium text-muted-foreground">Criar Família</div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
  )
}
