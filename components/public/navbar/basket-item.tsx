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
    size: number;
    isPromo?: boolean;
    promoPrice?: number;
}

export const BasketItem = ({id, publicId, marque, model, size, price, isPromo, promoPrice}: IBasketItem) => {
    const {removeBasket} = useLocalStorage("customers_sneaker_basket");
    const updatedBasket = useUpdatedBasket((state)=> state.onUpdatedBasket)

    const onDelete = ()=>{
        const length = removeBasket(id);
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
                <Typographie component="h3" variant="h3" size="md">{marque}</Typographie>
                <Typographie component="p" variant="p" size="md">{model}</Typographie>
                <Typographie component="p" variant="p" size="md">Taille EU {size}</Typographie>
                <Typographie component="h4" variant="h4" size="md">
                    {isPromo && <span>{promoPrice}</span>}
                    <span className={isPromo ? "line-through text-slate-500" : ""}>{price}</span>
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
