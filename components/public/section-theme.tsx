import { BsChevronRight } from "react-icons/bs"; 
import Link from "next/link"
import { Typographie } from "../typographie"
import { Button } from "../ui/button"
import { CarouselTheme } from "./section-themes/carousel-themes"
import { items } from "./section-themes/items"


export const SectionTheme = () => {
  return (
    <section className='w-full'>
        <section className="container py-10">
         <div className="px-3">
          <Typographie component="h3" variant="h3" size="lg" className="mb-2">Les meilleurs thèmes que nous vous offrions</Typographie>
            
            <Button variant={"link"} className="font-bold text-xl text-emerald-500 p-0" asChild>
              <Link className="flex items-center gap-x-4" href="#"><span>Browse all presentations</span> <BsChevronRight className="w-5 h-4 mt-1" /> </Link>
            </Button>
         </div>

          <CarouselTheme items={items} />
        </section>
    </section>
  )
}
