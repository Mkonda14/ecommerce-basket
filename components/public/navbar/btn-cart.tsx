import { AiFillCheckCircle } from "react-icons/ai"; 
import { BsCart4 } from "react-icons/bs"; 
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Typographie } from "@/components/typographie";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useUpdatedBasket } from "@/hooks/stores/use-basket-store";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { basketModal } from "@/actions/product/basket";
import { BasketItem } from "./basket-item";

type TSneaker = {
    model: string;
    id: string;
    marque: string;
    price: number;
    promoPrice: number;
    isPromo: boolean;
    size: number;
    quantity: number;
    images: {
        publicId: string;
    }[];
}

export const BtnCart = () => {
    const length = useUpdatedBasket.use.length();
    const {getBasket} = useLocalStorage("customers_sneaker_baskets")
    const [sneaker, setSneaker] = useState<TSneaker | undefined>();
    const [lengthBasket, setLengthBasket] = useState<number>();
    useEffect(()=>{
        const baskets = getBasket();
        setLengthBasket(baskets.length);
        
        const lastBasket = baskets.pop();
        if(lastBasket){
            basketModal(lastBasket?.id)
                .then((res)=> {
                    if(!res) return;
                    setSneaker({...res, ...lastBasket})
                });
        }
        
    }, [length])

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={"/cart"} className="flex items-center gap-x-2">
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
                    <div className="my-2">
                        {sneaker && (
                            <BasketItem 
                                {...sneaker}
                                size={sneaker?.size}
                                publicId={sneaker?.images[0]?.publicId || ""}
                                quantity={sneaker?.quantity}
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Button variant={"outline"} size={"lg"} className="text-lg p-5" asChild>
                            <Link href="/cart">Afficher le panier ({lengthBasket})</Link>
                        </Button>
                        <Button size={"lg"} className="text-lg p-5" asChild>
                            <Link href="#">Paiement</Link>
                        </Button>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
