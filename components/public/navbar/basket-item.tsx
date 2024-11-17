import { AiOutlineClose } from "react-icons/ai"; 
import { Typographie } from "@/components/typographie";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useUpdatedBasket } from "@/hooks/use-store";
import { CldImgDynamic } from "@/components/cld-img-dynamic";

interface IBasketItem{
    id: string;
    publicId: string;
    marque: string;
    model: string;
    price: number;
    size?: number;
    quantity?: number;
    isPromo?: boolean;
    promoPrice?: number;
}

export const BasketItem = ({id, publicId, marque, model, size, price, isPromo, promoPrice, quantity=1}: IBasketItem) => {
    const {removeBasket} = useLocalStorage("customers_sneaker_basket");
    const updatedBasket = useUpdatedBasket((state)=> state.onUpdatedBasket)

    const onDelete = ()=>{
        const length = removeBasket({id, size});
        updatedBasket(length);
    }
    return (
        <article className="flex gap-x-4 relative border-b">
            <figure>
                <CldImgDynamic
                    publicId={publicId}
                    size="crsl-min"
                    alt={`image ${marque} / ${model}`}
                />
            </figure>

            <div className="">
                <Typographie component="p" variant="p" size="md" className="font-bold">{marque}</Typographie>
                <Typographie component="p" variant="p" size="sm" className="text-slate-600">{model}</Typographie>
                <Typographie component="p" variant="p" size="sm" className="text-slate-600">Taille EU {size}</Typographie>
                <Typographie component="h4" variant="h4" size="sm"  className="space-x-3">
                    {(isPromo && promoPrice) && <span>{promoPrice * quantity}</span>}
                    <span className={isPromo ? "line-through text-slate-400" : ""}>{price * quantity}</span>
                </Typographie>
            </div>

            <Button 
                variant={"ghost"} 
                size={"icon"} 
                className="rounded-full absolute top-2 right-2"
                onClick={onDelete}
            >
                <AiOutlineClose />
            </Button>
        </article>
    )
}
