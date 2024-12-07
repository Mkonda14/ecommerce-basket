"use client"

import { HeroShop } from "@/components/public/shop/hero-shop";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { TabDescriptif } from "@/components/public/shop/show-product/tab-descriptif";

import { SectionSuggestion } from "@/components/public/shop/show-product/section-suggestion";
import { ISneaker } from "@/components/public/home/section-dernier-creations";
import { getCardSuggestions } from "@/actions/product/suggestion";
import { getSneakerBySlug } from "@/actions/product";
import { Container } from "@/components/container";
import { LoaderSpin } from "@/components/loader-spin";
import { SectionDetailProduct } from "@/components/public/shop/show-product/section-detail-product";


interface PageShowProps{
    params: {
        slug: string
    }
} 

export default function PageShow({params}: PageShowProps) {

    const { slug } = params;

    const queryKey = [`show_product_${slug}`];
    const queryKey2 = [`sneakers_suggestion_${slug}`];

    const iSneakers: ISneaker[] = [];


    const {data: sneaker, isLoading} = useQuery({
        queryKey: queryKey,
        queryFn: ()=> getSneakerBySlug(slug),
    })

    const {data: sneakers} = useQuery<ISneaker[]>({
        queryKey: queryKey2,
        queryFn: ()=> getCardSuggestions({themeIds: sneaker?.themes.map(theme=>theme.id), sneakerId: sneaker?.id}),
        initialData: iSneakers,
    })


    if((!sneaker) && !isLoading) {
        return notFound();
    } 
    if(isLoading){
        return (
            <main className="w-full h-[50vh] flex justify-center items-center">
                <LoaderSpin size="xl" />
            </main>
        )
    };

    return (
        <main>
            <HeroShop title={"Show detail sneaker"} label={sneaker?.model} />
            <Container maxWidth>
                {/* section description */}
                <SectionDetailProduct sneaker={sneaker} />
                {/* section tab */}
                <section className="mt-8 w-full">
                    <TabDescriptif 
                        categorySneaker={sneaker?.category} 
                        themes={sneaker?.themes}
                        tags={sneaker?.tags}
                        />
                </section>
            </Container>
            {/* section suggestion */}
            <SectionSuggestion sneakers={sneakers} />
        </main>
    )
}
