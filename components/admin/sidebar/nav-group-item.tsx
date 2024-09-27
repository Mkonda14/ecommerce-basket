import { CgAdd } from "react-icons/cg"; 
import { IconType } from "react-icons/lib";
import { NavItem, NavItemProps } from "./nav-item";



import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface NavGroupItemProps{
    isGroup?: boolean;
    nofif?: number;
    label: string;
    icon: IconType;
    subHref?: string;
    items?: Array<NavItemProps>
}

export const NavGroupItem = ({label, icon: Icon, subHref, items, isGroup, nofif}: NavGroupItemProps) => {

    if(!isGroup){
        return (
            <NavItem label={label} icon={Icon} href={subHref} notif={nofif}  />
        )
    }
    return (
        <div>
            <Accordion type="single" collapsible className="w-full shadow-none">
                <AccordionItem value="item-1" className="border-none">
                    <Button variant={"outline"} className="flex gap-x-4 w-full shadow-none border-none py-6 text-slate-600" asChild>
                        <AccordionTrigger>
                            <span> <Icon className="w-6 h-6" /> </span>
                            <div className="flex items-center justify-between flex-grow">
                                <div className="flex-grow text-left text-base">{label}</div>
                                {subHref && <Link href={subHref}> <CgAdd className="w-5 h-5" /> </Link>}
                            </div>
                        </AccordionTrigger>
                    </Button>
                    <AccordionContent className="flex h-full">
                        <div className="pl-10">
                            {items?.map((item)=>(
                            <NavItem key={item.label} {...item} />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
        </Accordion>
        </div>
    )
}
