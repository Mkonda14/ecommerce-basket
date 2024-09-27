import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons/lib";

export interface NavItemProps{
    label: string;
    icon?: IconType;
    notif?: number;
    href?: string;
}

export const NavItem = ({label, icon: Icon, notif, href="#"}: NavItemProps) => {
  return (
    <Button variant={"outline"} className="w-full shadow-none border-none text-left py-6 text-slate-600" asChild>
        <Link href={href} className="flex items-center gap-x-4">
            {Icon && <span> <Icon className="h-6 w-6" /></span>} 
            <div className="flex items-center justify-between flex-grow">
                <div className="flex-grow text-base">{label}</div>   
                {notif && 
                    <span className={cn("px-1 rounded-sm font-semibold", notif >= 4 ? " bg-emerald-200": " bg-orange-200" )}>
                      {notif}
                    </span>}      
            </div> 
        </Link>
    </Button>
  )
}
