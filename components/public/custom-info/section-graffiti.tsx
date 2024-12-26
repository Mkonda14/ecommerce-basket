"use client"

import { Typographie } from "@/components/typographie"
import { CarouselAttribut } from "@/components/public/carousel-attribut"
import { CardAttributProps } from "@/components/public/card-attribut";

import { useQuery } from "@tanstack/react-query";
import { getGraffitiCards } from "@/actions/public-actions/custom-info";

export const SectionGraffiti = () => {

  const iGraffitis: CardAttributProps[] = [];

  const queryKey = ["graffitis"];
  const {data: graffitis} = useQuery<CardAttributProps[]>({
    queryKey: queryKey,
    queryFn: ()=> getGraffitiCards(),
    initialData: iGraffitis,
  })

  
  return (
    <section className='w-full'>
        <section className="container py-10">
         <div className="">
          <Typographie component="h3" variant="h3" size="lg" className="mb-2">Les meilleurs graffitis que nous vous offrions</Typographie>
         </div>
          <CarouselAttribut entity="graffiti" attributs={graffitis} />
        </section>
    </section>
  )
}
