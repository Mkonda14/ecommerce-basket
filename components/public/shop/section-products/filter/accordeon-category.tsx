"use client"

import { ItemAccordeon } from "./item-accordeon"
import { CheckboxLabel } from "./checkbox-label"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CategorySneaker } from "@prisma/client"
import { getCategorySneakers } from "@/actions/category-attribut"


export const AccordeonCategory = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const queryKey = ["category-sneakers"]

    const {data: dbCategories} = useQuery<CategorySneaker[]>({
        queryKey: queryKey,
        queryFn: ()=> getCategorySneakers(),
    })
    return (
        <ItemAccordeon
            idx={1}
            label="Categories"
        >
            {dbCategories?.map(({id, name}) => (
                <CheckboxLabel
                    key={id}
                    value={id}
                    label={name}
                    onChange={setCategories}
                    values={categories}
                />
            ))}
        </ItemAccordeon>
    )
}
