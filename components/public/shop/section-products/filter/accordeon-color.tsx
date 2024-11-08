"use client"

import { ItemAccordeon } from "./item-accordeon"

import { useEffect, useState } from "react"
import { useFilters } from "@/hooks/use-store"
import { CheckboxColor } from "./checkbox-color"
import { getColorPrimaries } from "@/actions/product"
import { useQuery } from "@tanstack/react-query"


export const AccordeonColor = () => {
    const [colors, setColors] = useState<string[]>([]);
    const queryKey = ["sneaker-colors"]

    const {data: dbColors} = useQuery<({name: string, code: string} | undefined)[]>({
        queryKey: queryKey,
        queryFn: ()=> getColorPrimaries(),
    })

    const updatedColors =  useFilters((state)=> state.updatedCategoryColors);

    useEffect(()=>{
       (async()=>{
            console.log(colors);
       })()     
    }, [colors]);

    return (
        <ItemAccordeon
            idx={4}
            label="Colors primary"
        >
            <div className="grid grid-cols-6 gap-2">
                {dbColors?.map((item, idx)=>(
                    <CheckboxColor
                        key={idx}
                        code={item?.code}
                        name={item?.name}
                        values={colors}
                        onChange={setColors}
                        updated={updatedColors}
                    />
                ))}
            </div>
        </ItemAccordeon>
    )
}
