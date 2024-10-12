"use client"

import Link from "next/link";


import { Typographie } from "./typographie";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BtnLike } from "./card-product/btn-like";
import { LogoSneaker } from "./logo-sneaker";
import { CardImg } from "./card-product/card-img";

export interface CardProductProps{
    marque: string;
    model: string;
    description?: string;
    price: string;
    public_id: string;
}

export const CardProduct = ({marque, model, price, public_id}: CardProductProps) => {


    return (     
        <article className="w-[245px] h-[400px] bg-slate-400">               
            <figure className="relative">
                <div className="w-full absolute z-10">
                    <div className="w-full flex justify-between items-center p-2 py-1">
                        <LogoSneaker marque={marque} />
                        <BtnLike />
                    </div>
                </div>
                <div className="">
                    <CardImg 
                        public_id={public_id}
                        alt={model} 
                    />
                </div>
            </figure>
            <div className="p-2 bg-white">
                <div className="flex gap-x-2">
                    <Typographie component="h3" variant="p">{model || "AIR STRUCTURE"}</Typographie>
                    <Typographie component="h3" variant="p" className="font-semibold">19</Typographie>
                    <Badge className="rounded-sm py-0 text-xs">new</Badge>
                </div>
                <div className="space-x-2 mb-2">
                    {Array.from({length: 2}, (_, idx)=>(
                        <span key={idx} className="uppercase text-xs">running</span>
                    ))}
                </div>
                
                <Typographie component="h4" variant="h4" size="sm" className="text-xs mb-1">SIZE</Typographie>
                <div className="space-x-4 mb-2">
                    {Array.from({length: 5}, (_, idx)=>(
                        <span key={idx} className="text-sm font-light">{idx + 7}</span>
                    ))}
                </div>

                <Typographie component="h4" variant="h4" size="sm" className="text-xs mb-5">COLOR SECONDARY</Typographie>
                <div className="w-full flex items-center justify-between gap-x-4 relative">
                    <div className="flex flex-1 items-center gap-x-4">
                        {Array.from({length: 3}, (_, idx)=>(
                            <span key={idx} className="h-5 w-5 text-emerald-700 bg-emerald-700 hover:ring-[1px] ring-current  ring-offset-2 rounded-full"></span>
                        ))}
                    </div>
                    <Button className="absolute top-1/2 -translate-y-1/2 -right-4">
                        <Link href={"#"} className="space-x-2">
                            <span className="font-light">USD</span>
                            <span className="font-bold">{price || "23,433"}</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </article>        
    )
}
