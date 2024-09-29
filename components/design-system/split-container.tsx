import { CarouselAuth } from "./carousel-auth"

interface SplitProps{
    children: React.ReactNode;
}

export const SplitContainer = ({children}: SplitProps) => {
  return (
    <section className="flex shadow-md p-4 w-4/5 md:w-[1000px] min-h-[700px] gap-x-4 bg-white">
        <section className="w-[45%] flex-1 relative bg-gradiant-auth">
            <h3 className="text-white font-semibold absolute left-4 top-4 z-10">E-commerce shop</h3>
            <CarouselAuth />
        </section>
        <section className="w-[55%]">
            {children}
        </section>
    </section>
  )
}
