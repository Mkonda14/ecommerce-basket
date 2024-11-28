import { AiOutlineClose } from "react-icons/ai"; 
import { CldImgDynamic } from "@/components/cld-img-dynamic"
import { Typographie } from "@/components/typographie";
import { DialogChangeSize } from "./dialog-change-size";
import { InputIncrement } from "./input-item";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useUpdatedBasket } from "@/hooks/stores/use-basket-store";
import { useState } from "react";


interface ICartItem{
    model: string;
    id: string;
    marque: string;
    price: number;
    promoPrice: number;
    isPromo: boolean;
    size: number;
    sizes: {size: number, quantity: number}[]
    quantity: number;
    images: {publicId: string}[];
}

export const CartItem = ({model, id, marque, promoPrice, isPromo, size, quantity, images, price, sizes}: ICartItem) => {

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
                <CldImgDynamic size="card-basket-max" publicId={images[0].publicId} />
            </figure>
            <div className="flex-1 flex justify-between items-center relative">
                <div className="flex flex-col">
                    <Typographie component="h3" variant="h3" size="lg">{marque}</Typographie>
                    <Typographie component="p" variant="p" size="md" className="text-muted-foreground text-xl">{model}</Typographie>

                    <Typographie component="h4" variant="h4" size="md"  className="space-x-3 text-xl">
                        {(isPromo && promoPrice) && <span>{promoPrice}$</span>}
                        <span className={isPromo ? "line-through text-slate-400" : ""}>{price}$</span>
                    </Typographie>

                    <Typographie component="p" variant="p" size="md" className="text-xl">
                        <span>Taille/ Pointure</span> 
                        <DialogChangeSize 
                            size={size} 
                            price={price}
                            isPromo={isPromo}
                            promoPrice={promoPrice}
                            marque={marque}
                            model={model}
                            sneakerId={id} 
                            sizes={sizes} 
                            publicId={images[0].publicId} 
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
                    {(isPromo && promoPrice) ? (<span>{promoPrice * quantity}$</span>)
                    : (<span className={isPromo ? "line-through text-slate-400" : ""}>{price * qt}$</span>)}
                </Typographie>

                <Button variant={"destructive"} size={"icon"} className="absolute top-0 right-0" onClick={onDelete}>
                    <AiOutlineClose />
                </Button>
            </div>
        </article>
    )
}
