"use client"

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { TabDescriptif } from "@/components/public/shop/show-product/tab-descriptif";

import { SectionSuggestion } from "@/components/public/shop/show-product/section-suggestion";
import { ISneaker } from "@/components/public/home/section-dernier-creations";
import { getCardSuggestions } from "@/actions/product/suggestion";
import { getSneakerBySlug } from "@/actions/public-actions/show";
import { Container } from "@/components/container";
import { LoaderSpin } from "@/components/loader-spin";
import { SectionDetailProduct } from "@/components/public/shop/show-product/section-detail-product";

interface ICompClient{
    slug: string | undefined;
}

export const CompClient = ({slug}: ICompClient) => {


    const queryKey = [`show_product_${slug}`];
    const queryKey2 = [`sneakers_suggestion_${slug}`];

    const iSneakers: ISneaker[] = [];


    const {data: sneaker, isLoading} = useQuery({
        queryKey: queryKey,
        queryFn: ()=> getSneakerBySlug(slug || ""),
        enabled: !!slug
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
            {/* section suggestion */}
            <SectionSuggestion sneakers={sneakers} />
        </Container>
    )
}
