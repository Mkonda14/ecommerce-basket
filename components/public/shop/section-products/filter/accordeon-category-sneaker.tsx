"use client"

import { ItemAccordeon } from "./item-accordeon"
import { CheckboxLabel } from "./checkbox-label"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CategorySneaker } from "@prisma/client"
import { getCategorySneakers } from "@/actions/category-attribut"
import { useFilters } from "@/hooks/use-store"


export const AccordeonCategorySneaker = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const queryKey = ["category-sneakers"]

    const {data: dbCategories} = useQuery<CategorySneaker[]>({
        queryKey: queryKey,
        queryFn: ()=> getCategorySneakers(),
    })

    const updatedCategories =  useFilters((state)=> state.updatedCategorySneakers);

    return (
        <ItemAccordeon
            idx={1}
            label="Category sneakers"
        >
            {dbCategories?.map(({id, name}) => (
                <CheckboxLabel
                    key={id}
                    value={id}
                    label={name}
                    onChange={setCategories}
                    values={categories}
                    updated={updatedCategories}
                />
            ))}
        </ItemAccordeon>
    )
}
