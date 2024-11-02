
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { sizes } from "@/lib/utils";

interface SizeProps{
    size: number;
}

export const Size = ({size}: SizeProps) => {

    const {usHomme, usFemme, RU, UE} = sizes(size);

    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="outline" className="w-7 h-7 flex justify-center items-center p-0">
                <span>{size}</span>
            </Button>
            </TooltipTrigger>
            <TooltipContent>
                <ul>
                    <li>US - Homme : <span className="font-bold">{usHomme}</span></li>
                    <li>US - Femme : <span className="font-bold">{usFemme}</span></li>
                    <li>R.-U. : <span className="font-bold">{RU}</span></li>
                    <li>UE : <span className="font-bold">{UE}</span></li>
                </ul>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    )
}
