"use server"

import { getSneakerBySizeColorId } from "@/actions/public-actions/custom";
import { getGraffitiCards } from "@/actions/public-actions/custom";
import { Container } from "@/components/container";
import { Typographie } from "@/components/typographie";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { FormCustomization } from "./form-customization";
import { Hero } from "@/components/public/custom/customization/hero";

interface IPageCustom{
    params: {
        all: string[];
    }
}

export default async function PageCustom({params}: IPageCustom) {

    const parametres = params.all;
    if(parametres.length !== 3) return notFound();

    const queryClient = new QueryClient();
    const sneaker = await getSneakerBySizeColorId(parametres);

    if(!sneaker) return notFound();

    await queryClient.prefetchQuery({
        queryKey: ["graffitis-form", "public"],
        queryFn: ()=> getGraffitiCards(),
    })

    return(
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <section>
                    <Hero />
                    
                    <Container>
                        <section className="py-8">
                            <Typographie component="h2" variant="h2" size="lg">Customization sneakers</Typographie>
                            <Typographie component="p" variant="p" size="md" className="text-muted-foreground">
                                Choisisse le graffitti à laquelle vous aimeriez.
                            </Typographie>
                        </section>
                        <section className="">
                            <FormCustomization sneaker={sneaker.id} />
                        </section>
                    </Container>
                </section>
            </HydrationBoundary>
        </main>
    );
}