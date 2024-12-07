"use client"

import { Typographie } from "../../typographie"
import { CarouselAttribut } from "../carousel-attribut"
import { getThemeCards } from "@/actions/category-attribut";
import { CardAttributProps } from "../card-attribut";

import { useQuery } from "@tanstack/react-query";

export const SectionTheme = () => {

  const iThemes: CardAttributProps[] = [];

  const queryKey = ["themes"];
  const {data: themes} = useQuery<CardAttributProps[]>({
    queryKey: queryKey,
    queryFn: ()=> getThemeCards(),
    initialData: iThemes,
  })

  
  return (
    <section className='w-full'>
        <section className="container py-10">
         <div className="">
          <Typographie component="h3" variant="h3" size="lg" className="mb-2">Les meilleurs thèmes que nous vous offrions</Typographie>
         </div>
          <CarouselAttribut entity="theme" attributs={themes} />
        </section>
    </section>
  )
}
