"use client"

import { AiOutlineShop } from "react-icons/ai"; 
import { SlPaypal } from "react-icons/sl"; 
import { HeroShop } from "@/components/public/shop/hero-shop";
import { Typographie } from "@/components/typographie";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useQuery } from "@tanstack/react-query";
import { useUpdatedBasket } from "@/hooks/stores/use-basket-store";
import { getBasketByKeys } from "@/actions/custom/basket";
import { useEffect, useState } from "react";
import { CartItem } from "@/components/public/cart/card-item";
import { Separator } from "@/components/ui/separator";
import { LoaderSpin } from "@/components/loader-spin";
import { TtransToCardCustom } from "@/actions/translate";


type TBaskets = TtransToCardCustom & {
    quantity: number;
    size: number;
};

export default function PageCard () {
    const length = useUpdatedBasket.use.length;
    const {getBasket} = useLocalStorage("customers_sneaker_baskets")

    const [baskets, setBaskets] = useState<TBaskets[]>();

    const queryKey = ["baskets", getBasket().map((basket)=> basket.id).join("-")];

    const {data: sneakers, isLoading} = useQuery<TtransToCardCustom[]>({
        queryKey,
        queryFn: ()=> getBasketByKeys(getBasket().map((basket)=> basket.id)),
    })

    useEffect(()=>{
        const rBaskets = getBasket();
        const res: TBaskets[]  = []
        rBaskets.forEach((b)=>{
            const find = sneakers?.find((sn)=> sn?.id == b.id)
            if (find) return res.push({...find, ...b});
        });
        setBaskets(res)  
    }, [sneakers, length])

    return (
        <main className="">
            <HeroShop title={"Show detail sneaker"} />
            <section className="container">
                <section className="mb-8 mt-4">
                    <Typographie component="h3" variant="h3" size="lg">
                        Livraison gratuite si vous effectuez le payement en ligne.
                    </Typographie>
                    <Typographie component="p" variant="p" size="md">
                        Notamment pour poursuivre votre commande, il vous faudrait avoir  un compte si pas envore veuillez y <Button variant={"link"} className="p-0 text-emerald-500" asChild><Link href="/auth/sign-up">crée un compte</Link></Button> et continue.
                    </Typographie>
                </section>
                <section className="flex gap-x-12">
                    <section className="w-3/4 flex flex-col gap-y-4">
                        <Typographie component="h3" variant="h3" size="xl">Panier</Typographie>
                        <div className="w-full h-full flex flex-col gap-y-4">
                            {(baskets?.length !== 0) ? (baskets?.map((bkt, idx)=>(
                                    <>
                                        <CartItem 
                                            key={bkt?.id + '-' + bkt.size}
                                            {...bkt}
                                        />
                                        {(baskets.length > idx + 1) && (<Separator />)}
                                    </>
                                ))) :
                                <div className="w-full flex flex-1 flex-grow-1 flex-col gap-y-4 items-center justify-center text-center">
                                    {isLoading ? <LoaderSpin /> : 
                                        <>
                                            <Typographie component="h4" variant="h4" size="lg">Le panier est vide</Typographie>
                                            <Typographie component="p" variant="p" size="md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores odio doloremque maiores.</Typographie>
                                            <Link href={"/shop"} className={buttonVariants()}> <AiOutlineShop /> <span>Return shopping</span> </Link>
                                        </> 
                                    }
                                </div>
                            }
                        </div>
                    </section>
                    {/* Recaptulatif */}
                    <section className="w-1/4 flex flex-col gap-y-4">
                        <Typographie component="h3" variant="h3" size="xl">Récapitulatif</Typographie>
                        <div className="flex justify-between items-center">
                            <Typographie component="h3" variant="h3" size="lg">Sous-total</Typographie>
                            <Typographie component="h3" variant="h3" size="lg">{155.48}£</Typographie>
                        </div>
                        <Typographie component="p" variant="p" size="md">Frais estimés de prise en charge et d{"'"}expédition <span className="font-bold text-emerald-500">Gratuit</span> </Typographie>
                        <div className="border-y py-2 flex justify-between items-center">
                            <Typographie component="h3" variant="h3" size="lg">Total</Typographie>
                            <Typographie component="h3" variant="h3" size="lg">{155.48}£</Typographie>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <Button className="text-xl p-6" size={"lg"}>Paiement</Button>
                            <Button className="text-xl p-6" variant={"outline"} size={"lg"}>
                                <SlPaypal /> <span>Paypal</span>
                            </Button>
                        </div>
                    </section>
                </section>
            </section>
        </main>
    )
}
