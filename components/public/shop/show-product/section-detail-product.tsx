import { BsTruck } from "react-icons/bs"; 
import { Typographie } from "@/components/typographie";
import { CarouselImgs } from "./carousel-imgs";
import { InnerHTML } from "@/components/InnerHTML";
import { RadioSize } from "./radio-size";
import { Button } from "@/components/ui/button";
import { CgShoppingBag } from "react-icons/cg";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { IconSocial } from "@/components/icon-social";
import { BtnLike } from "@/components/card-product/btn-like";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useUpdatedBasket } from "@/hooks/stores/use-basket-store";
import { ISneaker } from "../../home/section-dernier-creations";
import { cn, milleToK } from "@/lib/utils";


type ISectionDetailProduct = {
    sneaker: ISneaker & {
        description: string,
        images: {id: string, publicId: string}[],
        _count: {likes: number}
    } | null | undefined,
}

export const SectionDetailProduct = ({sneaker}: ISectionDetailProduct) => {

    const [chooseSize, setChooseSize] = useState<number | undefined>();
    const [likes, setLikes] = useState<number>(sneaker?._count.likes || 0);
    const [errorNotChooseSize, setErrorNotChooseSize] = useState<boolean>(false);
    const {addBasket} = useLocalStorage("customers_sneaker_baskets")

    const updatedBasket = useUpdatedBasket.use.onUpdatedBasket();

    const addSneakerToBasket = ()=>{
        if(!sneaker) return;
        else if(!chooseSize) {setErrorNotChooseSize(true); return;};
        setErrorNotChooseSize(false)
        const length = addBasket({id: sneaker?.id, quantity: 1, size: chooseSize});
        updatedBasket(length);
    }

    return (
        <section className="mt-8 flex gap-x-8">
            <CarouselImgs imgs={sneaker?.images || []} />
            <section className="w-6/12 flex-1">
                <div className="flex justify-between items-center">
                    <Typographie component="blockquote" variant="blockquote" size="md">{sneaker?.marque}</Typographie>
                    <Typographie component="p" variant="p" size="sm" className="flex gap-x-2"><span>likes</span> {milleToK(likes)} <AiOutlineHeart /></Typographie>
                </div>
                <Typographie component="h3" variant="h3" size="lg">{sneaker?.model}</Typographie>
                
                <div className="flex gap-x-2 mt-2 mb-3">
                    {sneaker?.tags.map(tag =>(
                        <span className="uppercase text-base" key={tag.name}>
                            {tag.name}
                        </span>
                    ))}
                </div>
                
                <div className="flex gap-x-4 mb-3">
                    {sneaker?.isPromo && (
                        <Typographie component="h3" variant="h3" size="lg" className="space-x-2">
                            <span className="text-base">$</span>
                            <span className="text-emerald-500">{sneaker?.promoPrice}</span>
                        </Typographie>
                    )}
                    <Typographie component="h3" variant="h3" size="lg" className={"space-x-2"}>
                        {!sneaker?.isPromo && (<span className="text-base">$</span>)}
                        <span className={sneaker?.isPromo ? "line-through" : "text-emerald-500"}>{sneaker?.price}</span>
                    </Typographie>
                </div>
                
                <Typographie component="p" variant="p" size="md">
                    <InnerHTML text={sneaker?.description || ""} />
                </Typographie>

                <Typographie component="h4" variant="h4" size="md" className="mt-4 mb-2">Sélectionner la taille</Typographie>
                <div className={cn("flex gap-4 flex-wrap p-1 rounded-sm", errorNotChooseSize ? "border border-red-300" : "")}>
                    {sneaker?.sizes.map(size =>{
                        return size.quantity > 0 ? <RadioSize onChange={setChooseSize} value={chooseSize} key={size.size} size={size.size} /> : null;
                    })}
                </div>

                <div className="flex items-center gap-x-4 mt-6">
                    <Button
                        className="w-96 p-6 text-base"
                        onClick={addSneakerToBasket}
                    >   
                        <CgShoppingBag className="size-6" />
                        <span>Ajouter au panier</span>
                    </Button>

                    <BtnLike 
                        isFloat={false} 
                        sneakerId={sneaker?.id} 
                        onChange={setLikes}
                    />
                </div>

                <Typographie component="p" variant="p" size="md" className="flex gap-x-3 mt-2">
                    <BsTruck className="size-6" />
                    <span>Free delivery on orders over <span className="font-semibold">$50</span></span>
                </Typographie>

                <div className="flex gap-x-4 items-center mt-6">
                    <Typographie component="h4" variant="h4" size="md" className="flex items-center gap-x-4">
                        <AiOutlineShareAlt className="w-5 h-5" />
                        <span>SHARE</span>
                    </Typographie>

                    <div className="flex gap-x-4 items-center">
                        <IconSocial name="facebook" />
                        <IconSocial name="twitter" />
                        <IconSocial name="snapchat" />
                        <IconSocial name="instagram" />
                    </div>
                </div>

            </section>
        </section>
    )
}
