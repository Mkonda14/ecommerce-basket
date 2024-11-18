import { SlPaypal } from "react-icons/sl"; 
import { HeroShop } from "@/components/public/shop/hero-shop";
import { Typographie } from "@/components/typographie";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function PageCard () {
    return (
        <main className="">
            <HeroShop title={"Show detail sneaker"} />
            <section className="container">
                <section className="">
                    <Typographie component="h3" variant="h3" size="lg">
                        Livraison gratuite si vous effectuez le payement en ligne.
                    </Typographie>
                    <Typographie component="p" variant="p" size="md">
                        Notamment pour poursuivre votre commande, il vous faudrait avoir  un compte si pas envore veuillez y <Button variant={"link"} className="p-0 text-emerald-500" asChild><Link href="/auth/sign-up">crée un compte</Link></Button> et continue.
                    </Typographie>
                </section>
                <section className="flex gap-x-4">
                    <section className="w-3/4">
                        <Typographie component="h3" variant="h3" size="xl">Panier</Typographie>
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
                            <Button size={"lg"}>Paiement</Button>
                            <Button variant={"outline"} size={"lg"}>
                                <SlPaypal /> <span>Paypal</span>
                            </Button>
                        </div>
                    </section>
                </section>
            </section>
        </main>
    )
}
