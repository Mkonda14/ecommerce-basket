"use client"

import { TtransToCardCustom } from "@/actions/translate";
import { CardProduct } from "@/components/card-product";
import { Typographie } from "@/components/typographie";

interface ProductsProps{
    customs?: TtransToCardCustom[];
}

export const Products = ({customs}: ProductsProps) => {

    return (
        <section className="min-h-40 flex justify-center items-center">
            {!customs?.length ? (
                <div className="h-full flex flex-col justify-center items-center gap-y-2 text-center">
                    <Typographie component="h3" variant="h3" size="lg">Aucun product trouver</Typographie>
                    <Typographie component="p" variant="p" size="md">veuillez patiente jusqu{"'"}à la fin du chargement ou <br /> veuillez essayer d{"'"}autre filtres </Typographie>
                </div>
            ) :(
                <section className="w-full grid grid-cols-3 gap-4 py-4">
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
            )}
        </section>
    )
}
