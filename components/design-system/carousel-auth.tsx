"use client"

import Autoplay from "embla-carousel-autoplay"

import { useEffect, useRef, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Item, items } from "@/data/signIn-items"
import { CarouselItemAuth } from "./carousel-item-auth"

export const CarouselAuth = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
   
    useEffect(() => {
      if (!api) {
        return
      }
   
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
   
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])
   
    return (
      <div className="w-full h-full relative">
        <Carousel 
            setApi={setApi} 
            plugins={[plugin.current]}
            className="flex items-center justify-center h-full "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                align: "start",
                loop: true,
            }}
        >
          <CarouselContent className="">
            {items.map((item: Item) =>(
              <CarouselItem key={item.img}>
                <CarouselItemAuth {...item} />             
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex gap-x-2 justify-center items-center absolute bottom-10 left-1/2 -translate-x-1/2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={cn(`text-sm font-medium rounded-full px-1 h-[2px] bg-white`,`${
                  current === index + 1? "px-3" : ""
                }`)}
                onClick={() => api?.scrollTo(index)}
              >
              </button>
            ))}
        </div>
      </div>
    )
}
