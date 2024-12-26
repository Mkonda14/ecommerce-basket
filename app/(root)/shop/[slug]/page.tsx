"use server"

import { getCustomBySlug } from "@/actions/public-actions/show";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { CompClient } from "./comp-client";
import { HeroShop } from "@/components/public/shop/hero-shop";
import { getCardSuggestions } from "@/actions/custom/suggestion";


interface IPageShowProps{
    params: Promise<{
        slug: string
    }>
} 

export default async function PageShow(props: IPageShowProps) {

    const { slug } = await props.params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["customs",`${slug}`],
        queryFn: ()=> getCustomBySlug(slug),
    })

    await queryClient.prefetchQuery({
        queryKey: ["customs",`${slug}`,`suggestions`],
        queryFn: ()=> getCardSuggestions({slug}),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main>
                <HeroShop title={"Show detail sneaker"} label="Custom detail" />
                <CompClient slug={slug} />
            </main>
        </HydrationBoundary>
    )
}
