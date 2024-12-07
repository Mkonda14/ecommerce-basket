import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CardAttribut, CardAttributProps } from "./card-attribut";

interface CarouselAttribut{
  attributs: CardAttributProps[];
  entity: "theme" | "graffiti"
}

export function CarouselAttribut({ attributs, entity}: CarouselAttribut) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {attributs.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4">
            <div className="p-2">
              <CardAttribut {...item} entity={entity} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -top-6 right-14">
          <CarouselPrevious variant={"default"} className="rounded-sm" />  
          <CarouselNext variant={"default"} className="rounded-sm" />
      </div>
    </Carousel>
  )
}
