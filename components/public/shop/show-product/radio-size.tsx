import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, sizes } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

import {v4 as uuidv4} from "uuid";

interface CheckboxSizeProps{
    size: number;
    onChange: Dispatch<SetStateAction<number | undefined>>;
    value?: number;
}

export const RadioSize = ({size, value, onChange}: CheckboxSizeProps) => {
    const isChecked = value === size;
    const {usHomme, usFemme, RU, UE} = sizes(size);
    const idxUnique = uuidv4();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={isChecked ? "default" : "outline"} asChild>
                        <label 
                            className={cn("relative !w-20 h-10 cursor-pointer")} 
                            htmlFor={`${idxUnique}`}
                        >
                            <input 
                                id={`${idxUnique}`}
                                className="hidden" 
                                type="radio"
                                name={"size"} 
                                checked={isChecked}
                                onChange={(checked) => {
                                    return checked.target.checked
                                    && onChange(size)      
                                }}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">EU {size}</span>
                        </label>
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
