

"use client"

import { ItemAccordeon } from "./item-accordeon"

import { useEffect, useState } from "react"
import { useFilters } from "@/hooks/use-store"
import { SliderDouble } from "./slider-double/slider-double"


export const AccordeonPrice = () => {
    const [price, setPrice] = useState<{min: number, max: number}>({
        min: 0,
        max: 1000
    });

    const updatedPrice =  useFilters((state)=> state.updatedCategoryPrice);

    useEffect(()=>{
       (async()=>{
            console.log(price);
       })()     
    }, [price]);

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
