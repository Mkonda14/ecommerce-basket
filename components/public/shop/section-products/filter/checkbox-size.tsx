import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, sizes } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface CheckboxSizeProps{
    value: number;
    onChange: Dispatch<SetStateAction<number[]>>;
    values?: number[];
    updated: (value: number[]) => void;
}

export const CheckboxSize = ({value, values=[], onChange, updated}: CheckboxSizeProps) => {
    const isChecked = values.includes(value);
    const {usHomme, usFemme, RU, UE} = sizes(value);
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={isChecked ? "default" : "outline"} asChild>
                        <label 
                            className={cn("relative")} 
                            htmlFor={`${value}`}
                        >
                            <input 
                                id={`${value}`}
                                className="hidden" 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={(checked) => {
                                    return checked.target.checked
                                    ? onChange((state)=> {
                                        const values = [...state, value];
                                        updated(values);
                                        return values;
                                    } )  
                                    : onChange((state)=> {
                                        const values = state.filter((val) => val !== value);
                                        updated(values);
                                        return values;
                                    })
                                }}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{value}</span>
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
