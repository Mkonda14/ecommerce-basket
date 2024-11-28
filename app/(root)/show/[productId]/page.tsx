"use client"

import { getSneakerById } from "@/actions/product";
import { BtnLike } from "@/components/card-product/btn-like";
import { InnerHTML } from "@/components/InnerHTML";
import { HeroShop } from "@/components/public/shop/hero-shop";
import { CarouselImgs } from "@/components/public/shop/show-product/carousel-imgs";
import { RadioSize } from "@/components/public/shop/show-product/radio-size";
import { Typographie } from "@/components/typographie";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import { IconSocial } from "@/components/icon-social";
import { AiOutlineShareAlt } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai"; 
import { milleToK } from "@/lib/utils";
import { InputIncrement } from "@/components/public/shop/show-product/input-increment";
import { TabDescriptif } from "@/components/public/shop/show-product/tab-descriptif";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useUpdatedBasket } from "@/hooks/stores/use-basket-store";
import { SectionSuggestion } from "@/components/public/shop/show-product/section-suggestion";
import { ISneaker } from "@/components/public/home/section-dernier-creations";
import { getCardSuggestions } from "@/actions/product/suggestion";


interface PageShowProps{
    params: {
        productId: string
    }
} 

export default function PageShow({params}: PageShowProps) {

    const { productId } = params;

    const queryKey = [`show_product_${productId}`];
    const queryKey2 = [`sneakers_suggestion_${productId}`];

    const iSneakers: ISneaker[] = [];

    const [chooseSize, setChooseSize] = useState<number | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [likes, setLikes] = useState<number>(0);
    const {addBasket} = useLocalStorage("customers_sneaker_baskets")

    const updatedBasket = useUpdatedBasket.use.onUpdatedBasket();


    const {data: sneaker, error, isLoading} = useQuery({
        queryKey: queryKey,
        queryFn: ()=> getSneakerById(productId),
    })

    const {data: sneakers} = useQuery<ISneaker[]>({
        queryKey: queryKey2,
        queryFn: ()=> getCardSuggestions({themeIds: sneaker?.themes.map(theme=>theme.id), sneakerId: sneaker?.id}),
        initialData: iSneakers,
    })

    useEffect(()=>{
        if(sneaker) setLikes(sneaker?._count.likes);
    }, [sneaker])

    const addSneakerToBasket = ()=>{
        if(!chooseSize || !sneaker) return;
        const length = addBasket({id: sneaker?.id, quantity: quantity, size: chooseSize});
        updatedBasket(length);
    }

    if((!sneaker || error) && !isLoading) {return redirect("/page-not-found");} 
    
    

    return (
        <main>
            <HeroShop title={"Show detail sneaker"} label={sneaker?.model} />
            {/* section description */}
            <section className="mt-8">
                <section className="container flex flex-col lg:flex-row gap-x-4">
                    <CarouselImgs imgs={sneaker?.images || []} />
                    <section className="flex-grow-1 flex-1">
                        <div className="flex justify-between items-center">
                            <Typographie component="blockquote" variant="blockquote" size="md">{sneaker?.marque}</Typographie>
                            <Typographie component="p" variant="p" size="sm" className="flex gap-x-2"><span>likes</span> {milleToK(likes)} <AiOutlineHeart /></Typographie>
                        </div>
                        <Typographie component="h3" variant="h3" size="lg">{sneaker?.model}</Typographie>
                        
                        <div className="flex gap-x-2 mt-2 mb-4">
                            {sneaker?.tags.map(tag =>(
                                <span className="uppercase text-base" key={tag.name}>
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                        
                        <div className="flex gap-x-4 mb-4">
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
                        <div className="flex gap-4 flex-wrap">
                            {sneaker?.sizes.map(size =>{
                                return size.quantity > 0 ? <RadioSize onChange={setChooseSize} value={chooseSize} key={size.size} size={size.size} /> : null;
                            })}
                        </div>

                        <div className="flex gap-x-4 mt-8">
                            <InputIncrement 
                                quantity={quantity} 
                                onChange={setQuantity}
                                max={sneaker?.sizes.find((size)=> size.size === chooseSize)?.quantity || 1}
                                isDisabled={!chooseSize}
                            />
                            <Button
                                onClick={addSneakerToBasket}
                            >Ajouter au panier</Button>
                            <BtnLike 
                                isFloat={false} 
                                sneakerId={sneaker?.id} 
                                onChange={setLikes}
                            />
                        </div>
                        
                        <div className="flex gap-x-4 items-center mt-8">
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

                        <section className="mt-8 w-full">
                            <TabDescriptif 
                                categorySneaker={sneaker?.category} 
                                themes={sneaker?.themes}
                                tags={sneaker?.tags}
                            />
                        </section>

                    </section>
                </section>

            </section>
            {/* section suggestion */}
            <SectionSuggestion sneakers={sneakers} />
        </main>
    )
}
