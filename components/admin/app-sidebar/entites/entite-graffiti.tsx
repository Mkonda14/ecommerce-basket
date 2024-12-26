

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { ChevronDown, SprayCan } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { MdOutlineCategory } from 'react-icons/md'

export const EntiteGraffiti = () => {
    return (
        <Collapsible className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <SprayCan />
                        <span>Graffiti</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <Link href={"/admin/graffitis/dashboard"}>Dashboard</Link>
                                </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <Link href={"/admin/graffitis"}>Graffitis</Link>
                                </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <Link href={"/admin/graffitis/add"}>Add</Link>
                                </SidebarMenuSubButton>
                        </SidebarMenuSubItem>

                        {/* -- */}

                        <Collapsible  className="group/collapsible">
                            <SidebarMenuSubItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <MdOutlineCategory />
                                        <span>Category</span>
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton>
                                                    <Link href={"/admin/graffitis/categories/dashboard"}>Dashboard</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton>
                                                    <Link href={"/admin/graffitis/categories"}>Catégories</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton>
                                                    <Link href={"/admin/graffitis/categories/add"}>Add</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuSubItem>
                        </Collapsible>

                        {/* -- */}


                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}
