import { BsCart4 } from "react-icons/bs"; 
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Typographie } from "@/components/typographie";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CalendarDays } from "lucide-react";

export const BtnCart = () => {
  return (
    <HoverCard>
        <HoverCardTrigger asChild>
            <Link href={"#"} className="flex items-center gap-x-2">
                <Button size={"icon"}> <BsCart4 /> </Button>
                <div className="">
                    <Typographie component="h4" variant="h4" size="md">SHOPPING CART</Typographie>
                    <Typographie component="p" variant="p" size="sm">2 Shoes - 240 USD</Typographie>
                </div>
            </Link>
        </HoverCardTrigger>
        <HoverCardContent align="end" className="w-80">
            <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                    </p>
                    <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            Joined December 2021
                        </span>
                    </div>
                </div>
            </div>
        </HoverCardContent>
    </HoverCard>
  )
}
