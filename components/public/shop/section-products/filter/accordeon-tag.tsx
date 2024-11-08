"use client"

import { ItemAccordeon } from "./item-accordeon"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { TagSneaker } from "@prisma/client"
import { getTagSneakers } from "@/actions/category-attribut"
import { useFilters } from "@/hooks/use-store"
import { CheckboxTag } from "./checkbox-tag"


export const AccordeonTag = () => {
    const [tags, setTags] = useState<string[]>([]);
    const queryKey = ["tag-sneakers"]

    const {data: dbTags} = useQuery<TagSneaker[]>({
        queryKey: queryKey,
        queryFn: ()=> getTagSneakers(),
    })

    const updatedTags =  useFilters((state)=> state.updatedTagSneakers);

    useEffect(()=>{
       (async()=>{
            console.log(tags);
       })()     
    }, [tags]);

    return (
        <ItemAccordeon
            idx={6}
            label="Tag sneakers"
        >
            <div className="grid grid-cols-4 gap-2">
                {dbTags?.map(({id, name}) => (
                    <CheckboxTag
                        key={id}
                        value={id}
                        label={name}
                        onChange={setTags}
                        values={tags}
                        updated={updatedTags}
                    />
                ))}
            </div>
        </ItemAccordeon>
    )
}
