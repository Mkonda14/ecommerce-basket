"use server"

import { getSneakerBySlug } from "@/actions/public-actions/show";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { CompClient } from "./comp-client";
import { HeroShop } from "@/components/public/shop/hero-shop";


interface IPageShowProps{
    params: Promise<{
        slug: string
    }>
} 

export default async function PageShow(props: IPageShowProps) {

    const { slug } = await props.params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [`show_product_${slug}`],
        queryFn: ()=> getSneakerBySlug(slug),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main>
                <HeroShop title={"Show detail sneaker"} />
                <CompClient slug={slug} />
            </main>
        </HydrationBoundary>
    )
}
