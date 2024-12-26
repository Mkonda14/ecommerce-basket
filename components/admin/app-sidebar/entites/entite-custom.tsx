

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { ChevronDown, PencilIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { MdOutlineCategory } from 'react-icons/md'

export const EntiteCustom = () => {
    return (
        <Collapsible className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <PencilIcon />
                        <span>Custom</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <Link href={"/admin/customs/dashboard"}>Dashboard</Link>
                                </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <Link href={"/admin/customs"}>Customs</Link>
                                </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <Link href={"/admin/customs/add"}>Add</Link>
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
                                                    <Link href={"/admin/customs/categories/dashboard"}>Dashboard</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton>
                                                    <Link href={"/admin/customs/categories"}>Catégories</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton>
                                                    <Link href={"/admin/customs/categories/add"}>Add</Link>
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
