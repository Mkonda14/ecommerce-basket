"use client"

import { Typographie } from "./typographie";
import { Badge } from "./ui/badge";
import { BtnLike } from "./card-product/btn-like";
import { LogoSneaker } from "./logo-sneaker";
import { Price } from "./card-product/price";
import { Size } from "./card-product/size";
import { Color } from "./card-product/color";
import Link from "next/link";
import { CldImgDynamic } from "./cld-img-dynamic";


export interface CardProductProps{
    id?: string;
    marque: string;
    model: string;
    description?: string;
    price: number;
    public_id: string;
    colorSecondaries?: {name: string, color: string}[];
    sizes?: {size: number, quantity: number}[];
    isPromo?: boolean;
    promoPrice?: number;
    tags?: {name: string}[]
}

export const CardProduct = ({
        id,
        marque, 
        model, 
        price, 
        public_id, 
        sizes = [], 
        colorSecondaries = [], 
        isPromo, 
        promoPrice,
        tags = []
    }: CardProductProps) => {
    

    return (     
        <article className={`${"w-full"} shadow-sm rounded-md relative`}>    
            <BtnLike sneakerId={id}  />
            <Link href={`/show/${id}`}>
                <figure className="relative">
                    <div className="w-full absolute z-10">
                        <div className="w-full flex justify-between items-center p-2 py-2">
                            <LogoSneaker marque={marque} />
                        </div>
                    </div>
                    <div className="">
                        <CldImgDynamic 
                            publicId={public_id}
                            size={"card-sneaker"}
                            alt={model}
                        />
                    </div>
                </figure>
                <div className="p-2 bg-white">
                    <div className="flex items-center gap-x-2">
                        <Typographie component="h3" variant="h3" size="lg" className="capitalize">{model || "AIR STRUCTURE"}</Typographie>
                        {tags?.find(tag => tag.name.toLowerCase() === "new") && <Badge className="rounded-sm py-0 px-1 text-sm uppercase">new</Badge>}                        
                    </div>
                    <div className="space-x-2 mb-4">
                        {tags.map((tag, idx)=>(
                            <span key={idx} className="uppercase text-sm">{tag.name}</span>
                        ))}                        
                    </div>
                    
                    <Typographie component="h4" variant="h4" size={"md"} className="mb-2">SIZES</Typographie>
                    <div className="flex gap-x-4 mb-4">
                        {sizes.map((size, idx)=>(
                            <Size key={idx} size={size.size} />
                        ))}                        
                    </div>

                    <Typographie component="h4" variant="h4" size={"md"} className="mb-5">COLOR SECONDARY</Typographie>
                    <div className="w-full flex items-center justify-between gap-x-4 relative mb-4">
                        <div className="flex flex-1 items-center gap-x-4">                            
                            {colorSecondaries.map((color, idx)=>(
                                <Color key={idx} {...color} />
                            ))}               
                        </div>
                        {/* Price */}
                        <Price price={price} isPromo={isPromo} promoPrice={promoPrice} />
                    </div>
                </div>
            </Link>           
        </article>        
    )
}
