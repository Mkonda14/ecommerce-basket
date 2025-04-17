"use server"

import { getGraffitiCards } from "@/actions/public-actions/custom";
import { Container } from "@/components/container";
import { SectionGraffiti } from "@/components/public/custom-info/section-graffiti";
import { SectionGrid } from "@/components/public/custom-info/section-grid";
import { HeroShop } from "@/components/public/shop/hero-shop";
import { Typographie } from "@/components/typographie";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function PageCustomInfo() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["graffitis"],
        queryFn: ()=> getGraffitiCards(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <section>
                <HeroShop title="Customization info" />
                <Container>
                    <Typographie component="h2" variant="h2" size="lg">Customization sneakers</Typographie>
                    <Typographie component="p" variant="p" size="md" className="text-muted-foreground">
                        Choisisse le sneaker à laquelle vous aimeriez que on customiser avec de graffiti de notre choix bien sûre.
                    </Typographie>
                    
                    <SectionGraffiti />
                    <SectionGrid />
                </Container>
            </section>
        </HydrationBoundary>
    )
}
