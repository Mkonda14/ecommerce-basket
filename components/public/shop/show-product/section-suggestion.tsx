import { Typographie } from "@/components/typographie"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"
import { CardProduct } from "@/components/card-product";
import { TtransToCardCustom } from "@/actions/translate";

interface ISectionSuggestion{
    customs: TtransToCardCustom[];
}

export const SectionSuggestion = ({customs}: ISectionSuggestion) => {
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
                {customs.map((custom)=>(
                    <CardProduct 
                        key={custom?.id} 
                        slug={custom?.slug || ""}
                        id={custom?.id}
                        marque={custom?.sneaker.marque} 
                        model={custom?.sneaker.model} 
                        price={custom?.price || 0.0} 
                        reducprice={custom?.reducprice} 
                        publicId={custom?.image || ""}
                        sizes={custom?.sizes}
                        colorSecondaries={custom?.colorSecondaries}
                        isPromo={custom?.sneaker.isPromo} 
                        reduction={custom?.sneaker.reduction}
                        tags={custom?.sneaker.tags}
                    />
                ))}
            </section>
        </section>
    )
}
