"use client"

import { ItemAccordeon } from "./item-accordeon"
import { CheckboxLabel } from "./checkbox-label"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CategoryTheme } from "@prisma/client"
import { getCategoryThemes } from "@/actions/category-attribut"
import { useFilters } from "@/hooks/use-store"


export const AccordeonCategoryTheme = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const queryKey = ["category-themes"]

    const {data: dbCategories} = useQuery<CategoryTheme[]>({
        queryKey: queryKey,
        queryFn: ()=> getCategoryThemes(),
    })

    const updatedCategories =  useFilters((state)=> state.updatedCategoryThemes);

    useEffect(()=>{
       (async()=>{
            console.log(categories);
       })()     
    }, [categories]);

    return (
        <ItemAccordeon
            idx={2}
            label="category themes"
        >
            {dbCategories?.map(({id, name, globalName}) => (
                <CheckboxLabel
                    key={id}
                    value={id}
                    label={`${globalName}/${name}`}
                    onChange={setCategories}
                    values={categories}
                    updated={updatedCategories}
                />
            ))}
        </ItemAccordeon>
    )
}
