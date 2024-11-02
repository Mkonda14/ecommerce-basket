import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { ChevronDown, Gem, Tag } from "lucide-react"
import Link from "next/link"
import { MdOutlineCategory } from "react-icons/md"


export const EntiteSneaker = () => {
    return (
        <Collapsible className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <Gem />
                        <span>Sneaker</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                    <Link href={"/admin/products/dashboard"}>Dashboard</Link>
                                </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                    <Link href={"/admin/products"}>
                                        <span>Products</span>
                                        <SidebarMenuBadge>24</SidebarMenuBadge>
                                    </Link>
                                </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                    <Link href={"/admin/products/add"}>Add</Link>
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
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={"/admin/categories/dashboard"}>Dashboard</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={"/admin/categories"}>Catégories</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={"/admin/categories/add"}>Add</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuSubItem>
                        </Collapsible>
                        {/* -- */}
                        <Collapsible  className="group/collapsible">
                            <SidebarMenuSubItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <Tag />
                                        <span>Tag</span>
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={"/admin/tags/dashboard"}>Dashboard</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={"/admin/tags"}>Tags</Link>
                                                </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={"/admin/tags/add"}>Add</Link>
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
