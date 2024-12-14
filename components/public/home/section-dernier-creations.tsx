"use client"

import { getProductCardDerniers } from "@/actions/public-actions/home";
import { CardProduct } from "../../card-product"
import { Typographie } from "../../typographie"
import { Button } from "../../ui/button";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { BsChevronRight } from "react-icons/bs";


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

    const iSneakers: ISneaker[] = [];

    const queryKey = ["sneakers"];
    const {data: sneakers} = useQuery<ISneaker[]>({
        queryKey: queryKey,
        queryFn: ()=> getProductCardDerniers(),
        initialData: iSneakers,
    })

    return (
        <section className="container px-2 mt-8">
            <Typographie component="h3" variant="h3" size="lg">Nos derniers créations</Typographie>
            <section className="w-full grid grid-cols-4 gap-4 py-6">
                {sneakers.map(({id, slug, model, marque, price, images, sizes, colorSecondaries, isPromo, promoPrice, tags})=>(
                    <CardProduct 
                        key={id} 
                        slug={slug}
                        id={id}
                        marque={marque} 
                        model={model} 
                        price={price} 
                        public_id={images[0]?.publicId}
                        sizes={sizes}
                        colorSecondaries={colorSecondaries}
                        isPromo={isPromo}
                        promoPrice={promoPrice}
                        tags={tags}
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
