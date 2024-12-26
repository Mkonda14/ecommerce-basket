"use client"

import { getLastCustoms } from "@/actions/public-actions/home";
import { CardProduct } from "../../card-product"
import { Typographie } from "../../typographie"
import { Button } from "../../ui/button";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { BsChevronRight } from "react-icons/bs";
import { TtransToCardCustom } from "@/actions/translate";


export interface ISneaker {
    id: string;
    slug: string;
    marque: string;
    model: string;
    price: number;
    promoPrice: number;
    isPromo: boolean;
    stock: number;
    colorSecondaries: {
        name: string,
        color: string
    }[];
    sizes: {
        size: number,
        quantity: number
    }[];
    tags: {
       name: string
    }[];
    images: {
      publicId: string
    }[];
}


export const  DernierCreations = () => {

    const iCustoms: TtransToCardCustom[] = [];

    const queryKey = ["customs", "last-customs"];
    const {data: customs} = useQuery<TtransToCardCustom[]>({
        queryKey: queryKey,
        queryFn: ()=> getLastCustoms(),
        initialData: iCustoms,
    })

    return (
        <section className="container px-2 mt-8">
            <Typographie component="h3" variant="h3" size="lg">Nos derniers créations</Typographie>
            <section className="w-full grid grid-cols-4 gap-4 py-6">
                {customs.map((custom)=>(
                    <CardProduct 
                        key={custom?.id} 
                        slug={custom?.slug || ""}
                        id={custom?.id}
                        marque={custom?.sneaker.marque} 
                        model={custom?.sneaker.model} 
                        price={custom?.price || 0.0} 
                        reducprice={custom?.reducprice} 
                        publicId={custom?.image || ""}
                        sizes={custom?.sizes}
                        colorSecondaries={custom?.colorSecondaries}
                        isPromo={custom?.sneaker.isPromo} 
                        reduction={custom?.sneaker.reduction}
                        tags={custom?.sneaker.tags}
                        isCustomByGraffiti={custom?.sneaker.isCustomByGraffiti}
                    />
                ))}
            </section>
            <div className="w-full flex justify-end">
                <Button variant={"link"} className="font-bold text-xl text-emerald-500 p-0" asChild>
                    <Link className="flex items-center gap-x-4" href="#"><span>Browse all presentations</span> <BsChevronRight className="w-5 h-4 mt-1" /> </Link>
                </Button>
            </div>
        </section>
    )
}
