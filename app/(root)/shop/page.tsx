"use server"

import { getColorPrimaries } from "@/actions/custom";
import { getCategorySneakers } from "@/actions/product/category";
import { getTagSneakers } from "@/actions/product/tag";
import { getCategoryThemes } from "@/actions/theme/category";
import { SectionCustom } from "@/components/public/section-custom";
import { HeroShop } from "@/components/public/shop/hero-shop";
import { SectionProducts } from "@/components/public/shop/section-products";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function PageShop() {

  const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["category-sneakers"],
      queryFn: ()=> getCategorySneakers(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["category-themes"],
        queryFn: ()=> getCategoryThemes(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["color-sneakers"],
        queryFn: ()=> getColorPrimaries(),
    })
    await queryClient.prefetchQuery({
        queryKey: ["tag-sneakers"],
        queryFn: ()=> getTagSneakers(),
    })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <HeroShop />
        <SectionProducts />
        <SectionCustom />
      </section>
    </HydrationBoundary>
  )
}
