"use client"

import { getProductCardDerniers } from "@/actions/product";
import { CardProduct } from "../card-product"
import { Typographie } from "../typographie"
import { Button } from "../ui/button";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";


interface ISneaker {
    id: string;
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
        <section className="container px-2">
            <Typographie component="h3" variant="h3" size="lg">Nos derniers créations</Typographie>
            <section className="w-full grid grid-cols-4 gap-40 py-6">
                {sneakers.map(({id, model, marque, price, images, sizes, colorSecondaries, isPromo, promoPrice, tags})=>(
                    <CardProduct 
                        key={id} 
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
                <Button variant={"link"} asChild>
                    <Link className="text-xl text-emerald-500" href={"#"}>Load more</Link>
                </Button>
            </div>
        </section>
    )
}
