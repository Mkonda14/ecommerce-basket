

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, intensiteColor } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface CheckboxColorProps{
    code?: string;
    name?: string;
    onChange: Dispatch<SetStateAction<string[]>>;
    values?: string[];
    updated: (name: string[]) => void;
}

export const CheckboxColor = ({code, values=[], onChange, updated, name=""}: CheckboxColorProps) => {
    const isChecked = values.includes(name);
    const strokeColor = intensiteColor(code) ? "stroke-slate-800" : "stroke-white";
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <label 
                        style={{
                            backgroundColor: code
                        }}
                        className={cn("hover:ring-[1px] ring-offset-2 rounded-full shadow-lg")} 
                        htmlFor={`${code}`}
                    >
                        <input 
                            id={`${code}`}
                            className="hidden" 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={(checked) => {
                                return checked.target.checked
                                ? onChange((state)=> {
                                    const values = [...state, name];
                                    updated(values);
                                    return values;
                                } )  
                                : onChange((state)=> {
                                    const values = state.filter((val) => val !== name);
                                    updated(values);
                                    return values;
                                })
                            }}
                        />
                        {/* svg */}
                        <svg  
                            className={cn("svg-check-none rounded-full p-[11px] transition-all duration-300", strokeColor)} 
                            style={{
                                strokeLinecap: "round",
                                strokeDasharray: 45,
                                strokeDashoffset: isChecked ? 0 : 45,
                                backgroundColor: code,
                                fill: "none",
                                strokeWidth: '.2rem'
                            }}
                            height="45" 
                            width="45"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </label>
                </TooltipTrigger>
                <TooltipContent>
                    <ul>
                        <li>Color name : <span className="font-bold">{name}</span></li>
                    </ul>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
    )
}
