import { PropsWithChildren } from "react";

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SelectFamilyContextProvider } from "@/hooks/context/useSelectFamilyContext";
import { FamilyService } from "@/services/FamilyService";

export default async function Layout( { children } : Readonly<PropsWithChildren> ) {

  const user = await getKindeServerSession().getUser()

  const families = await FamilyService.getAll( user.id );

  return (
      <SelectFamilyContextProvider family={ families[0] ?? {} }>
        <SidebarProvider>
          <AppSidebar families={ families } />
          <SidebarInset>
            <header
                className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4 ">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            { children }
          </SidebarInset>
        </SidebarProvider>
      </SelectFamilyContextProvider>
  )
}
