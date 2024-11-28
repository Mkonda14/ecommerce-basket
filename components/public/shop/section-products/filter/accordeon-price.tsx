"use client"

import { ItemAccordeon } from "./item-accordeon"

import { useState } from "react"
import { useFilters } from "@/hooks/stores/use-filter-store"
import { SliderDouble } from "./slider-double/slider-double"


export const AccordeonPrice = () => {
    const [price, setPrice] = useState<{min: number, max: number}>({
        min: 0,
        max: 200
    });

    const updatedPrice =  useFilters.use.updatedCategoryPrice();

    return (
        <ItemAccordeon
            idx={5}
            label="Price min to max"
        >
            <div className="w-full">
                <SliderDouble
                    mMax={{min: 35, max:200}}
                    value={price}
                    onChange={setPrice}
                    updated={updatedPrice}
                />
            </div>
        </ItemAccordeon>
    )
}
