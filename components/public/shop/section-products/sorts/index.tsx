"use client"

import { AiOutlineSortDescending } from "react-icons/ai"; 
import { BsSortNumericUp } from "react-icons/bs"; 
import { BsSortNumericDown } from "react-icons/bs"; 

import { AiOutlineSortAscending } from "react-icons/ai"; 
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useFilters } from "@/hooks/use-store";

export const Sorts = () => {
    const [sort, setSort] = useState<{alphabet: "asc" | "desc", price:  "asc" | "desc"}>({
        price: "asc",
        alphabet: "asc"
    })
    const updatedSorts =  useFilters((state)=> state.updatedSorts);

    return (
        <section className="w-full flex justify-end items-center gap-x-4">
            <Button className="flex gap-x-4" onClick={()=>{
                const res = sort.alphabet === "asc" ? "desc" : "asc";
                setSort((state)=> ({price: state.price, alphabet: res}))
                updatedSorts({alphabet: res, price: sort.price})
            }}>
                <span>Alphabet</span>
                {sort.alphabet === "asc" ? 
                    (<AiOutlineSortAscending />) : (<AiOutlineSortDescending />)
                }
            </Button>
            <Button className="flex gap-x-4" onClick={()=>{
                const res = sort.price === "asc" ? "desc" : "asc";
                setSort((state)=> ({alphabet: state.alphabet, price: res}))
                updatedSorts({price: res, alphabet: sort.alphabet})
            }}>
                <span>Price</span>
                {sort.price === "asc" ? 
                    (<BsSortNumericDown />) : (<BsSortNumericUp />)
                }
            </Button>
        </section>
    )
}
