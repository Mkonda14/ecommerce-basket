"use client"

import Image from "next/image";
import Link from "next/link";


import { Typographie } from "./typographie";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BtnLike } from "./card-product/btn-like";
import { LogoSneaker } from "./logo-sneaker";

export interface CardProductProps{
    marque: string;
    model: string;
    description: string;
    price: string;
    imgUrl: string;
}

export const CardProduct = ({marque, model, description, price, imgUrl}: CardProductProps) => {


    return (     
        <article>               
            <figure className="relative">
                <div className="absolute z-10">
                    <div className="flex justify-between items-center">
                        <LogoSneaker marque={marque} />
                        <BtnLike />
                    </div>
                    <Typographie component="h2" variant="h3">{model}</Typographie>
                    <Typographie component="p" variant="p">{description}</Typographie>
                </div>
                <div className="">
                    <Image
                        src={imgUrl || "/assets/imgs/example-img-card.jpg"} 
                        className="object-cover aspect-square" 
                        alt={model} 
                        width={150}
                        height={200}
                    />
                </div>
            </figure>
            <div className="p-4 bg-white">
                <div className="flex gap-x-4">
                    <Typographie component="h3" variant="p">{model}</Typographie>
                    <Typographie component="h3" variant="p" className="font-semibold">{19}</Typographie>
                    <Badge className="rounded-sm">new</Badge>
                </div>
                <div className="space-x-4">
                    {Array.from({length: 2}, (_, idx)=>(
                        <span key={idx} className="uppercase">tag {idx + 1}</span>
                    ))}
                </div>
                
                <Typographie component="h3">{price}</Typographie>

                <Typographie component="h4" variant="h4" size="sm">SIZE</Typographie>
                <div className="space-x-4">
                    {Array.from({length: 5}, (_, idx)=>(
                        <span key={idx} className="uppercase">{idx + 7}</span>
                    ))}
                </div>

                <Typographie component="h4" variant="h4" size="sm">COLOR SECONDARY</Typographie>
                <div className="flex items-center gap-x-4">
                    <div className="flex flex-1 items-center gap-x-4">
                        {Array.from({length: 3}, (_, idx)=>(
                            <span key={idx} className="h-4 w-4 bg-emerald-700 hover:ring ring-current rounded-full"></span>
                        ))}
                    </div>
                    <Button>
                        <Link href={"#"}>VIEW MORE</Link>
                    </Button>
                </div>
            </div>
        </article>        
    )
}
