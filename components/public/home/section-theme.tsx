"use client"

import { Typographie } from "../../typographie"
import { CarouselTheme } from "../section-themes/carousel-themes"
import { getThemeCards } from "@/actions/category-attribut";
import { CardThemeProps } from "../section-themes/card-theme";

import { useQuery } from "@tanstack/react-query";

export const SectionTheme = () => {

  const iThemes: CardThemeProps[] = [];

  const queryKey = ["themes"];
  const {data: themes} = useQuery<CardThemeProps[]>({
    queryKey: queryKey,
    queryFn: ()=> getThemeCards(),
    initialData: iThemes,
  })

  
  return (
    <section className='w-full'>
        <section className="container py-10">
         <div className="px-3">
          <Typographie component="h3" variant="h3" size="lg" className="mb-2">Les meilleurs thèmes que nous vous offrions</Typographie>
         </div>
          <CarouselTheme themes={themes} />
        </section>
    </section>
  )
}
