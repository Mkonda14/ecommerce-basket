"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { CldImgDynamic } from "@/components/cld-img-dynamic";

interface CarouselImgsProps {
  imgs: { id: string; publicId: string }[];
}

export const CarouselImgs = ({imgs}: CarouselImgsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-5/12 h-full flex gap-x-2">
        <div className="w-20 flex flex-col gap-y-2 items-center">
            {imgs.map((img, index) => (
                <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                >
                    <CldImgDynamic {...img} size="crsl-min" isActive={!(current === index + 1)} />
                </button>
            ))}
        </div>
        <Carousel
            setApi={setApi}
            className="w-[470px] flex items-center justify-center h-full"
            opts={{
              align: "start",
              loop: true,
            }}
        >
            <CarouselContent className="">
                {imgs.map((img) => (
                    <CarouselItem key={img.id}>
                        <CldImgDynamic size="crsl-max" {...img}  />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute bottom-6 right-20">
              <CarouselPrevious variant={"default"} className="rounded-sm" />  
              <CarouselNext variant={"default"} className="rounded-sm" />
          </div>
      </Carousel>
    </div>
  );
};
