"use client"

import { ItemAccordeon } from "./item-accordeon"

import { useState } from "react"
import { useFilters } from "@/hooks/stores/use-filter-store"
import { CheckboxSize } from "./checkbox-size"


export const AccordeonSize = () => {
    const [sizes, setSizes] = useState<number[]>([]);

    const updatedSizes =  useFilters.use.updatedCategorySizes();

    return (
        <ItemAccordeon
            idx={3}
            label="Sizes"
        >
            <div className="grid grid-cols-6 gap-2">
                {Array.from({length: 15}).map((item, idx)=>(
                    <CheckboxSize
                        key={idx}
                        value={idx + 36}
                        values={sizes}
                        onChange={setSizes}
                        updated={updatedSizes}
                    />
                ))}
            </div>
        </ItemAccordeon>
    )
}
