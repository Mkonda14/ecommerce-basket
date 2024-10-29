import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CardTheme, CardThemeProps } from "./card-theme";

interface CarouselTheme{
  items: CardThemeProps[];
}

export function CarouselTheme({ items}: CarouselTheme) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4">
            <div className="p-2">
              <CardTheme {...item} />
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
