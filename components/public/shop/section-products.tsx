"use client"

import { Filter } from "./section-products/filter";
import { Paginations } from "./section-products/pagination";
import { Products } from "./section-products/products";
import { Sorts } from "./section-products/sorts";

import { useFilters } from "@/hooks/use-store"
import { useEffect, useState } from "react"
import { filterSneaker } from "@/actions/product/filter";
import { ISneaker } from "../home/section-dernier-creations";
import { usePathname, useSearchParams } from "next/navigation";


export const SectionProducts = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const data = useFilters((state) => state.data);
    const [products, setProducts] = useState<ISneaker[] | undefined>([]);
    const [total, setTotal] = useState<number | undefined>();

    useEffect(() => {
        const queryString = new URLSearchParams({ data: JSON.stringify(data) }).toString();  
        window.history.pushState(null, "", `?${queryString}`)
    }, [data]);

    useEffect(() => {
        const handleRouteChange = async () => {
            const params = new URLSearchParams(searchParams.toString());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newFilter: { [key: string]: any } = {};
            params.forEach((value, key) => {
                newFilter[key] = JSON.parse(value);
            });
            const resultat = await filterSneaker(newFilter.data);
            setProducts(()=> resultat?.sneakers);
            setTotal(()=> resultat?.total);
        };
        handleRouteChange();
    }, [pathname, searchParams]);

    return (
        <section className="mt-8">
            <section className="container flex gap-x-4">
                <Filter />
                <section className="w-3/4 space-y-4">
                    <Sorts />
                    <Products products={products} />
                    <Paginations length={total} />
                </section>
            </section>
        </section>
    )
}
