import { Typographie } from "@/components/typographie"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"
import { ISneaker } from "../../home/section-dernier-creations";
import { CardProduct } from "@/components/card-product";

interface ISectionSuggestion{
    sneakers: ISneaker[];
}

export const SectionSuggestion = ({sneakers}: ISectionSuggestion) => {
    return (
        <section>
            <section className="container grid grid-cols-4 my-10 gap-4">
                <div className="flex flex-col justify-center items-start gap-y-5">
                    <Typographie component="h3" variant="h3" size="lg">You may also like</Typographie>
                    <Typographie component="p" variant="p" size="md">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam illo.</Typographie>
                    <Button variant={"link"} className="px-0 text-lg font-bold" asChild>
                        <Link href="#">
                            <span>See all</span>
                            <BsArrowRight className="size-6" />
                        </Link>
                    </Button>
                </div>
                {sneakers.map(({id, slug, model, marque, price, images, sizes, colorSecondaries, isPromo, promoPrice, tags})=>(
                    <CardProduct 
                        key={id} 
                        id={id}
                        slug={slug}
                        marque={marque} 
                        model={model} 
                        price={price} 
                        public_id={images[0]?.publicId}
                        sizes={sizes}
                        colorSecondaries={colorSecondaries}
                        isPromo={isPromo}
                        promoPrice={promoPrice}
                        tags={tags}
                    />
                ))}
            </section>
        </section>
    )
}
