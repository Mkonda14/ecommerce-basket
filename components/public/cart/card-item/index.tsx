"use client"

import { AiOutlineClose } from "react-icons/ai"; 
import { CldImgDynamic } from "@/components/cld-img-dynamic"
import { Typographie } from "@/components/typographie";
import { DialogChangeSize } from "./dialog-change-size";
import { InputIncrement } from "./input-item";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useUpdatedBasket } from "@/hooks/stores/use-basket-store";
import { useState } from "react";
import { TtransToCardCustom } from "@/actions/translate";
import { Badge } from "@/components/ui/badge";


type ICartItem = TtransToCardCustom &{
    size: number;
    quantity: number;
}

export const CartItem = ({id, sneaker,reducprice, size, quantity, image, price, sizes}: ICartItem) => {

    const {removeBasket} = useLocalStorage("customers_sneaker_baskets")
    const onUpdatedBasket = useUpdatedBasket.use.onUpdatedBasket();

    const [qt, setQt] = useState<number>(quantity)

    const onDelete = ()=> {
        const length = removeBasket({id, size});
        onUpdatedBasket(length);
    }

    return (
        <article className="w-full flex gap-x-4">
            <figure className="">
                <CldImgDynamic size="card-basket-max" publicId={image || ""} />
            </figure>
            <div className="flex-1 flex justify-between items-center relative">
                <div className="flex flex-col">
                    <Typographie component="h3" variant="h3" size="lg">{sneaker?.marque}</Typographie>
                    <Typographie component="p" variant="p" size="md" className="text-muted-foreground text-xl">{sneaker?.model}</Typographie>

                    <Typographie component="h4" variant="h4" size="md"  className="flex items-center gap-x-3 text-xl">
                        {(reducprice) && <span>{reducprice}$</span>}
                        <span className={reducprice ? "line-through text-slate-400" : ""}>{price}$</span>
                        {(reducprice) && <Badge className="bg-emerald-500">{sneaker.reduction}%</Badge>}
                    </Typographie>

                    <Typographie component="p" variant="p" size="md" className="text-xl">
                        <span>Taille/ Pointure</span> 
                        <DialogChangeSize 
                            size={size} 
                            price={price}
                            isPromo={sneaker?.isPromo}
                            promoPrice={reducprice}
                            marque={sneaker?.marque}
                            model={sneaker?.model}
                            sneakerId={id} 
                            sizes={sizes} 
                            publicId={image || ""} 
                        /> 
                    </Typographie>
                </div>

                <InputIncrement 
                    basketId={id} 
                    size={size}
                    max={sizes.find((sz)=> sz.size === size)?.quantity || 1} quantity={qt} 
                    onChange={setQt} 
                />

                <Typographie component="h4" variant="h4" size="md"  className="space-x-3 text-xl">
                    {(sneaker?.isPromo && reducprice) ? (<span>{reducprice * quantity}$</span>)
                    : (<span className={sneaker?.isPromo ? "line-through text-slate-400" : ""}>{price * qt}$</span>)}
                </Typographie>

                <Button variant={"destructive"} size={"icon"} className="absolute top-0 right-0" onClick={onDelete}>
                    <AiOutlineClose />
                </Button>
            </div>
        </article>
    )
}
