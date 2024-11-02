

import {
    Sidebar,
  } from "@/components/ui/sidebar"
import { AppSidebarContent } from "./app-sidebar/app-sideber-content"
import { AppSidebarHeader } from "./app-sidebar/app-sidebar-header"
import { AppSidebarFooter } from "./app-sidebar/app-sidebar-footer"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <AppSidebarHeader />
        <AppSidebarContent />
        <AppSidebarFooter />
      </Sidebar>
    )
  }
  