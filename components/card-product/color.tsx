
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils";

interface ColorProps{
    color: string;
    name: string;
}

export const Color = ({name, color }: ColorProps) => {

    const ring = `ring-[${color}]`;

    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="outline" className="w-7 h-7 flex justify-center items-center rounded-full p-0" asChild>
                <span style={{
                    backgroundColor: color
                }} className={cn("h-7 w-7 hover:ring-[1px] ring-offset-2 rounded-full", ring)}></span>
            </Button>
            </TooltipTrigger>
            <TooltipContent>
                <ul>
                    <li>name - color : <span className="font-bold">{name}</span></li>
                </ul>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    )
}
