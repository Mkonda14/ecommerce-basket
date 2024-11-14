"use client"

import { IoMdAdd } from "react-icons/io"; 
import { RiSubtractFill } from "react-icons/ri"; 

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";

interface InputIncrementProps{
    quantity: number;
    onChange: Dispatch<SetStateAction<number>>;
    isDisabled?: boolean;
    max: number;
}

export const InputIncrement = ({quantity, onChange, max, isDisabled}: InputIncrementProps) => {
    return (
        <div className="flex">
            <Button 
                size={"icon"}
                disabled={isDisabled}
                onClick={()=>{
                    onChange((state)=> state > 1 ? state - 1 : state)
                    console.log(quantity);
                    
                }}
            >
                <RiSubtractFill />
            </Button>
            <Input 
                disabled={isDisabled} 
                value={quantity}
                min={1} 
                max={max} 
                className="w-20 text-center" 
            />
            <Button 
                size={"icon"}
                disabled={isDisabled}
                onClick={()=>{
                    onChange((state)=> state < max ? state + 1 : state)
                    console.log(quantity);
                }}
            >
                <IoMdAdd />
            </Button>
        </div>
    )
}
