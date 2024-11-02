

import { Calendar,Inbox, LayoutDashboard, Settings } from "lucide-react"

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";


import Link from "next/link";
import { EntiteSneaker } from "./entites/entite-sneaker";
import { EntiteTheme } from "./entites/entite-theme";

// Menu items.
const items = [
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebarContent() {
  return (
        <SidebarContent>

            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={"#"}>
                                        <LayoutDashboard />
                                        <span>{"Dashboard"}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={"#"}>
                                        <Inbox />
                                        <span>{"Inbox"}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />
            
            <SidebarGroup>
            <SidebarGroupLabel>Entités</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <EntiteSneaker />                    
                    <EntiteTheme />                    
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>
  )
}
