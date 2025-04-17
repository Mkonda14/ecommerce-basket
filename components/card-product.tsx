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
import { BiEdit } from "react-icons/bi";


export interface CardProductProps{
    id?: string;
    slug: string;
    marque?: string;
    model?: string;
    description?: string;
    price: number;
    reducprice?: number;
    publicId: string;
    colorSecondaries?: {name: string, color: string}[];
    sizes?: {size: number, quantity: number}[];
    isPromo?: boolean;
    reduction?: number | null;
    tags?: {name: string}[],
    isCustomByGraffiti?: boolean;
}

export const CardProduct = ({
        id,
        slug,
        marque = 'Nike', 
        model = "Air force 1", 
        price, 
        publicId, 
        reducprice,
        sizes = [], 
        colorSecondaries = [], 
        isPromo, 
        reduction,
        isCustomByGraffiti,
        tags = [],
    }: CardProductProps) => {
    
    return (     
        <article className={`${"w-full"} shadow-sm rounded-md relative`}>    
            <BtnLike sneakerId={id}  />
            
            <Link href={`/shop/${slug}`}>
                <figure className="relative">
                    <div className="w-full absolute z-10">
                        <div className="w-full flex justify-between items-center p-2 py-2">
                            <LogoSneaker marque={marque} />
                        </div>
                    </div>
                    <div className="">
                        <CldImgDynamic 
                            publicId={publicId}
                            size={"card-sneaker"}
                            alt={model}
                        />
                    </div>
                </figure>
                <div className="p-2 bg-white">
                    <div className="flex items-center gap-x-2">
                        <Typographie component="h3" variant="h3" size="lg" className="capitalize">{model.slice(0, 17) || "AIR STRUCTURE"}</Typographie>
                        {reduction ? <Badge className="bg-emerald-500">{reduction}%</Badge> : null}                       
                    </div>
                    <div className="flex gap-x-4">
                        <div className="space-x-2 mb-4">
                            {tags.map((tag, idx)=>(
                                <span key={idx} className="uppercase text-sm">{tag.name}</span>
                            ))}                        
                        </div>
                        {isCustomByGraffiti && (
                            <span className=""><BiEdit className="size-6 text-emerald-500" /></span>
                        )}
                    </div>
                    
                    <Typographie component="h4" variant="h4" size={"md"} className="mb-2">SIZES</Typographie>
                    <div className="flex gap-x-4 mb-4 relative">
                        {sizes.slice(0, 7).map((size, idx)=>(
                            <Size key={idx} size={size.size} />
                        ))} 
                        {sizes.length >= 7 && (
                            <span className="absolute top-1/2 right-2 w-7 h-7 flex justify-center items-center p-2 border rounded-sm">
                                <span>+ {sizes.length - 7}</span>
                            </span>
                        )}                       
                    </div>

                    <Typographie component="h4" variant="h4" size={"md"} className="mb-5">COLOR SECONDARY</Typographie>
                    <div className="w-full flex items-center justify-between gap-x-4 relative mb-4">
                        <div className="flex flex-1 items-center gap-x-4">                            
                            {colorSecondaries.map((color, idx)=>(
                                <Color key={idx} {...color} />
                            ))}               
                        </div>
                        {/* Price */}
                        <Price price={price} isPromo={isPromo} reducprice={reducprice} />
                    </div>
                </div>
            </Link>           
        </article>        
    )
}
