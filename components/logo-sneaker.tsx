import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

import { BiBasketball } from "react-icons/bi"; 
import { SiNewbalance } from "react-icons/si"; 
import { SiPuma } from "react-icons/si"; 
import { CgAdidas } from "react-icons/cg"; 
import { SiNike } from "react-icons/si"; 

interface LogoSneakerProps{
    marque: string;
    className?: string;
}

export const LogoSneaker = ({marque, className}: LogoSneakerProps) => {
    let Icon : IconType;

    switch (marque.toUpperCase()) {
        case "NIKE":
            Icon = SiNike;
            break;
        case "ADIDAS":
            Icon = CgAdidas;
            break;
        case "PUMA":
            Icon = SiPuma;
            break;
        case "NEW BALANCE":
            Icon = SiNewbalance;
            break;
        default:
            Icon = BiBasketball
            break;
    }
    return (
        <Icon className={cn("h-8 w-8", className)} />
    )
}
