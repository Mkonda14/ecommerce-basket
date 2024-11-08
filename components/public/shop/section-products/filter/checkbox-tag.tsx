
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface CheckboxSizeProps{
    value: string;
    label: string;
    onChange: Dispatch<SetStateAction<string[]>>;
    values?: string[];
    updated: (value: string[]) => void;
}

export const CheckboxTag = ({value, values=[], onChange, updated, label}: CheckboxSizeProps) => {
    const isChecked = values.includes(value);
    return (
        <label 
            className={cn("relative p-3 border rounded-md text-center cursor-pointer", isChecked ? "bg-slate-900 text-white" : "")} 
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
            <span className="capitalize text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{label}</span>
        </label>
        
    )
}
