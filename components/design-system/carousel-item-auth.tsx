
import Image from "next/image"
import { Typographie } from "../typographie"
import { Item } from "@/data/signIn-items"

export const CarouselItemAuth = ({img, title, description}: Item) => {
  return (
    <article className='w-full h-full aspect-auto flex flex-col justify-center items-center gap-y-10 p-8'>
        <div className="">
            <Image src={img} width={280} height={250} className="object-cover" alt="card"></Image>
        </div>
        <div className="text-center">
            <Typographie component="h2" variant="h2" size="xl" className="text-white">
                {title}
            </Typographie>
            <Typographie component="p" variant="p" size="sm" className="text-muted">
                {description}
            </Typographie>
        </div>
    </article>
  )
}
