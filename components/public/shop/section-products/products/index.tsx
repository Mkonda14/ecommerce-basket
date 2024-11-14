"use client"

import { CardProduct } from "@/components/card-product";
import { ISneaker } from "@/components/public/home/section-dernier-creations"
import { Typographie } from "@/components/typographie";

interface ProductsProps{
    products?: ISneaker[];
}

export const Products = ({products}: ProductsProps) => {
   
    return (
        <section className="min-h-40 flex justify-center items-center">
            {!products?.length ? (
                <div className="h-full flex flex-col justify-center items-center gap-y-2 text-center">
                    <Typographie component="h3" variant="h3" size="lg">Aucun product trouver</Typographie>
                    <Typographie component="p" variant="p" size="md">veuillez patiente jusqu{"'"}à la fin du chargement ou <br /> veuillez essayer d{"'"}autre filtres </Typographie>
                </div>
            ) :(
                <section className="w-full grid grid-cols-3 gap-4 py-4">
                {products.map(({id, model, marque, price, images, sizes, colorSecondaries, isPromo, promoPrice, tags})=>(
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
            )}
        </section>
    )
}
