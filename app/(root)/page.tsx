"use server"

import { HeroHome } from "@/components/public/home/hero-home";
import { SectionCustom } from "@/components/public/section-custom";
import { DernierCreations } from "@/components/public/home/section-dernier-creations";
import { SectionService } from "@/components/public/home/section-service";
import { SectionTheme } from "@/components/public/home/section-theme";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getThemeCards } from "@/actions/public-actions/home";
import { getProductCardDerniers } from "@/actions/public-actions/home";

export default  async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["themes"],
      queryFn: ()=> getThemeCards(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["sneakers"],
        queryFn: ()=> getProductCardDerniers(),
    })

    return (
          <HydrationBoundary state={dehydrate(queryClient)}>
            <section className="">
              <HeroHome />

              <SectionService />
              <DernierCreations />

              <SectionCustom />
              <SectionTheme />
            </section>
          </HydrationBoundary>
    );
}
