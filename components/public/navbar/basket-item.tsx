import { AiOutlineClose } from "react-icons/ai"; 
import { Typographie } from "@/components/typographie";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useUpdatedBasket } from "@/hooks/stores/use-basket-store";
import { CldImgDynamic } from "@/components/cld-img-dynamic";
import { TtransToCardCustom } from "@/actions/translate";

type IBasketItem = TtransToCardCustom &{
    size: number;
    quantity: number;
}

export const BasketItem = ({id, image, size, sneaker, reducprice, price}: IBasketItem) => {
    const {removeBasket} = useLocalStorage("customers_sneaker_basket");
    const updatedBasket = useUpdatedBasket.use.onUpdatedBasket()

    const onDelete = ()=>{
        const length = removeBasket({id, size});
        updatedBasket(length);
    }
    return (
        <article className="flex gap-x-4 relative">
            <figure>
                <CldImgDynamic
                    publicId={image}
                    size="card-basket"
                    rounded="sm"
                    alt={`image ${sneaker.marque} / ${sneaker.model}`}
                />
            </figure>

            <div className="">
                <Typographie component="p" variant="p" size="md" className="font-bold">{sneaker.marque}</Typographie>
                <Typographie component="p" variant="p" size="md" className="text-muted-foreground">{sneaker.model}</Typographie>
                <Typographie component="p" variant="p" size="md" className="text-muted-foreground">Taille EU {size}</Typographie>
                <Typographie component="h4" variant="h4" size="md"  className="space-x-3">
                    {(sneaker.reduction) ? <span>{reducprice}</span> : null}
                    <span className={sneaker.reduction ? "line-through text-slate-400" : ""}>{price}</span> $
                </Typographie>
            </div>

            <Button 
                variant={"ghost"} 
                size={"icon"} 
                className="rounded-full absolute -top-2 right-2"
                onClick={onDelete}
            >
                <AiOutlineClose />
            </Button>
        </article>
    )
}
