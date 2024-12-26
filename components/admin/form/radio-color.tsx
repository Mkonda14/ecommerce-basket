'use client'

import { cn, intensiteColor } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface CheckboxColorProps{
    code?: string;
    name?: string;
    onChange: Dispatch<SetStateAction<string>>;
    value?: string;
    id: string;
    isEmpty?: boolean;
}

export const RadioColor = ({code, value, id, onChange, name="", isEmpty}: CheckboxColorProps) => {
    const isChecked = value === id;
    const strokeColor = intensiteColor(code) ? "stroke-slate-800" : "stroke-white";
    return (
            <label 
                style={{
                    backgroundColor: code
                }}
                className={cn(
                    "hover:ring-[1px] ring-offset-2 border rounded-sm shadow-sm",
                    isEmpty && "before:top-1/2 before:left-1/2 before:rotate-45 before:h-1 before:w-[70px] bg-black/80"
                )} 
                htmlFor={`${id}`}
            >
                <input 
                    id={`${id}`}
                    className="hidden" 
                    type="radio" 
                    disabled={isEmpty}
                    value={id}
                    name={name}
                    checked={isChecked}
                    onChange={(checked) => {
                        return checked.target.checked
                        && onChange(id)      
                    }}
                />
                {/* svg */}
                <svg  
                    className={cn("svg-check-none rounded-sm p-[11px] transition-all duration-300", strokeColor)} 
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
        
        
    )
}
