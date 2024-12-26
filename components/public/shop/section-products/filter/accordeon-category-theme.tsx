"use client"

import { ItemAccordeon } from "./item-accordeon"
import { CheckboxLabel } from "./checkbox-label"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CategoryTheme } from "@prisma/client"
import { getCategoryThemes } from "@/actions/theme/category"
import { useFilters } from "@/hooks/stores/use-filter-store"


export const AccordeonCategoryTheme = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const queryKey = ["category-themes"]

    const {data: dbCategories} = useQuery<CategoryTheme[]>({
        queryKey: queryKey,
        queryFn: ()=> getCategoryThemes(),
    })

    const updatedCategories =  useFilters.use.updatedCategoryThemes();

    return (
        <ItemAccordeon
            idx={2}
            label="category themes"
        >
            {dbCategories?.map(({id, name, secondName}) => (
                <CheckboxLabel
                    key={id}
                    value={id}
                    label={`${secondName}/${name}`}
                    onChange={setCategories}
                    values={categories}
                    updated={updatedCategories}
                />
            ))}
        </ItemAccordeon>
    )
}
