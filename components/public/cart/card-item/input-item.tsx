"use client"

import { IoMdAdd } from "react-icons/io"; 
import { RiDeleteBackLine } from "react-icons/ri"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-localstorage";

interface InputIncrementProps{
    quantity: number;
    isDisabled?: boolean;
    max: number;
    size: number;
    basketId: string;
    onChange: Dispatch<SetStateAction<number>>;
}

type TDasabled = {
    subtract?: boolean,
    added?: boolean
}

export const InputIncrement = ({quantity: qt, basketId, max, size, onChange: setQt}: InputIncrementProps) => {
    
    const [disabled, setDisabled] = useState<TDasabled>();
    const {subtractQuantity, addedQuantity} = useLocalStorage("customers_sneaker_baskets")

    useEffect(() => {
        if(qt === 1){setDisabled((state)=> ({...state, subtract: true}))}
        else{setDisabled((state)=> ({...state, subtract: false}))}

        if(qt === max){setDisabled((state)=> ({...state, added: true}))}
        else{setDisabled((state)=> ({...state, added: false}))}
    },[qt, max]);

    const onChangeQty = (operation: string) => {
        if(operation === 'subtract') {
            setQt((state)=> state > 1 ? state - 1 : state)
            subtractQuantity(basketId, size)
        }
        else{
            setQt((state)=> state < max ? state + 1 : state)
            addedQuantity(basketId, size, max)
        }
    };

    return (
        <div className="flex">
            <Button 
                size={"icon"}
                disabled={disabled?.subtract}
                onClick={()=>onChangeQty("subtract")}
            >
                <RiDeleteBackLine />
            </Button>
            <Input 
                disabled={disabled?.added || disabled?.subtract} 
                value={qt}
                pattern="^[0-9]*$"
                min={1} 
                max={max} 
                className="w-20 text-center" 
            />
            <Button 
                size={"icon"}
                disabled={disabled?.added}
                onClick={()=>onChangeQty("added")}
            >
                <IoMdAdd />
            </Button>
        </div>
    )
}
