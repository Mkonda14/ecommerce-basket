import { AiFillCheckCircle } from "react-icons/ai"; 
import { BsCart4 } from "react-icons/bs"; 
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Typographie } from "@/components/typographie";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useUpdatedBasket } from "@/hooks/use-store";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { basketModal } from "@/actions/product/basket";
import { BasketItem } from "./basket-item";

type sneakers = {
    model: string;
    id: string;
    marque: string;
    price: number;
    promoPrice: number;
    isPromo: boolean;
    images: {
        publicId: string;
    }[];
}[]

export const BtnCart = () => {
    const length = useUpdatedBasket((state)=> state.length);
    const {getBasket} = useLocalStorage("customers_sneaker_basket")
    const [sneakers, setSneakers] = useState<sneakers>([]);
    const [lengthBasket, setLengthBasket] = useState<number>();
    useEffect(()=>{
        const baskets = getBasket();
        setLengthBasket(baskets.length);
        const ids = baskets.map(basket=>basket.id);
        basketModal(ids)
            .then((res)=> setSneakers(res));
        
    }, [getBasket])

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={"#"} className="flex items-center gap-x-2">
                    <Button size={"icon"}> <BsCart4 /> </Button>
                    <div className="">
                        <Typographie component="h4" variant="h4" size="md">SHOPPING CART</Typographie>
                        <Typographie component="p" variant="p" size="sm">{lengthBasket} Shoes - USD</Typographie>
                    </div>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-96">
                <div className="p-3 space-y-4">
                    <div className="flex gap-x-4">
                        <AiFillCheckCircle className="size-6 text-emerald-500" />
                        <Typographie component="h4" variant="h4" size="md">Ajouté au panier</Typographie>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        {sneakers.map((sneaker)=>(
                            <BasketItem 
                                key={sneaker.id}
                                publicId={sneaker.images[0].publicId}
                                {...sneaker}
                                size={45}
                            />
                        ))}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
