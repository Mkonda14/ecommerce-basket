"use client"

import { getProductCustom } from "@/actions/public-actions/custom";
import { useQuery } from "@tanstack/react-query";
import { CardCustom } from "./card-custom";

export const SectionProductCustoms = () => {

    const queryKey = ["sneaker-customizations"];

    const {data: sneakers} = useQuery({
        queryKey: queryKey,
        queryFn: ()=> getProductCustom()
    })

    return (
        <section className="w-full grid grid-cols-4 gap-4 py-4">
            {sneakers?.map((sneaker)=> (
                <CardCustom
                    key={sneaker.id}
                    {...sneaker}
                />
            ))}
        </section>
    )
}
