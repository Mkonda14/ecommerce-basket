"use client"

import { ItemAccordeon } from "./item-accordeon"

import { useState } from "react"
import { useFilters } from "@/hooks/stores/use-filter-store"
import { CheckboxColor } from "./checkbox-color"
import { getColorPrimaries } from "@/actions/product"
import { useQuery } from "@tanstack/react-query"


export const AccordeonColor = () => {
    const [colors, setColors] = useState<string[]>([]);
    const queryKey = ["color-sneakers"]

    const {data: dbColors} = useQuery<({name: string, color: string})[]>({
        queryKey: queryKey,
        queryFn: ()=> getColorPrimaries(),
    })

    const updatedColors =  useFilters.use.updatedCategoryColors();

    return (
        <ItemAccordeon
            idx={4}
            label="Colors primary"
        >
            <div className="grid grid-cols-6 gap-2">
                {dbColors?.map((item, idx)=>(
                    <CheckboxColor
                        key={idx}
                        code={item.color}
                        name={item.name}
                        values={colors}
                        onChange={setColors}
                        updated={updatedColors}
                    />
                ))}
            </div>
        </ItemAccordeon>
    )
}
