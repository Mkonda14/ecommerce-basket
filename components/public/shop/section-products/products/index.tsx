"use client"

import { useFilters } from "@/hooks/use-store"
import { useEffect } from "react"

export const Products = () => {
    const data =  useFilters((state)=> state.data);
    useEffect(()=>{
        console.log(data);
    }, [data])
    return (
        <section className="grid grid-cols-3 gap-4">

        </section>
    )
}
