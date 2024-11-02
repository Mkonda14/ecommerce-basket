"use client"


import { Typographie } from "./typographie";
import { Badge } from "./ui/badge";
import { BtnLike } from "./card-product/btn-like";
import { LogoSneaker } from "./logo-sneaker";
import { CardImg } from "./card-product/card-img";
import { Price } from "./card-product/price";
import { Size } from "./card-product/size";
import { Color } from "./card-product/color";
import Link from "next/link";
import { Button } from "./ui/button";


export interface CardProductProps{
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
    
    let isPreview: boolean = false;

    if(tags.length == 0 && colorSecondaries.length == 0) {
        isPreview = true;
    }

    return (     
        <article className={`${isPreview ? "w-[245px] h-[400px]" : "w-[350px]"} shadow-sm rounded-md relative`}>    
            <BtnLike />
            <Link href={"#"}>
                <figure className="relative">
                    <div className="w-full absolute z-10">
                        <div className="w-full flex justify-between items-center p-2 py-2">
                            <LogoSneaker marque={marque} />
                        </div>
                    </div>
                    <div className="">
                        <CardImg 
                            public_id={public_id}
                            alt={model}
                            isPreview={isPreview}
                        />
                    </div>
                </figure>
                <div className="p-2 bg-white">
                    <div className="flex gap-x-4">
                        {isPreview ? (
                            <>
                                <Typographie component="h3" variant="p">{model || "AIR STRUCTURE"}</Typographie>
                                <Typographie component="h3" variant="p" className="font-semibold">19</Typographie>
                                <Badge className="rounded-sm py-0 text-xs">new</Badge>
                            </>
                        ) : (
                            <>
                                <Typographie component="h3" variant="h3" size="lg" className="capitalize">{model || "AIR STRUCTURE"}</Typographie>
                                <Typographie component="h3" variant="h3" size="lg" className="font-semibold text-emerald-500">19</Typographie>
                                {tags?.find(tag => tag.name.toLowerCase() === "new") && <Badge className="rounded-sm py-0 text-sm uppercase">new</Badge>}
                            </>
                        )}
                        
                    </div>
                    <div className="space-x-2 mb-4">
                        {isPreview ? (
                                <>
                                    {Array.from({length: 2}, (_, idx)=>(
                                        <span key={idx} className="uppercase text-xs">running</span>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {tags.map((tag, idx)=>(
                                        <span key={idx} className="uppercase text-sm">{tag.name}</span>
                                    ))}
                                </>
                            )}
                        
                    </div>
                    
                    <Typographie component="h4" variant="h4" size={`${isPreview ? "sm": "md"}`} className="mb-2">SIZES</Typographie>
                    <div className="flex gap-x-4 mb-4">
                            {isPreview ? (
                                <>
                                     {Array.from({length: 5}, (_, idx)=>(
                                        <span key={idx} className="text-sm font-light">{idx + 7}</span>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {sizes.map((size, idx)=>(
                                        <Size key={idx} size={size.size} />
                                    ))}
                                </>
                            )}
                        
                    </div>

                    <Typographie component="h4" variant="h4" size={`${isPreview ? "sm": "md"}`} className="mb-5">COLOR SECONDARY</Typographie>
                    <div className="w-full flex items-center justify-between gap-x-4 relative mb-4">
                        <div className="flex flex-1 items-center gap-x-4">
                            {isPreview ? (
                                <>
                                    {Array.from({length: 3}, (_, idx)=>(
                                        <span key={idx} className="h-5 w-5 text-emerald-700 bg-emerald-700 hover:ring-[1px] ring-current  ring-offset-2 rounded-full"></span>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {colorSecondaries.map((color, idx)=>(
                                        <Color key={idx} {...color} />
                                    ))}
                                </>
                            )}
                            
                        </div>
                        {/* Price */}
                        {isPreview ? (
                            <Button className="absolute top-1/2 -translate-y-1/2 -right-4">
                                <Link href={"#"} className="space-x-2">
                                    <span className="font-light">USD</span>
                                    <span className="font-bold">{price || "23,433"}</span>
                                </Link>
                            </Button>
                        ) : (
                            <Price price={price} isPromo={isPromo} promoPrice={promoPrice} />
                        )}
                    </div>
                </div>
            </Link>           
        </article>        
    )
}
